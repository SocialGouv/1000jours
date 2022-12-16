export const SEARCH_ARTICLES_BY_KEYWORDS = /* GraphQL */ `
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
      cartographie_pois_types(where: { etapes: { id_gt: 0 } }) {
        nom
      }
    }
  }
`;

export const CARTO_SEND_SUGGESTIONS = /* GraphQL */ `
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
