import { StorageKeysConstants } from "../constants";
import { getObjectValue } from "./storage.util";

export const isArticleRead = async (articleId: number): Promise<boolean> => {
  const articlesRead: number[] =
    (await getObjectValue(StorageKeysConstants.articlesRead)) ?? [];
  return articlesRead.includes(articleId);
};
