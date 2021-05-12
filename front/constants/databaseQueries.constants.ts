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
