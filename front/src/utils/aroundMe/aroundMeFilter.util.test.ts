import type { PoiType } from "@socialgouv/nos1000jours-lib";

import { CartoFilterEnum } from "../../constants/aroundMe.constants";
import type { FetchedFilterFromDb } from "../../type";
import { AroundMeFilterUtils } from "..";

describe("AroundMeFilterUtils", () => {
  describe("isValidateButtonDisabled", () => {
    it("should return true when no filter is selected", () => {
      const selectedFilters: string[] = [];
      expect(
        AroundMeFilterUtils.isValidateButtonDisabled(selectedFilters)
      ).toEqual(true);
    });
    it("should return false when at least one filter is selected", () => {
      const selectedFilters = ["poiType"];
      expect(
        AroundMeFilterUtils.isValidateButtonDisabled(selectedFilters)
      ).toEqual(false);
    });
  });

  describe("getFetchedFilterFromDb", () => {
    it("should return FetchedFilterFromDb", () => {
      const poiTypes: PoiType[] = [
        {
          categorie: "structure",
          nom: "Mairie",
        },
        {
          categorie: "professionnel",
          nom: "Pédopsychiatre",
        },
        {
          categorie: "professionnel",
          nom: "Pédiatre",
        },
        {
          categorie: "structure",
          nom: "Maternité",
        },
        {
          categorie: "professionnel",
          nom: "Pharmacien",
        },
      ];
      expect(AroundMeFilterUtils.getFetchedFilterFromDb(poiTypes)).toEqual({
        professionnels: [
          {
            active: false,
            filterType: "type",
            name: "Pédopsychiatre",
          },
          {
            active: false,
            filterType: "type",
            name: "Pédiatre",
          },
          {
            active: false,
            filterType: "type",
            name: "Pharmacien",
          },
        ],
        structures: [
          {
            active: false,
            filterType: "type",
            name: "Mairie",
          },
          {
            active: false,
            filterType: "type",
            name: "Maternité",
          },
        ],
      });
    });
  });

  describe("deactivateFetchedFilterFromDb", () => {
    it("should deactivate all filters", () => {
      const fetchedFilterFromDb: FetchedFilterFromDb = {
        professionnels: [
          {
            active: false,
            filterType: CartoFilterEnum.type,
            name: "Pédopsychiatre",
          },
          {
            active: true,
            filterType: CartoFilterEnum.type,
            name: "Pédiatre",
          },
          {
            active: true,
            filterType: CartoFilterEnum.type,
            name: "Pharmacien",
          },
        ],
        structures: [
          {
            active: true,
            filterType: CartoFilterEnum.type,
            name: "Mairie",
          },
          {
            active: false,
            filterType: CartoFilterEnum.type,
            name: "Maternité",
          },
        ],
      };
      AroundMeFilterUtils.deactivateFetchedFilterFromDb(fetchedFilterFromDb);

      expect(fetchedFilterFromDb).toEqual({
        professionnels: [
          {
            active: false,
            filterType: CartoFilterEnum.type,
            name: "Pédopsychiatre",
          },
          {
            active: false,
            filterType: CartoFilterEnum.type,
            name: "Pédiatre",
          },
          {
            active: false,
            filterType: CartoFilterEnum.type,
            name: "Pharmacien",
          },
        ],
        structures: [
          {
            active: false,
            filterType: CartoFilterEnum.type,
            name: "Mairie",
          },
          {
            active: false,
            filterType: CartoFilterEnum.type,
            name: "Maternité",
          },
        ],
      });
    });
  });
});
