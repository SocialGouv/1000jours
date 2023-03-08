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

export const PARENTS_DOCUMENTS = `
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

export const PARENTHEQUE_VIDEOS = `
  query GetParenthequeVideos {
    videos(sort: "ordre") {
      id
      nom
      description
      ordre
      miniature {
        id
        url
        height
        width
      }
      url
      thematique {
        id
        nom
      }
    }
  }
`;

export const LIST_ARTICLES_WITH_STEP = (
  stepId: number
): string => /* GraphQL */ `
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

export const LIST_FAVORITES_ARTICLES = (
  ids: number[]
): string => /* GraphQL */ `
query GetFavoritesArticles {
  articles(sort: "ordre", where: {
    id_in: [${ids.toString()}]
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

export const LIST_ID_ARTICLES_WITH_STEP = (
  stepId: number | string
): string => /* GraphQL */ `
query GetStepArticles {
  articles(where: {
    etapes: { id: ${stepId} }
  })
  {
    id
  }
}
`;

export const ARTICLE_DETAILS_WITH_ID = (
  articleId: number
): string => /* GraphQL */ `
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
        handicap
      }
    }
  `;

export const LIST_ARTICLES_HANDICAP = /* GraphQL */ `
  query GetHandicapArticles {
    articles(sort: "ordre", where: { handicap: true }) {
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
