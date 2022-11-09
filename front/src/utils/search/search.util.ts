import type { PoiType } from "@socialgouv/nos1000jours-lib";
import type { LatLng } from "react-native-maps";

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

export const getCoordinatesByPostalCode = async (
  postalCodeInput: string,
  onInvalidPostalCode: () => void
): Promise<LatLng | undefined> => {
  if (
    postalCodeInput.length !== AroundMeConstants.POSTAL_CODE_MAX_LENGTH ||
    isNaN(Number(postalCodeInput))
  ) {
    onInvalidPostalCode();
    return;
  }

  return AroundMeUtils.getPostalCodeCoords(postalCodeInput);
};
