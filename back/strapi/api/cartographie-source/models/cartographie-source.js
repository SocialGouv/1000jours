"use strict";

const StringService = require("../../string/services");
const StreamService = require("../../stream/services/Stream");
const CartographieSourcesService = require("../services");

const beforeSave = async (data, hasFileChanged = false) => {
  data.nom = data.nom.trim();

  data.identifiant = StringService.slugLower(data.nom);

  if (data.regles) {
    for (const keyRegles of Object.values(data.regles)) {
      if (!Array.isArray(keyRegles)) continue;

      keyRegles.forEach((regle) => {
        if (!regle.valeur) return;

        regle.valeur = regle.valeur.trim();
      });
    }
  }

  if (hasFileChanged) {
    if (data.fichier) {
      const fichier = await strapi.plugins["upload"].services.upload.fetch({
        id: data.fichier,
      });

      data.source = fichier.name;

      const columns = await StreamService.processHeader(fichier);

      if (columns) {
        data.champs = columns.join("\n");
      }

      data.version = !data.version ? 1 : data.version + 1;
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
  },
};
