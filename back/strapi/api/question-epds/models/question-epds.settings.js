module.exports = {
  attributes: {
    language: {
      type: "text",
    },
    order: {
      "type": "integer"
    },
    label: {
      type: "string",
    },
    "reponses-epds": {
      collection: "reponse-epds",
      via: "questions-epds"
    },
  },
  collectionName: "questions-epds",
  info: {
    description: "",
    name: "Question EPDS",
  },
  kind: "collectionType",
  options: {
    draftAndPublish: true,
    increments: true,
    timestamps: true,
  },
};
