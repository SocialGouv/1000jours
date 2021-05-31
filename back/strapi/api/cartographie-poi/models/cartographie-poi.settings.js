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
    telephone: {
      type: "string",
    },
    courriel: {
      type: "string",
    },
    site_internet: {
      type: "string",
    },
    adresse: {
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
    geocode: {
      type: "boolean",
      default: false,
    },
    geocode_adresse: {
      type: "string",
    },
    geocode_code_postal: {
      type: "string",
    },
    geocode_commune: {
      type: "string",
    },
    geocode_position_longitude: {
      type: "float",
    },
    geocode_position_latitude: {
      type: "float",
    },
  },
};
