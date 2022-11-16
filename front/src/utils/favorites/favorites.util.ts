import { StorageKeysConstants } from "../../constants";
import { scheduleFavoritesNotification } from "../notifications/favorites/favoritesNotification.util";
import { getObjectValue, storeObjectValue } from "../storage.util";

export const handleOnFavorite = async (
  shouldAddFavorite: boolean,
  articleId: number
): Promise<void> => {
  let favoriteArticles: number[] =
    (await getObjectValue(StorageKeysConstants.favoriteArticlesIds)) ?? [];

  if (shouldAddFavorite && !favoriteArticles.includes(articleId)) {
    favoriteArticles.push(articleId);
    await scheduleFavoritesNotification();
  } else if (!shouldAddFavorite) {
    favoriteArticles = favoriteArticles.filter((id) => id !== articleId);
  }

  await storeObjectValue(
    StorageKeysConstants.favoriteArticlesIds,
    favoriteArticles
  );
};
