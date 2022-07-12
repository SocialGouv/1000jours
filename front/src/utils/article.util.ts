import { StorageKeysConstants } from "../constants";
import type { Article } from "../types";
import { getObjectValue } from "./storage.util";

export const isArticleRead = async (articleId: number): Promise<boolean> => {
  const articlesRead: number[] =
    (await getObjectValue(StorageKeysConstants.articlesRead)) ?? [];
  return articlesRead.includes(articleId);
};

export const isArticleInFavorites = async (
  articleId: number
): Promise<boolean> => {
  const favoritesArticles: number[] =
    (await getObjectValue(StorageKeysConstants.favoriteArticlesIds)) ?? [];
  return favoritesArticles.includes(articleId);
};

export const areArticlesRead = async (
  articlesId: number[]
): Promise<boolean[]> => {
  return Promise.all(articlesId.map(async (id) => isArticleRead(id)));
};

export const sortReadAndUnreadArticles = async (
  articles: Article[]
): Promise<{
  unreadArticles: Article[];
  readArticles: Article[];
}> => {
  const articlesId = articles.map((article) => article.id);
  const readOrUnreadArticlesId = await areArticlesRead(articlesId);

  const readArticlesId: number[] = [];
  const unreadArticlesId: number[] = [];
  articlesId.forEach((_, index) => {
    if (readOrUnreadArticlesId[index]) readArticlesId.push(articlesId[index]);
    else unreadArticlesId.push(articlesId[index]);
  });

  const unreadArticles = articles.filter((article) =>
    unreadArticlesId.includes(article.id)
  );
  const readArticles = articles.filter((article) =>
    readArticlesId.includes(article.id)
  );

  return { readArticles, unreadArticles };
};
