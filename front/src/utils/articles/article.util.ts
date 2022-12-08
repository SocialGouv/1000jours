import { StorageKeysConstants } from "../../constants";
import type { Article } from "../../types";
import { getObjectValue } from "../storage.util";

export const isArticleRead = async (articleId: number): Promise<boolean> => {
  const readArticlesIds: number[] = await getReadArticlesIds();
  return readArticlesIds.includes(articleId);
};

export const isArticleInFavorites = async (
  articleId: number
): Promise<boolean> => {
  const favoritesArticles: number[] =
    (await getObjectValue(StorageKeysConstants.favoriteArticlesIds)) ?? [];
  return favoritesArticles.includes(articleId);
};

export const sortReadAndUnreadArticles = async (
  articles: Article[]
): Promise<{
  unreadArticles: Article[];
  readArticles: Article[];
}> => {
  const readArticleIds: number[] = await getReadArticlesIds();
  return {
    readArticles: getReadArticles(articles, readArticleIds),
    unreadArticles: getUnreadArticles(articles, readArticleIds),
  };
};

const getReadArticles = (articles: Article[], readArticleIds: number[]) =>
  articles.filter((article) => readArticleIds.includes(article.id));

const getUnreadArticles = (articles: Article[], readArticleIds: number[]) =>
  articles.filter((article) => !readArticleIds.includes(article.id));

const getReadArticlesIds = async (): Promise<number[]> => {
  const readArticlesIds: number[] =
    (await getObjectValue(StorageKeysConstants.articlesRead)) ?? [];
  return readArticlesIds;
};
