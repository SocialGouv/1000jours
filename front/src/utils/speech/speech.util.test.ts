import type { Article } from "../../types";
import * as SpeechUtils from "./speech.util";

describe("Speech utils", () => {
  describe("buildArticleTextToRead", () => {
    it("should build one text from multiple properties of Article (titre + texteTitre1 + texte1 + texteTitre2 + texte2)", () => {
      const article: Article = {
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
        resume: "",
        texte1:
          "Texte 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        texte2:
          "Texte 2. Lorem ipsum duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        texteTitre1: "Titre texte 1",
        texteTitre2: "Titre texte 2",
        thematiques: [],
        titre: "Titre de l'article",
      };
      const expectedString = `${article.titre}. ${article.texteTitre1}. ${article.texte1} ${article.texteTitre2}. ${article.texte2}`;
      expect(SpeechUtils.buildArticleTextToRead(article)).toEqual(
        expectedString
      );
    });
  });
});
