import AsyncStorage from "@react-native-async-storage/async-storage";

import { StorageKeysConstants } from "../../constants";
import type { Article } from "../../types";
import { ArticleUtils } from "..";

describe("ArticleUtils", () => {
  describe("isArticleRead", () => {
    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("should return true when article is read", async () => {
      await AsyncStorage.setItem(
        StorageKeysConstants.articlesRead,
        JSON.stringify([1, 2, 3])
      );
      await ArticleUtils.isArticleRead(1).then((data) => {
        expect(data).toEqual(true);
      });
    });

    it("should return false when article has not been read yet", async () => {
      await AsyncStorage.setItem(
        StorageKeysConstants.articlesRead,
        JSON.stringify([2, 3])
      );
      await ArticleUtils.isArticleRead(1).then((data) => {
        expect(data).toEqual(false);
      });
    });

    it("should return false when no article has been read yet", async () => {
      await ArticleUtils.isArticleRead(1).then((data) => {
        expect(data).toEqual(false);
      });
    });
  });

  describe("isArticleInFavorites", () => {
    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("should return true when article id is in favorites", async () => {
      await AsyncStorage.setItem(
        StorageKeysConstants.favoriteArticlesIds,
        JSON.stringify([1, 2, 3])
      );
      await ArticleUtils.isArticleInFavorites(1).then((data) => {
        expect(data).toEqual(true);
      });
    });

    it("should return false when article is not in favorites", async () => {
      await AsyncStorage.setItem(
        StorageKeysConstants.favoriteArticlesIds,
        JSON.stringify([2, 3])
      );
      await ArticleUtils.isArticleRead(1).then((data) => {
        expect(data).toEqual(false);
      });
    });

    it("should return false when no article is in favorites", async () => {
      await ArticleUtils.isArticleRead(1).then((data) => {
        expect(data).toEqual(false);
      });
    });
  });

  describe("sortReadAndUnreadArticles", () => {
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
        ],
        titre: "Title 2",
      },
    ];

    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("should return only read articles when all articles in list are read", async () => {
      await AsyncStorage.setItem(
        StorageKeysConstants.articlesRead,
        JSON.stringify([1, 2])
      );

      await ArticleUtils.sortReadAndUnreadArticles(articles).then((data) => {
        expect(data).toEqual({ readArticles: articles, unreadArticles: [] });
      });
    });

    it("should return only unread articles when all articles in list have not been read yet", async () => {
      await AsyncStorage.setItem(
        StorageKeysConstants.articlesRead,
        JSON.stringify([3, 4])
      );
      await ArticleUtils.sortReadAndUnreadArticles(articles).then((data) => {
        expect(data).toEqual({ readArticles: [], unreadArticles: articles });
      });
    });

    it("should return only unread articles when no articles have been read yet", async () => {
      await ArticleUtils.sortReadAndUnreadArticles(articles).then((data) => {
        expect(data).toEqual({ readArticles: [], unreadArticles: articles });
      });
    });

    it("should return both read and unread articles when articles are read and unread", async () => {
      await AsyncStorage.setItem(
        StorageKeysConstants.articlesRead,
        JSON.stringify([1, 3])
      );
      await ArticleUtils.sortReadAndUnreadArticles(articles).then((data) => {
        expect(data).toEqual({
          readArticles: [
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
              ],
              titre: "Title 1",
            },
          ],
          unreadArticles: [
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
              ],
              titre: "Title 2",
            },
          ],
        });
      });
    });
  });
});
