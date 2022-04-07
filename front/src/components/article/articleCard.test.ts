import type { Article } from "./../../types";
import { findArticleById } from "./articleCard.component";

describe("ArticleCard component", () => {
  describe("findArticleById", () => {
    const defaultArticle: Article = {
      enbrefIcone1: "",
      enbrefIcone2: "",
      enbrefIcone3: "",
      enbrefTexte1: "",
      enbrefTexte2: "",
      enbrefTexte3: "",
      id: 0,
      leSaviezVous: "",
      lienTitre1: "",
      lienTitre2: "",
      lienTitre3: "",
      lienTitre4: "",
      lienUrl1: "",
      lienUrl2: "",
      lienUrl3: "",
      lienUrl4: "",
      resume: "",
      texte1: "",
      texte2: "",
      texteTitre1: "",
      texteTitre2: "",
      thematiques: [],
      titre: "Article introuvable",
    };

    it("articles list is empty => default article", () => {
      const articles: Article[] = [];
      const selectedArticleId = 10;

      expect(findArticleById(articles, selectedArticleId)).toEqual(
        defaultArticle
      );
    });

    it("with wrong id => default article", () => {
      const articles: Article[] = [
        {
          enbrefIcone1: "",
          enbrefIcone2: "",
          enbrefIcone3: "",
          enbrefTexte1: "",
          enbrefTexte2: "",
          enbrefTexte3: "",
          id: 114,
          leSaviezVous: "",
          lienTitre1: "",
          lienTitre2: "",
          lienTitre3: "",
          lienTitre4: "",
          lienUrl1: "",
          lienUrl2: "",
          lienUrl3: "",
          lienUrl4: "",
          resume:
            "Se faire conseiller avant de prendre ou d'arrêter un médicament",
          texte1: "",
          texte2: "",
          texteTitre1: "",
          texteTitre2: "",
          thematiques: [],
          titre: "Médicaments et grossesse",
        },
      ];
      const selectedArticleId = 10;

      expect(findArticleById(articles, selectedArticleId)).toEqual(
        defaultArticle
      );
    });

    it("articles list is not empty  => the article", () => {
      const article114: Article = {
        enbrefIcone1: "",
        enbrefIcone2: "",
        enbrefIcone3: "",
        enbrefTexte1: "",
        enbrefTexte2: "",
        enbrefTexte3: "",
        id: 114,
        leSaviezVous: "",
        lienTitre1: "",
        lienTitre2: "",
        lienTitre3: "",
        lienTitre4: "",
        lienUrl1: "",
        lienUrl2: "",
        lienUrl3: "",
        lienUrl4: "",
        resume:
          "Se faire conseiller avant de prendre ou d'arrêter un médicament",
        texte1: "",
        texte2: "",
        texteTitre1: "",
        texteTitre2: "",
        thematiques: [],
        titre: "Médicaments et grossesse",
      };

      const article52: Article = {
        enbrefIcone1: "",
        enbrefIcone2: "",
        enbrefIcone3: "",
        enbrefTexte1: "",
        enbrefTexte2: "",
        enbrefTexte3: "",
        id: 52,
        leSaviezVous: "",
        lienTitre1: "",
        lienTitre2: "",
        lienTitre3: "",
        lienTitre4: "",
        lienUrl1: "",
        lienUrl2: "",
        lienUrl3: "",
        lienUrl4: "",
        resume: "Le premier geste santé pour vous et bébé !",
        texte1: "",
        texte2: "",
        texteTitre1: "",
        texteTitre2: "",
        thematiques: [],
        titre: "La vaccination",
      };

      const articles: Article[] = [article114, article52];
      const selectedArticleId = 52;

      expect(findArticleById(articles, selectedArticleId)).toEqual(article52);
    });
  });
});
