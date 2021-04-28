const enBrefIconeType = {
  enum: ["bebe", "parent", "alimentation"],
  type: "enumeration",
};

module.exports = {
  attributes: {
    enbref_1_icone: enBrefIconeType,
    enbref_1_texte: {
      type: "text",
    },
    enbref_2_icone: enBrefIconeType,
    enbref_2_texte: {
      type: "text",
    },
    enbref_3_icone: enBrefIconeType,
    enbref_3_texte: {
      type: "text",
    },
    etapes: {
      collection: "etape",
      dominant: true,
      via: "articles",
    },
    le_saviez_vous: {
      type: "text",
    },
    lien_1_titre: {
      type: "string",
    },
    lien_1_url: {
      type: "string",
    },
    lien_2_titre: {
      type: "string",
    },
    lien_2_url: {
      type: "string",
    },
    lien_3_titre: {
      type: "string",
    },
    lien_3_url: {
      type: "string",
    },
    lien_4_titre: {
      type: "string",
    },
    lien_4_url: {
      type: "string",
    },
    resume: {
      required: true,
      type: "text",
    },
    texte_1: {
      type: "richtext",
    },
    texte_1_titre: {
      type: "string",
    },
    texte_2: {
      type: "richtext",
    },
    texte_2_titre: {
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
      required: false,
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
