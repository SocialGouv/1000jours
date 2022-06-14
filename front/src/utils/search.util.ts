import type { PoiType } from "@socialgouv/nos1000jours-lib";

import { StorageKeysConstants } from "../constants";
import type { CartoFilterStorage } from "../type";
import type { Article } from "../types";
import { storeObjectValue } from "./storage.util";

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
      thematiques: [],
      types: finalCartographieTypes.map((type) => type.nom),
    };
    void storeObjectValue(
      StorageKeysConstants.cartoFilterKey,
      cartoFilterStorage
    );
  }

  return finalCartographieTypes;
};