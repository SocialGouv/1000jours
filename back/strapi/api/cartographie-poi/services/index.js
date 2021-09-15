"use strict";

const sortNumbers = (a, b) => a - b;

const buildPoiQuery = ({ perimetre, types, thematiques, etapes }) => {
  const knex = strapi.connections.default;

  const poisQuery = knex("cartographie_pois")
    .crossJoin(
      knex.raw("jsonb_array_elements(??) as adresse_elements", [
        "cartographie_adresses_json",
      ])
    )
    .join(
      "cartographie_types",
      "cartographie_pois.type",
      "=",
      "cartographie_types.id"
    );

  const lngs = [perimetre[0], perimetre[2]].sort(sortNumbers);
  const lats = [perimetre[1], perimetre[3]].sort(sortNumbers);

  poisQuery.whereRaw(
    `
(adresse_elements->>'geocode_position_longitude')::float > ? AND
(adresse_elements->>'geocode_position_longitude')::float < ? AND
(adresse_elements->>'geocode_position_latitude')::float > ? AND
(adresse_elements->>'geocode_position_latitude')::float < ?
`,
    [lngs[0], lngs[1], lats[0], lats[1]]
  );

  if (types && types.length) {
    poisQuery.whereIn("cartographie_types.nom", types);
  }

  if (thematiques && thematiques.length) {
    poisQuery.join(
      "cartographie_types__thematiques as ct",
      "ct.cartographie_type_id",
      "=",
      "cartographie_types.id"
    );
    poisQuery.join("thematiques", "thematiques.id", "=", "ct.thematique_id");
    poisQuery.whereIn("thematiques.nom", thematiques);
  }

  if (etapes && etapes.length) {
    poisQuery.join(
      "cartographie_types_etapes__etapes_cartographie_types as ce",
      "ce.cartographie-type_id",
      "=",
      "cartographie_types.id"
    );
    poisQuery.join("etapes", "etapes.id", "=", "ce.etape_id");
    poisQuery.whereIn("etapes.nom", etapes);
  }

  return poisQuery;
};

const search = async ({ perimetre, types, thematiques, etapes }) => {
  if (!perimetre || !perimetre.length) return [];

  const poisQuery = buildPoiQuery({ perimetre, types, thematiques, etapes });

  const knex = strapi.connections.default;

  poisQuery.distinct(
    "cartographie_pois.nom",
    "cartographie_pois.telephone",
    "cartographie_pois.courriel",
    "cartographie_pois.site_internet",
    "cartographie_types.nom as type_nom",
    "cartographie_types.categorie as type_categorie",
    knex.raw(`
    adresse_elements->>'geocode_adresse' as adresse,
    adresse_elements->>'geocode_code_postal' as code_postal,
    adresse_elements->>'geocode_commune' as commune,
    adresse_elements->>'geocode_position_longitude' as position_longitude,
    adresse_elements->>'geocode_position_latitude' as position_latitude
  `)
  );

  const pois = await poisQuery;

  return pois.map((poi) => {
    const {
      nom,
      telephone,
      courriel,
      site_internet,
      type_nom: type,
      type_categorie: categorie,
      adresse,
      code_postal,
      commune,
      position_longitude,
      position_latitude,
    } = poi;

    return {
      nom,
      type,
      categorie,
      telephone,
      courriel,
      site_internet,
      adresse,
      code_postal,
      commune,
      position_longitude,
      position_latitude,
    };
  });
};

const count = async ({ perimetre, types, thematiques, etapes }) => {
  if (!perimetre || !perimetre.length) return [];

  const poisQuery = buildPoiQuery({ perimetre, types, thematiques, etapes });

  const knex = strapi.connections.default;

  poisQuery.count(knex.raw("distinct (??)", ["cartographie_pois.id"]));

  const count = await poisQuery;

  return count && count[0] && count[0].count;
};

const emailSuggestionsTemplate = (info) => ({
  subject: "Nouvelles suggestions pour la cartographie",
  text: `Bonjour,

    De nouvelles suggestions pour la cartographie ont été envoyées.

    - Nouveaux POI suggérés : <%- nouveaux_pois %>
    - Suggestions d'améliorations : <%- suggestions_ameliorations %>

    Informations personnelles :
    - Nombre d'enfant(s) : <%- nombre_enfants %>
    - Code postal : <%- code_postal %>

    L'équipe 1000 premiers jours.`,
  html: `<p>Bonjour,</p>

    <p>De nouvelles suggestions pour la cartographie ont été envoyées.</p>

    <p>
      <ul>
        <li>Nouveaux POI suggérés : <%- nouveaux_pois %></li>
        <li>Suggestions d'améliorations : <%- suggestions_ameliorations %></li>
      </ul>
    </p>

    <p>Informations personnelles :
      <ul>
        <li>Nombre d'enfant(s) : <%- nombre_enfants %></li>
        <li>Code postal : <%- code_postal %></li>
      </ul>
    </p>

    L'équipe 1000 premiers jours.`,
});

const suggestions = async ({
  nouveaux_pois,
  suggestions_ameliorations,
  nombre_enfants = "ND",
  code_postal = "ND",
}) => {
  if (!process.env["MAIL_SEND_TO"])
    throw new Error("Le service mail n'est pas configuré");

  const info = {
    nouveaux_pois,
    suggestions_ameliorations,
    nombre_enfants,
    code_postal,
  };

  try {
    const res = await strapi.plugins.email.services.email.sendTemplatedEmail(
      {
        from: process.env["MAIL_SEND_FROM"],
        to: process.env["MAIL_SEND_TO"],
      },
      emailSuggestionsTemplate(info),
      info
    );

    return res && !!res.response.match(/Ok/);
  } catch (e) {
    console.error(e);
    throw new Error("Erreur de connexion au serveur mail");
  }
};

module.exports = {
  search,
  count,
  suggestions,
};
