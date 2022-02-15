import type { DocumentNode } from "@apollo/client/core";
import { gql } from "@apollo/client/core";

export const HOME_GET_ALL_STEPS = `
  query GetAllSteps {
    etapes(sort: "id") {
      id
      nom
      ordre
      description
      debut
      fin
    }
  }
`;

export const LIST_ARTICLES_WITH_STEP = (stepId: number): string => `
query GetStepArticles {
  articles(sort: "ordre", where: {
    etapes: { id: ${stepId} }
  })
  {
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

export const ARTICLE_DETAILS_WITH_ID = (articleId: number): string => `
    query GetArticleDetail {
      article(id: ${articleId}) {
        id
        titre
        resume
        texteTitre1: texte_1_titre
        texte1: texte_1
        texteTitre2: texte_2_titre
        texte2: texte_2
        leSaviezVous: le_saviez_vous
        enbrefTexte1: enbref_1_texte
        enbrefTexte2: enbref_2_texte
        enbrefTexte3: enbref_3_texte
        enbrefIcone1: enbref_1_icone
        enbrefIcone2: enbref_2_icone
        enbrefIcone3: enbref_3_icone
        lienTitre1: lien_1_titre
        lienTitre2: lien_2_titre
        lienTitre3: lien_3_titre
        lienTitre4: lien_4_titre
        lienUrl1: lien_1_url
        lienUrl2: lien_2_url
        lienUrl3: lien_3_url
        lienUrl4: lien_4_url
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
    $email: String
    $telephone: String
    $prenom: String
    $nombreEnfants: Int
    $naissanceDernierEnfant: String
    $moyen: String
    $horaires: String
  ) {
    epdsContact(
      email: $email
      telephone: $telephone
      prenom: $prenom
      nombre_enfants: $nombreEnfants
      naissance_dernier_enfant: $naissanceDernierEnfant
      moyen: $moyen
      horaires: $horaires
    )
  }
`;

export const ALL_EVENTS = gql`
  query GetEvents {
    evenements {
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
      typesPoi: types_poi {
        id
        nom
        categorie
      }
      articles {
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
    parenthequeDocuments(sort: "ordre") {
      id
      nom
      description
      ordre
      fichier {
        url
      }
    }
  }
`;

export const SEARCH_ARTICLES_BY_KEYWORDS = `
    query SearchArticlesByKeywords($keywords: String) {
      articles(where: { _q: $keywords }) {
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
        cartographie_pois_types {
          nom
        }
      }
    }
  `;
