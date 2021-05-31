const CartographieCategories = require("../../cartographie-categories/models/cartographie-categories.settings.json");

module.exports = {
  kind: "collectionType",
  collectionName: "cartographie_pois",
  info: {
    name: "Cartographie POI",
    description: "",
  },
  options: {
    increments: true,
    timestamps: true,
    draftAndPublish: false,
  },
  attributes: {
    cartographie_categorie: {
      type: "enumeration",
      enum: ["structures", "professionnels"],
    },
    type: {
      type: "enumeration",
      enum: [
        "STRUCTURES",
        ...CartographieCategories.attributes.structures.enum,
        "PROFESSIONNELS",
        ...CartographieCategories.attributes.professionnels.enum,
      ],
      required: true,
    },
    nom: {
      type: "string",
      required: true,
    },
    adresse: {
      type: "string",
    },
    telephone: {
      type: "string",
    },
    courriel: {
      type: "string",
    },
    site_internet: {
      type: "string",
    },
    code_postal: {
      type: "string",
    },
    commune: {
      type: "string",
    },
    position_longitude: {
      type: "float",
    },
    position_latitude: {
      type: "float",
    },
    references: {
      type: "json",
    },
    donnees_specifiques: {
      type: "json",
    },
    cartographie_geocode: {
      via: "cartographie_pois",
      model: "cartographie-geocode",
    },
    cartographie_data: {
      collection: "cartographie-data",
      via: "cartographie_poi",
    },
  },
};
