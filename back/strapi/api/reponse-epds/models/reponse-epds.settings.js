module.exports = {
  attributes: {
    order: {
      type: "integer"
    },
    label: {
      type: "string",
    },
    points: {
      type: "integer"
    },
    "questions-epds": {
      collection: "question-epds",
      via: "reponses-epds",
      "dominant": true
    },
  },
  collectionName: "reponses-epds",
  info: {
    description: "",
    name: "Réponse EPDS",
  },
  kind: "collectionType",
  options: {
    draftAndPublish: true,
    increments: true,
    timestamps: true,
  },
};
