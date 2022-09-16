import { useEffect, useState } from "react";

import { StorageKeysConstants } from "../constants";
import type { CartoFilterStorage } from "../type";
import { StorageUtils } from "../utils";

const useSavedCartographyFilters = (): CartoFilterStorage => {
  const [savedCartoFilterStorage, setSavedCartoFilterStorage] =
    useState<CartoFilterStorage>({ types: [] });

  useEffect(() => {
    const getSavedCartographyFilters = async () => {
      const savedFilters: CartoFilterStorage | null =
        await StorageUtils.getObjectValue(StorageKeysConstants.cartoFilterKey);

      if (savedFilters) setSavedCartoFilterStorage(savedFilters);
    };

    void getSavedCartographyFilters();
  }, []);

  return savedCartoFilterStorage;
};

export default useSavedCartographyFilters;
