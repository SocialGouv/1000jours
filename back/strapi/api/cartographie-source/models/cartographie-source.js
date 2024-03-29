"use strict";

const path = require("path");

const StringService = require("../../string/services");
const FileService = require("../../file/services");

const ReglesChamps = require("../../../components/cartographie/regles-champs");

const ReglesChampsAttributes = Object.keys(ReglesChamps.attributes);

const setFileFields = async (data) => {
  const fichier = await strapi.plugins["upload"].services.upload.fetch({
    id: data.fichier,
  });
  if (!fichier) return null;

  data.source = fichier.name;

  const filePath = path.join("public", fichier.url);
  const columns = await FileService.getColumns(filePath);

  if (columns) {
    data.champs = columns.join("\n");
  }

  data.version = !data.version ? 1 : data.version + 1;
};

const formatRegles = async (data) => {
  const types = await strapi.query("cartographie-types").find({}, []);

  // fetch POI types names from database to display in item title
  data.regles.type.forEach((regle) => {
    const type = types.find((someType) => someType.id === regle.valeur);
    if (!type) return false;

    regle.identifiant = type.identifiant;

    return true;
  });

  data.regles_script = ReglesChampsAttributes.reduce((reglesScript, key) => {
    const keyRegles = data.regles[key];

    if (!Array.isArray(keyRegles)) return reglesScript;

    return keyRegles.reduce((regles, regle) => {
      if (typeof regle.valeur === "string") regle.valeur = regle.valeur.trim();

      if (!regle.valeur) return regles;

      regles += regles ? "\n\n" : "";
      regles += `champ $\{${key}} est `;
      regles +=
        regle.valeur[0] === '"' || key === "type"
          ? `"${regle.valeur}"`
          : `$\{${regle.valeur}}`;

      if (!regle.conditions || !regle.conditions.length) return regles;

      return regle.conditions.reduce((regles2, condition) => {
        condition.condition_source = condition.condition_source.trim();

        condition.identifiant = `si $\{${condition.condition_source}} `;

        if (condition.condition_valeur) {
          condition.condition_valeur = condition.condition_valeur.trim();

          if (condition.condition_valeur[0] === "/") {
            condition.identifiant += `suit la règle ${condition.condition_valeur}`;
          } else {
            condition.condition_valeur = condition.condition_valeur.trim();

            condition.identifiant += `est égal à "${condition.condition_valeur}"`;
          }
        } else {
          condition.identifiant += "est vide";
        }

        regles2 += `\n\t${condition.identifiant}`;

        return regles2;
      }, regles);
    }, reglesScript);
  }, "");
};

const beforeSave = async (data, hasFileChanged = false) => {
  data.nom = data.nom.trim();

  data.identifiant = StringService.slugLower(data.nom);

  if (data.regles) {
    formatRegles(data);
  }

  if (hasFileChanged) {
    if (data.fichier) {
      await setFileFields(data);
    } else {
      data.source = null;
      data.champs = null;
      data.version = null;
      data.lignes = null;
      data.traitement = "non_fait";
      data.pret_a_traiter = false;
    }
  }
};

const deleteSourcePois = async (source) => {
  const { id } = source;

  const knex = strapi.connections.default;

  const res = await knex("cartographie_pois")
    .whereExists(
      knex
        .from(
          knex.raw(
            "jsonb_array_elements(cartographie_references_json) as reference_elements"
          )
        )
        .whereRaw("(reference_elements->>'cartographie_source')::int = ?", [id])
    )
    .delete();

  if (res) console.log(`[cartographie-source], deleting ${res} item(s)`);
};

module.exports = {
  lifecycles: {
    beforeCreate: (data) => beforeSave(data, true),
    beforeUpdate: async (params, data) => {
      const source = await strapi
        .query("cartographie-source")
        .findOne({ id: params.id });
      if (!source) return;

      const hasFileChanged = source.fichier
        ? source.fichier.id !== data.fichier
        : data.fichier !== null;

      await beforeSave(data, hasFileChanged);
    },
    afterDelete: deleteSourcePois,
  },
};
