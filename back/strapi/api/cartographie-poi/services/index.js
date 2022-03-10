"use strict";

const sortNumbers = (a, b) => a - b;

const MAX_POI_RESULTS = 10;

const buildPoiQuery = ({ perimetre, position, types, thematiques, etapes }) => {
  const knex = strapi.connections.default;

  const poiAdressesQuery = knex("cartographie_pois")
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

  if (perimetre && perimetre.length) {
    const lngs = [perimetre[0], perimetre[2]].sort(sortNumbers);
    const lats = [perimetre[1], perimetre[3]].sort(sortNumbers);

    poiAdressesQuery.whereRaw(
      `
(adresse_elements->>'geocode_position_longitude')::float > ? AND
(adresse_elements->>'geocode_position_longitude')::float < ? AND
(adresse_elements->>'geocode_position_latitude')::float > ? AND
(adresse_elements->>'geocode_position_latitude')::float < ?
`,
      [lngs[0], lngs[1], lats[0], lats[1]]
    );
  }

  if (position && position.length) {
    poiAdressesQuery.whereRaw(
      `
adresse_elements->>'geocode_position_longitude' = ? AND
adresse_elements->>'geocode_position_latitude' = ?
`,
      [position[0], position[1]]
    );
  }

  if (types && types.length) {
    poiAdressesQuery.whereIn("cartographie_types.nom", types);
  }

  if (thematiques && thematiques.length) {
    poiAdressesQuery.join(
      "cartographie_types__thematiques as ct",
      "ct.cartographie_type_id",
      "=",
      "cartographie_types.id"
    );
    poiAdressesQuery.join(
      "thematiques",
      "thematiques.id",
      "=",
      "ct.thematique_id"
    );
    poiAdressesQuery.whereIn("thematiques.nom", thematiques);
  }

  if (etapes && etapes.length) {
    poiAdressesQuery.join(
      "cartographie_types_etapes__etapes_cartographie_types as ce",
      "ce.cartographie-type_id",
      "=",
      "cartographie_types.id"
    );
    poiAdressesQuery.join("etapes", "etapes.id", "=", "ce.etape_id");
    poiAdressesQuery.whereIn("etapes.nom", etapes);
  }

  return poiAdressesQuery;
};

const searchQuery = async (params) => {
  if (
    (!params.perimetre || !params.perimetre.length) &&
    (!params.position || !params.position.length)
  )
    return [];

  const poisQuery = buildPoiQuery(params);

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

  return poisQuery;
};

const searchPois = async (params) => {
  const poisSearchQuery = await searchQuery(params);

  const pois = await poisSearchQuery;

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

const searchAdresses = async (params) => {
  const poisSearchQuery = await searchQuery(params);

  const poiAdresses = await poisSearchQuery;

  const limit = params.limit !== undefined ? params.limit : MAX_POI_RESULTS;

  const adressesIndex = poiAdresses.reduce((adressesIndex, poiAdresse) => {
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
    } = poiAdresse;

    const key = `${position_longitude}${position_latitude}`;

    if (!adressesIndex[key]) {
      adressesIndex[key] = {
        adresse,
        code_postal,
        commune,
        position_longitude,
        position_latitude,
        count: 0,
        pois: [],
      };
    }

    const poi = {
      nom,
      type,
      categorie,
      telephone,
      courriel,
      site_internet,
    };

    if (!limit || adressesIndex[key].count < limit) {
      adressesIndex[key].pois.push(poi);
    }

    adressesIndex[key].count += 1;

    return adressesIndex;
  }, {});

  return Object.values(adressesIndex).sort((a, b) => b.count - a.count);
};

const countPois = async (params) => {
  if (
    (!params.perimetre || !params.perimetre.length) &&
    (!params.position || !params.position.length)
  )
    return 0;

  const poisQuery = buildPoiQuery(params);

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

const countAdresses = async (params) => {
  if (
    (!params.perimetre || !params.perimetre.length) &&
    (!params.position || !params.position.length)
  )
    return 0;

  const poisQuery = buildPoiQuery(params);

  const knex = strapi.connections.default;

  poisQuery.count(
    knex.raw("distinct (??, ??, ??)", [
      "adresse_elements->>'geocode_adresse' as adresse",
      "adresse_elements->>'geocode_code_postal' as code_postal",
      "adresse_elements->>'geocode_commune' as commune",
    ])
  );

  poisQuery.groupBy("adresse", "code_postal", "commune");

  const count = await poisQuery;

  return count && count[0] && count[0].count;
};

module.exports = {
  searchPois,
  countPois,
  searchAdresses,
  countAdresses,
  suggestions,
};
