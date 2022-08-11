import type { PoiType } from "@socialgouv/nos1000jours-lib";

import type { AroundMeConstants } from "../../constants";
import {
  CartoFilterEnum,
  PoiCategorieEnum,
} from "../../constants/aroundMe.constants";
import type { CartoFilter, FetchedFilterFromDb } from "../../type";

export const isValidateButtonDisabled = (
  selectedFilters: string[]
): boolean => {
  return selectedFilters.length === 0;
};

export const getFetchedFilterFromDb = (
  poiTypes: PoiType[]
): FetchedFilterFromDb => {
  return {
    professionnels: getCartoFiltersFromPoiTypes(
      poiTypes,
      PoiCategorieEnum.professionnel
    ),
    structures: getCartoFiltersFromPoiTypes(
      poiTypes,
      PoiCategorieEnum.structure
    ),
  };
};

export const deactivateFetchedFilterFromDb = (
  fetchedFilterFromDb: FetchedFilterFromDb
): void => {
  deactivateCartographyFilters(fetchedFilterFromDb.professionnels);
  deactivateCartographyFilters(fetchedFilterFromDb.structures);
};

const getCartoFiltersFromPoiTypes = (
  poiTypes: PoiType[],
  poiCategory: AroundMeConstants.PoiCategorieEnum
): CartoFilter[] => {
  return poiTypes
    .filter((poiType) => poiType.categorie === poiCategory)
    .map((poiType) => {
      return {
        active: false,
        filterType: CartoFilterEnum.type,
        name: poiType.nom,
      };
    });
};

const deactivateCartographyFilters = (filters: CartoFilter[]): void => {
  filters.map((filter) => (filter.active = false));
};
