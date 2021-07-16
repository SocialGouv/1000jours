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
  mutation ($genre: ENUM_REPONSESEPDS_GENRE!, $compteur: Int!, $score: Int!) {
    createReponsesEpd(
      input: { data: { genre: $genre, compteur: $compteur, score: $score } }
    ) {
      reponsesEpd {
        created_at
      }
    }
  }
`;

export const EPDS_CONTACT_INFORMATION = gql`
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
