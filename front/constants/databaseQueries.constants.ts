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
  mutation($genre: ENUM_REPONSESEPDS_GENRE!, $compteur: Int!, $score: Int!) {
    createReponsesEpd(
      input: { data: { genre: $genre, compteur: $compteur, score: $score } }
    ) {
      reponsesEpd {
        created_at
      }
    }
  }
`;

export const AROUNDME_POIS_BY_POSTALCODE = gql`
  query PoisByPostalCode($codePostal: String!) {
    cartographiePois(where: { code_postal: $codePostal }) {
      id
      cartographie_categorie
      type
      nom
      telephone
      courriel
      site_internet
      geocode_adresse
      geocode_code_postal
      geocode_commune
      geocode_position_latitude
      geocode_position_longitude
    }
  }
`;

export const AROUNDME_POIS_BY_GPSCOORDS = gql`
  query PoisByGPSCoords(
    $long1: Float!
    $lat1: Float!
    $long2: Float!
    $lat2: Float!
  ) {
    searchPois(perimetre: [$long1, $lat1, $long2, $lat2]) {
      id
      cartographie_categorie
      type
      nom
      telephone
      courriel
      site_internet
      geocode_adresse
      geocode_code_postal
      geocode_commune
      geocode_position_latitude
      geocode_position_longitude
    }
  }
`;
