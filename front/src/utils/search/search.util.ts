import type { PoiType } from "@socialgouv/nos1000jours-lib";

import { AroundMeConstants, StorageKeysConstants } from "../../constants";
import type { CartoFilterStorage } from "../../type";
import type { Article } from "../../types";
import * as AroundMeUtils from "../aroundMe/aroundMe.util";
import { storeObjectValue } from "../storage.util";

export const extractedPoiTypesFromArticles = (
  articles: Article[]
): PoiType[] => {
  const finalCartographieTypes: PoiType[] = [];
  articles.forEach((article) => {
    if (!article.cartographie_pois_types) return;
    const filteredTypes = article.cartographie_pois_types.filter(
      (type) =>
        !finalCartographieTypes.some((finalType) => finalType.nom === type.nom)
    );
    finalCartographieTypes.push(...filteredTypes);
  });

  if (finalCartographieTypes.length > 0) {
    const cartoFilterStorage: CartoFilterStorage = {
      types: finalCartographieTypes.map((type) => type.nom),
    };
    void storeObjectValue(
      StorageKeysConstants.cartoFilterKey,
      cartoFilterStorage
    );
  }

  return finalCartographieTypes;
};

export const searchRegionByPostalCode = async (postalCodeInput: string) => {
  if (
    postalCodeInput.length !== AroundMeConstants.POSTAL_CODE_MAX_LENGTH ||
    isNaN(Number(postalCodeInput))
  ) {
    //postalCodeIsInvalid();
    return;
  }

  const postalCodeCoords = await AroundMeUtils.getPostalCodeCoords(
    postalCodeInput
  );

  return postalCodeCoords;
};

// const onPostalCodeInvalid = useCallback(() => {
//   setPostalCodeInvalid(true);
//   setIsLoading(false);
// }, []);
