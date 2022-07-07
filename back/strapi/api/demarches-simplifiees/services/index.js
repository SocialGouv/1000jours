"use strict";

const fetch = require("node-fetch");
const { parse } = require("json2csv");

const { DOSSIERS_QUERY } = require("./query");

const DS_API_URL = "https://www.demarches-simplifiees.fr/api/v2/graphql";

const request = async (date) => {
  const token = strapi.config.get("plugins.demarches.token");

  const variables = {
    demarcheNumber: 50442,
    state: "accepte",
    // first: 1,
  };

  if (date) {
    variables.createdSince = date;
  }

  const body = {
    operationName: "getDemarche",
    variables,
    query: DOSSIERS_QUERY,
  };

  return fetch(DS_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const dsTypeTo1000jType = (dsTypes, dsTypeNom) => {
  const dsType = dsTypes.find(
    (dsType) =>
      dsType.types.filter((type) => type.value === dsTypeNom).length > 0
  );

  return dsType ? dsType.cartographie_pois_type.nom : dsTypeNom;
};

const formatDossiers = (dsTypes, nodes = []) =>
  nodes.flatMap(({ dateDepot, champs = [] }) =>
    champs.reduce((dossiers, { champs }) => {
      if (!champs) return dossiers;

      let dossier = {};

      for (const champ of champs) {
        if (champ.label === "Êtes-vous ?") {
          if (dossier.nom) {
            dossiers.push(dossier);
          }

          dossier = { date: dateDepot };

          dossier.categorie = champ.stringValue.match("professionnel")
            ? "professionnel"
            : champ.stringValue.match("structure")
            ? "structure"
            : "N/A";
        }

        if (champ.stringValue) {
          champ.stringValue = champ.stringValue.trim();
        }

        if (champ.label.match("secteur d'activité")) {
          dossier.secteur = champ.primaryValue.trim();
          dossier.type = dsTypeTo1000jType(
            dsTypes,
            champ.secondaryValue.trim()
          );
        } else if (
          champ.label.match("votre nom ou le nom de votre établissement")
        ) {
          dossier.nom = champ.stringValue;
        } else if (champ.label.match("numéro de contact")) {
          dossier.telephone = champ.stringValue.replace(/ /g, "");
        } else if (champ.label.match("e-mail de contact")) {
          dossier.courriel = champ.stringValue;
        } else if (champ.label.match("site Internet")) {
          dossier.site_internet = champ.stringValue;
        } else if (champ.label.match("adresse de votre lieu")) {
          dossier.adresse =
            champ.address && champ.address.label
              ? champ.address.label
              : champ.stringValue;
        }
      }

      if (dossier.nom) {
        dossiers.push(dossier);
      }

      return dossiers;
    }, [])
  );

const formatToCsv = (dossiers) => {
  const fields = [
    "date",
    "nom",
    "categorie",
    "type",
    "secteur",
    "telephone",
    "courriel",
    "site_internet",
    "adresse",
  ];

  const opts = { fields };

  try {
    const csv = parse(dossiers, opts);

    return csv;
  } catch (err) {
    return err;
  }
};

const getDossiers = async (date) => {
  const result = await request(date);

  const jsonResult = await result.json();

  if (jsonResult.errors) return jsonResult.errors;

  const dsTypes = await strapi.query("cartographie-ds-types").find();

  const dossiers = formatDossiers(
    dsTypes,
    jsonResult.data.demarche.dossiers.nodes
  );

  return formatToCsv(dossiers);
};

module.exports = { getDossiers };
