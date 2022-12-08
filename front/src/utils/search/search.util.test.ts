import AsyncStorage from "@react-native-async-storage/async-storage";
import type { PoiType } from "@socialgouv/nos1000jours-lib";
import type { LatLng } from "react-native-maps";

import { StorageKeysConstants } from "../../constants";
import type { Article } from "../../types";
import { AroundMeUtils, StorageUtils } from "..";
import {
  extractedPoiTypesFromArticles,
  getCoordinatesByPostalCode,
} from "./search.util";

describe("Search Util", () => {
  describe("searchRegionByPostalCode", () => {
    let mockGetPostalCodeCoords: any = undefined;
    const mockData: LatLng = { latitude: 47.220676, longitude: -1.563173 };

    beforeAll(() => {
      mockGetPostalCodeCoords = jest
        .spyOn(AroundMeUtils, "getPostalCodeCoords")
        .mockResolvedValue(mockData);
    });

    it("should return lat/long by postal code", async () => {
      const result = await getCoordinatesByPostalCode("44000", () => {});
      expect(result).toEqual(mockData);

      mockGetPostalCodeCoords.mockRestore();
    });

    it("should return error for invalid postal code (too short)", async () => {
      const result = await getCoordinatesByPostalCode("440", () => {});
      expect(result).toEqual(undefined);

      mockGetPostalCodeCoords.mockRestore();
    });

    it("should return error for invalid postal code (not a number)", async () => {
      const result = await getCoordinatesByPostalCode("hello", () => {});
      expect(result).toEqual(undefined);

      mockGetPostalCodeCoords.mockRestore();
    });
  });

  describe("extractedPoiTypesFromArticles", () => {
    const articleList: Article[] = [
      {
        cartographie_pois_types: [
          { categorie: "", nom: "Maternité" },
          { categorie: "", nom: "Maison de naissance" },
          { categorie: "", nom: "PMI" },
          { categorie: "", nom: "CPAM" },
        ],
        enbrefIcone1: "",
        enbrefIcone2: "",
        enbrefIcone3: "",
        enbrefTexte1: "",
        enbrefTexte2: "",
        enbrefTexte3: "",
        id: 128,
        leSaviezVous: "",
        lienTitre1: "",
        lienTitre2: "",
        lienTitre3: "",
        lienTitre4: "",
        lienUrl1: "",
        lienUrl2: "",
        lienUrl3: "",
        lienUrl4: "",
        resume: "Solliciter de l'aide de la part d'un professionnel de santé",
        texte1: "",
        texte2: ",",
        texteTitre1: "",
        texteTitre2: "",
        thematiques: [],
        titre: "Mettre de côté tabac et alcool",
        visuel: {
          hash: "tabac_7755f320e9",
          height: 788,
          id: "226",
          url: "https://backoffice-1000jours-preprod.dev.fabrique.social.gouv.fr/uploads/tabac_7755f320e9.png",
          width: 940,
        },
      },
      {
        cartographie_pois_types: [
          { categorie: "", nom: "Maternité" },
          { categorie: "", nom: "PMI" },
          { categorie: "", nom: "Pédiatre" },
          { categorie: "", nom: "Sage-femme" },
        ],
        enbrefIcone1: "",
        enbrefIcone2: "",
        enbrefIcone3: "",
        enbrefTexte1: "",
        enbrefTexte2: "",
        enbrefTexte3: "",
        id: 171,
        leSaviezVous: "",
        lienTitre1: "",
        lienTitre2: "",
        lienTitre3: "",
        lienTitre4: "",
        lienUrl1: "",
        lienUrl2: "",
        lienUrl3: "",
        lienUrl4: "",
        resume: "Solliciter de l'aide de la part d'un professionnel de santé",
        texte1: "",
        texte2: ",",
        texteTitre1: "",
        texteTitre2: "",
        thematiques: [],
        titre: "Mettre de côté tabac et alcool",
        visuel: {
          hash: "tabac_7755f320e9",
          height: 788,
          id: "226",
          url: "https://backoffice-1000jours-preprod.dev.fabrique.social.gouv.fr/uploads/tabac_7755f320e9.png",
          width: 940,
        },
      },
    ];

    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("Should save POI types in local storage and return PoiType list", async () => {
      const result = extractedPoiTypesFromArticles(articleList);
      const poiTypeExpected: PoiType[] = [
        { categorie: "", nom: "Maternité" },
        { categorie: "", nom: "Maison de naissance" },
        { categorie: "", nom: "PMI" },
        { categorie: "", nom: "CPAM" },
        { categorie: "", nom: "Pédiatre" },
        { categorie: "", nom: "Sage-femme" },
      ];
      expect(result).toEqual(poiTypeExpected);

      // Check localStorage
      const storedTypes = await StorageUtils.getObjectValue(
        StorageKeysConstants.cartoFilterKey
      );
      const expectedTypes = {
        types: [
          "Maternité",
          "Maison de naissance",
          "PMI",
          "CPAM",
          "Pédiatre",
          "Sage-femme",
        ],
      };
      expect(storedTypes).toEqual(expectedTypes);
    });
  });
});
