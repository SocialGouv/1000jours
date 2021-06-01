"use strict";

const { slugLower } = require("../../string/services");

const beforeSave = async (data) => {
  if (!data.categorie) throw new Error("Choisir une catégorie");

  data.nom = data.nom.trim();

  data.identifiant = `${data.categorie} - ${data.nom}`;
};

module.exports = {
  lifecycles: {
    beforeCreate: beforeSave,
    beforeUpdate: (params, data) => beforeSave(data),
  },
};
