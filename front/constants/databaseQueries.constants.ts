import type { DocumentNode } from "@apollo/client/core";
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

export const GET_EVENT_ARTICLES = (
  whereCondition: string,
  limit: number
): DocumentNode => {
  return gql`
  query GetArticles($etapeIds: [ID], $thematiqueId: ID) {
    articles(
      sort: "ordre"
      where: { ${whereCondition} }
      limit: ${limit}
    ) {
      id
      titre
      resume
      visuel {
        id
        hash
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
};

export const GET_EVENT_DETAILS = (eventId: string): DocumentNode => {
  return gql`
    query GetEventDetails {
      evenement(id: ${eventId})
      {
        id
        nom
        description
        debut
        fin
        thematique {
          id
          nom
        }
        etapes {
          id
          nom
        }
      }
    }
  `;
};

export const CARTO_SEND_SUGGESTIONS = gql`
  mutation (
    $nouveauxPois: String
    $suggestionsAmeliorations: String
    $nombreEnfants: Int!
    $codePostal: String!
  ) {
    cartographieSuggestions(
      nouveaux_pois: $nouveauxPois
      suggestions_ameliorations: $suggestionsAmeliorations
      nombre_enfants: $nombreEnfants
      code_postal: $codePostal
    )
  }
`;

export const PARENTS_DOCUMENTS = gql`
  query GetParenthequeDocuments {
    parenthequeDocuments {
      id
      nom
      description
      fichier {
        url
      }
    }
  }
`;
