import { gql } from "@apollo/client/core";

export const QUESTIONNAIRE_EPDS = gql`
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

export const EPDS_ADD_RESPONSE = gql`
  mutation (
    $genre: ENUM_REPONSESEPDS_GENRE!
    $compteur: Int!
    $score: Int!
    $reponse1: Int!
    $reponse2: Int!
    $reponse3: Int!
    $reponse4: Int!
    $reponse5: Int!
    $reponse6: Int!
    $reponse7: Int!
    $reponse8: Int!
    $reponse9: Int!
    $reponse10: Int!
  ) {
    createReponsesEpd(
      input: {
        data: {
          genre: $genre
          compteur: $compteur
          score: $score
          reponse_1: $reponse1
          reponse_2: $reponse2
          reponse_3: $reponse3
          reponse_4: $reponse4
          reponse_5: $reponse5
          reponse_6: $reponse6
          reponse_7: $reponse7
          reponse_8: $reponse8
          reponse_9: $reponse9
          reponse_10: $reponse10
        }
      }
    ) {
      reponsesEpd {
        created_at
      }
    }
  }
`;

export const AROUNDME_FILTER_DATA = gql`
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

export const AROUNDME_POIS_COUNT_BY_GPSCOORDS = gql`
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

export const AROUNDME_POIS_BY_GPSCOORDS = gql`
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
