import type { Article, ArticleFilter } from "../../types";
import { ArticleFilterUtils } from "..";

describe("ArticleFilter utils", () => {
  const articleFilters: ArticleFilter[] = [
    {
      active: true,
      nbArticles: 3,
      thematique: {
        id: 1,
        nom: "Thematique 1",
      },
    },
  ];

  const articles: Article[] = [
    {
      enbrefIcone1: "",
      enbrefIcone2: "",
      enbrefIcone3: "",
      enbrefTexte1: "",
      enbrefTexte2: "",
      enbrefTexte3: "",
      id: 1,
      leSaviezVous: "",
      lienTitre1: "",
      lienTitre2: "",
      lienTitre3: "",
      lienTitre4: "",
      lienUrl1: "",
      lienUrl2: "",
      lienUrl3: "",
      lienUrl4: "",
      resume: "Sum up article 1",
      texte1: "",
      texte2: "",
      texteTitre1: "",
      texteTitre2: "",
      thematiques: [
        {
          id: 1,
          nom: "Thematique 1",
        },
        {
          id: 2,
          nom: "Thematique 2",
        },
        {
          id: 3,
          nom: "Thematique 3",
        },
      ],
      titre: "Title 1",
    },
    {
      enbrefIcone1: "",
      enbrefIcone2: "",
      enbrefIcone3: "",
      enbrefTexte1: "",
      enbrefTexte2: "",
      enbrefTexte3: "",
      id: 2,
      leSaviezVous: "",
      lienTitre1: "",
      lienTitre2: "",
      lienTitre3: "",
      lienTitre4: "",
      lienUrl1: "",
      lienUrl2: "",
      lienUrl3: "",
      lienUrl4: "",
      resume: "Sum up article 2",
      texte1: "",
      texte2: "",
      texteTitre1: "",
      texteTitre2: "",
      thematiques: [
        {
          id: 1,
          nom: "Thematique 1",
        },
        {
          id: 2,
          nom: "Thematique 2",
        },
      ],
      titre: "Title 2",
    },
  ];

  describe("getFilters", () => {
    it("should get filters from articles", () => {
      expect(ArticleFilterUtils.getFilters(articles)).toEqual([
        {
          active: false,
          nbArticles: 2,
          thematique: {
            id: 1,
            nom: "Thematique 1",
          },
        },
        {
          active: false,
          nbArticles: 2,
          thematique: {
            id: 2,
            nom: "Thematique 2",
          },
        },
        {
          active: false,
          nbArticles: 1,
          thematique: {
            id: 3,
            nom: "Thematique 3",
          },
        },
      ]);
    });
  });

  describe("filterButtonLabel", () => {
    it("should return complete label when some filters are active", () => {
      expect(ArticleFilterUtils.filterButtonLabel(articleFilters)).toEqual(
        "Filtrer (1 actif(s))"
      );
    });

    it("should return simple label when no filters are active", () => {
      const filters: ArticleFilter[] = [
        {
          active: false,
          nbArticles: 1,
          thematique: {
            id: 2,
            nom: "Thematique 2",
          },
        },
      ];

      expect(ArticleFilterUtils.filterButtonLabel(filters)).toEqual("Filtrer");
    });
  });

  describe("filterButtonAccessibilityLabel", () => {
    it("should return label when some filters are active", () => {
      expect(
        ArticleFilterUtils.filterButtonAccessibilityLabel(articleFilters)
      ).toEqual("Filtrer. (1 filtre actif)");
    });
  });

  describe("checkboxAccessibilityLabel", () => {
    it("should return accessibility label for selected filter", () => {
      expect(
        ArticleFilterUtils.checkboxAccessibilityLabel(articleFilters[0])
      ).toEqual("Thematique 1. (3 articles disponibles)");
    });
  });

  describe("updateFilters", () => {
    it("should activate selected filter when it was not selected before", () => {
      const selectedFilter: ArticleFilter = {
        active: false,
        nbArticles: 3,
        thematique: {
          id: 1,
          nom: "Thematique 1",
        },
      };

      const filtersToUpdate: ArticleFilter[] = [
        {
          active: false,
          nbArticles: 6,
          thematique: {
            id: 2,
            nom: "Thematique 2",
          },
        },
        {
          active: false,
          nbArticles: 3,
          thematique: {
            id: 1,
            nom: "Thematique 1",
          },
        },
      ];

      expect(
        ArticleFilterUtils.updateFilters(filtersToUpdate, selectedFilter)
      ).toEqual([
        {
          active: false,
          nbArticles: 6,
          thematique: {
            id: 2,
            nom: "Thematique 2",
          },
        },
        {
          active: true,
          nbArticles: 3,
          thematique: {
            id: 1,
            nom: "Thematique 1",
          },
        },
      ]);
    });

    it("should deactivate selected filter when it was already selected", () => {
      const selectedFilter: ArticleFilter = {
        active: true,
        nbArticles: 3,
        thematique: {
          id: 1,
          nom: "Thematique 1",
        },
      };

      const filtersToUpdate: ArticleFilter[] = [
        {
          active: false,
          nbArticles: 6,
          thematique: {
            id: 2,
            nom: "Thematique 2",
          },
        },
        {
          active: true,
          nbArticles: 3,
          thematique: {
            id: 1,
            nom: "Thematique 1",
          },
        },
      ];

      expect(
        ArticleFilterUtils.updateFilters(filtersToUpdate, selectedFilter)
      ).toEqual([
        {
          active: false,
          nbArticles: 6,
          thematique: {
            id: 2,
            nom: "Thematique 2",
          },
        },
        {
          active: false,
          nbArticles: 3,
          thematique: {
            id: 1,
            nom: "Thematique 1",
          },
        },
      ]);
    });
  });

  describe("areArticlesNotAllFavorites", () => {
    it("should return false when all articles are favorites", () => {
      const favoriteArticlesIds = [1, 2];

      expect(
        ArticleFilterUtils.areArticlesNotAllFavorites(
          articles,
          favoriteArticlesIds
        )
      ).toBeFalsy();
    });

    it("should return true when one of the articles is not in favorites", () => {
      const favoriteArticlesIds = [2];

      expect(
        ArticleFilterUtils.areArticlesNotAllFavorites(
          articles,
          favoriteArticlesIds
        )
      ).toBeTruthy();
    });
  });

  describe("hideArticleNotInFavorites", () => {
    it("should hide article that is not in favorites", () => {
      const articleToBeHidden = articles[0];
      const favoriteArticles = [articles[1]];

      expect(
        ArticleFilterUtils.hideArticleNotInFavorites(
          articleToBeHidden,
          favoriteArticles
        )
      ).toEqual({
        enbrefIcone1: "",
        enbrefIcone2: "",
        enbrefIcone3: "",
        enbrefTexte1: "",
        enbrefTexte2: "",
        enbrefTexte3: "",
        hide: true,
        id: 1,
        leSaviezVous: "",
        lienTitre1: "",
        lienTitre2: "",
        lienTitre3: "",
        lienTitre4: "",
        lienUrl1: "",
        lienUrl2: "",
        lienUrl3: "",
        lienUrl4: "",
        resume: "Sum up article 1",
        texte1: "",
        texte2: "",
        texteTitre1: "",
        texteTitre2: "",
        thematiques: [
          {
            id: 1,
            nom: "Thematique 1",
          },
          {
            id: 2,
            nom: "Thematique 2",
          },
          {
            id: 3,
            nom: "Thematique 3",
          },
        ],
        titre: "Title 1",
      });
    });
  });

  describe("shouldShowFavoriteToggle", () => {
    it("should return false when no article is a favorite", () => {
      const favoriteArticlesIds = [3, 4];
      expect(
        ArticleFilterUtils.shouldShowFavoriteToggle(
          articles,
          favoriteArticlesIds
        )
      ).toBeFalsy();
    });

    it("should return true when at least one article is a favorite", () => {
      const favoriteArticlesIds = [1, 3, 4];
      expect(
        ArticleFilterUtils.shouldShowFavoriteToggle(
          articles,
          favoriteArticlesIds
        )
      ).toBeTruthy();
    });
  });

  describe("getFavoriteArticles", () => {
    it("should return favorite articles when an article is a favorite and in the list", () => {
      const favoriteArticlesIds = [2, 12, 3];
      expect(
        ArticleFilterUtils.getFavoriteArticles(articles, favoriteArticlesIds)
      ).toEqual([
        {
          enbrefIcone1: "",
          enbrefIcone2: "",
          enbrefIcone3: "",
          enbrefTexte1: "",
          enbrefTexte2: "",
          enbrefTexte3: "",
          id: 2,
          leSaviezVous: "",
          lienTitre1: "",
          lienTitre2: "",
          lienTitre3: "",
          lienTitre4: "",
          lienUrl1: "",
          lienUrl2: "",
          lienUrl3: "",
          lienUrl4: "",
          resume: "Sum up article 2",
          texte1: "",
          texte2: "",
          texteTitre1: "",
          texteTitre2: "",
          thematiques: [
            {
              id: 1,
              nom: "Thematique 1",
            },
            {
              id: 2,
              nom: "Thematique 2",
            },
          ],
          titre: "Title 2",
        },
      ]);
    });

    it("should return empty list when no article in the list matches with favorites", () => {
      const favoriteArticlesIds = [12];
      expect(
        ArticleFilterUtils.getFavoriteArticles(articles, favoriteArticlesIds)
      ).toEqual([]);
    });
  });
});
