const enBrefIconeType = {
  enum: ["bebe", "parent", "alimentation"],
  type: "enumeration",
};

module.exports = {
  attributes: {
    enbref_1_icone: enBrefIconeType,
    enbref_1_texte: {
      type: "text",
      default: "",
    },
    enbref_2_icone: enBrefIconeType,
    enbref_2_texte: {
      type: "text",
      default: "",
    },
    enbref_3_icone: enBrefIconeType,
    enbref_3_texte: {
      type: "text",
      default: "",
    },
    etapes: {
      collection: "etape",
      dominant: true,
      via: "articles",
    },
    ordre: {
      type: "integer",
    },
    le_saviez_vous: {
      type: "text",
      default: "",
    },
    lien_1_titre: {
      type: "string",
      default: "",
    },
    lien_1_url: {
      type: "string",
      default: "",
    },
    lien_2_titre: {
      type: "string",
      default: "",
    },
    lien_2_url: {
      type: "string",
      default: "",
    },
    lien_3_titre: {
      type: "string",
      default: "",
    },
    lien_3_url: {
      type: "string",
      default: "",
    },
    lien_4_titre: {
      type: "string",
      default: "",
    },
    lien_4_url: {
      type: "string",
      default: "",
    },
    resume: {
      required: true,
      type: "text",
    },
    texte_1: {
      type: "richtext",
      default: "",
    },
    texte_1_titre: {
      type: "string",
      default: "",
    },
    texte_2: {
      type: "richtext",
      default: "",
    },
    texte_2_titre: {
      type: "string",
      default: "",
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
    notifications: {
      type: "boolean",
      default: false,
    },
    evenements: {
      via: "articles",
      collection: "evenement",
    },
    cartographie_pois_types: {
      collection: "cartographie-types",
      via: "articles",
      dominant: true,
    },
    mots_cles: {
      type: "text",
      default: "",
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
