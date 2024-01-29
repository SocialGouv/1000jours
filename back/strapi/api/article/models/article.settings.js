const enBrefIconeType = {
  enum: ["bebe", "parent", "alimentation"],
  type: "enumeration",
};

module.exports = {
  attributes: {
    cartographie_pois_types: {
      collection: "cartographie-types",
      dominant: true,
      via: "articles",
    },
    enbref_1_icone: enBrefIconeType,
    enbref_1_texte: {
      default: "",
      type: "text",
    },
    enbref_2_icone: enBrefIconeType,
    enbref_2_texte: {
      default: "",
      type: "text",
    },
    enbref_3_icone: enBrefIconeType,
    enbref_3_texte: {
      default: "",
      type: "text",
    },
    etapes: {
      collection: "etape",
      dominant: true,
      via: "articles",
    },
    evenements: {
      collection: "evenement",
      via: "articles",
    },
    handicap: {
      default: false,
      type: "boolean",
    },
    le_saviez_vous: {
      default: "",
      type: "text",
    },
    lien_1_titre: {
      default: "",
      type: "string",
    },
    lien_1_url: {
      default: "",
      type: "string",
    },
    lien_2_titre: {
      default: "",
      type: "string",
    },
    lien_2_url: {
      default: "",
      type: "string",
    },
    lien_3_titre: {
      default: "",
      type: "string",
    },
    lien_3_url: {
      default: "",
      type: "string",
    },
    lien_4_titre: {
      default: "",
      type: "string",
    },
    lien_4_url: {
      default: "",
      type: "string",
    },
    mots_cles: {
      default: "",
      type: "text",
    },
    notifications: {
      default: false,
      type: "boolean",
    },
    ordre: {
      type: "integer",
    },
    resume: {
      required: true,
      type: "text",
    },
    texte_1: {
      default: "",
      type: "richtext",
    },
    texte_1_titre: {
      default: "",
      type: "string",
    },
    texte_2: {
      default: "",
      type: "richtext",
    },
    texte_2_titre: {
      default: "",
      type: "string",
    },
    thematiques: {
      collection: "thematique",
      dominant: true,
      via: "articles",
    },
    titre: {
      required: true,
      type: "string",
    },
    visuel: {
      allowedTypes: ["images"],
      model: "file",
      plugin: "upload",
      required: true,
      via: "related",
    },
    zero_accident: {
      default: false,
      type: "boolean",
    },
  },
  collectionName: "articles",
  info: {
    description: "",
    name: "Article",
  },
  kind: "collectionType",
  options: {
    draftAndPublish: true,
    increments: true,
    timestamps: true,
  },
};
