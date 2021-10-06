export const EPDS_GET_SURVEY = `
  query QuestionsReponses {
    questionnaireEpds(sort: "ordre") {
      ordre
      libelle
      reponse_1_libelle
      reponse_1_points
      reponse_2_libelle
      reponse_2_points
      reponse_3_libelle
      reponse_3_points
      reponse_4_libelle
      reponse_4_points
    }
  }
`;

export const EPDS_ADD_SURVEY_RESULTS = `
  mutation (
    $genre: ENUM_REPONSESEPDS_GENRE!
    $compteur: Int!
    $score: Int!
    $reponseNum1: Int!
    $reponseNum2: Int!
    $reponseNum3: Int!
    $reponseNum4: Int!
    $reponseNum5: Int!
    $reponseNum6: Int!
    $reponseNum7: Int!
    $reponseNum8: Int!
    $reponseNum9: Int!
    $reponseNum10: Int!
  ) {
    createReponsesEpd(
      input: {
        data: {
          genre: $genre
          compteur: $compteur
          score: $score
          reponse_1: $reponseNum1
          reponse_2: $reponseNum2
          reponse_3: $reponseNum3
          reponse_4: $reponseNum4
          reponse_5: $reponseNum5
          reponse_6: $reponseNum6
          reponse_7: $reponseNum7
          reponse_8: $reponseNum8
          reponse_9: $reponseNum9
          reponse_10: $reponseNum10
        }
      }
    ) {
      reponsesEpd {
        id
        created_at
      }
    }
  }
`;

export const EPDS_SEND_CONTACT_INFORMATION = `
  mutation (
    $email: String!
    $telephone: String
    $prenom: String!
    $nombreEnfants: Int!
    $naissanceDernierEnfant: String!
  ) {
    epdsContact(
      email: $email
      telephone: $telephone
      prenom: $prenom
      nombre_enfants: $nombreEnfants
      naissance_dernier_enfant: $naissanceDernierEnfant
    )
  }
`;

export const AROUNDME_FILTER_DATA = `
  query {
    etapes(sort: "id") {
      nom
    }

    cartographieTypes(sort: "nom") {
      nom
      categorie
    }
  }
`;

export const GET_POIS_COUNT_BY_GPSCOORDS = `
  query PoisCountByGPSCoords(
    $long1: Float!
    $lat1: Float!
    $long2: Float!
    $lat2: Float!
    $types: [String!]
    $etapes: [String!]
  ) {
    searchPoisCount(
      perimetre: [$long1, $lat1, $long2, $lat2]
      types: $types
      etapes: $etapes
    )
  }
`;

export const GET_POIS_BY_GPSCOORDS = `
  query PoisByGPSCoords(
    $long1: Float!
    $lat1: Float!
    $long2: Float!
    $lat2: Float!
    $types: [String!]
    $etapes: [String!]
  ) {
    searchPois(
      perimetre: [$long1, $lat1, $long2, $lat2]
      types: $types
      etapes: $etapes
    ) {
      nom
      type
      categorie
      telephone
      courriel
      site_internet
      adresse
      code_postal
      commune
      position_longitude
      position_latitude
    }
  }
`;

export const ARTICLE_GET_STEP_ARTICLES = (stepId: string): string => `
    query GetStepArticles {
      articles(sort: "ordre", where: {
        etapes: { id: ${stepId} }
      })
      {
        id
        titre
        resume
        visuel {
          url
          height
          width
        }
        thematiques {
          nom
          id
        }
      }
    }
  `;
