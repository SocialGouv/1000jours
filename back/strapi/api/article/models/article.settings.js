const enBrefIconeType = {
  enum: ["bebe", "parent", "alimentation"],
  type: "enumeration",
};

module.exports = {
  attributes: {
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
    notifications: {
      default: false,
      type: "boolean",
    },
    evenements: {
      collection: "evenement",
      via: "articles",
    },
    ordre: {
      type: "integer",
    },
    cartographie_pois_types: {
      collection: "cartographie-types",
      dominant: true,
      via: "articles",
    },
    handicap: {
      default: false,
      type: "boolean",
    },
    resume: {
      required: true,
      type: "text",
    },
    mots_cles: {
      default: "",
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
