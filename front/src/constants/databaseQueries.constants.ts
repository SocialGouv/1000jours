import type { DocumentNode } from "@apollo/client/core";
import { gql } from "@apollo/client/core";

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
