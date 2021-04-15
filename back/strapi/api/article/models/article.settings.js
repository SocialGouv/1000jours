const enBrefIconeType = {
  "type": "enumeration",
  "enum": [
    "bebe",
    "parent",
    "alimentation"
  ]
}

module.exports = {
  "kind": "collectionType",
  "collectionName": "articles",
  "info": {
    "name": "Article",
    "description": ""
  },
  "options": {
    "increments": true,
    "timestamps": true,
    "draftAndPublish": true
  },
  "attributes": {
    "titre": {
      "type": "string"
    },
    "resume": {
      "type": "text"
    },
    "etapes": {
      "collection": "etape",
      "via": "articles",
      "dominant": true
    },
    "thematiques": {
      "collection": "thematique",
      "via": "articles",
      "dominant": true
    },
    "visuel": {
      "model": "file",
      "via": "related",
      "allowedTypes": [
        "images",
        "files",
        "videos"
      ],
      "plugin": "upload",
      "required": false
    },
    "texte_1_titre": {
      "type": "string"
    },
    "texte_1": {
      "type": "richtext"
    },
    "le_saviez_vous": {
      "type": "text"
    },
    "texte_2_titre": {
      "type": "string"
    },
    "texte_2": {
      "type": "richtext"
    },
    "enbref_1_icone": enBrefIconeType,
    "enbref_1_texte": {
      "type": "text"
    },
    "enbref_2_icone": enBrefIconeType,
    "enbref_2_texte": {
      "type": "text"
    },
    "enbref_3_icone": enBrefIconeType,
    "enbref_3_texte": {
      "type": "text"
    },
    "lien_1_titre": {
      "type": "string"
    },
    "lien_1_url": {
      "type": "string"
    },
    "lien_2_titre": {
      "type": "string"
    },
    "lien_2_url": {
      "type": "string"
    },
    "lien_3_titre": {
      "type": "string"
    },
    "lien_3_url": {
      "type": "string"
    },
    "lien_4_titre": {
      "type": "string"
    },
    "lien_4_url": {
      "type": "string"
    }
  }
}
