import { useCallback, useEffect, useState } from "react";

import { StorageKeysConstants } from "../constants";
import { StorageUtils } from "../utils";

const useFavoriteArticlesIds = (): number[] => {
  const [favoriteArticlesIds, setFavoriteArticlesIds] = useState<number[]>([]);

  const getFavoriteArticlesIds = useCallback(async () => {
    const ids: number[] | null = await StorageUtils.getObjectValue(
      StorageKeysConstants.favoriteArticlesIds
    );

    if (ids) setFavoriteArticlesIds(ids);
  }, []);

  useEffect(() => {
    void getFavoriteArticlesIds();
  }, [getFavoriteArticlesIds]);

  return favoriteArticlesIds;
};

export default useFavoriteArticlesIds;
