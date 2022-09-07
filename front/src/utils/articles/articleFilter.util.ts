import _ from "lodash";

import { Labels } from "../../constants";
import type { Article, ArticleFilter } from "../../types";

export const getFilters = (articlesToFilter: Article[]): ArticleFilter[] =>
  _.chain(articlesToFilter)
    .flatMap(({ thematiques }) => {
      return thematiques;
    })
    .groupBy("id")
    .map((thematiques) => {
      return {
        active: false,
        nbArticles: thematiques.length,
        thematique: thematiques[0],
      };
    })
    .value();

export const updateFilters = (
  filtersToUpdate: ArticleFilter[],
  selectedFilter: ArticleFilter
): ArticleFilter[] =>
  filtersToUpdate.map((filter) => {
    if (filter.thematique.id == selectedFilter.thematique.id)
      return { ...filter, active: !selectedFilter.active };

    return filter;
  });

export const filterButtonLabel = (filters: ArticleFilter[]): string => {
  const nbOfActiveFilters = numberOfActiveFilters(filters);
  return nbOfActiveFilters
    ? `${Labels.articleList.filters} (${nbOfActiveFilters} actif(s))`
    : Labels.articleList.filters;
};

export const filterButtonAccessibilityLabel = (
  filters: ArticleFilter[]
): string =>
  `${Labels.articleList.filters}. (${numberOfActiveFilters(filters)} ${
    Labels.accessibility.articlesFilters.activeFilter
  })`;

export const checkboxAccessibilityLabel = (filter: ArticleFilter): string =>
  `${filter.thematique.nom}. (${filter.nbArticles} ${Labels.accessibility.articlesFilters.availableArticles})`;

export const areArticlesNotAllFavorites = (
  articles: Article[],
  favoriteArticlesIds: number[]
): boolean =>
  articles.some((article) => {
    return !favoriteArticlesIds.includes(article.id);
  });

export const shouldShowFavoriteToggle = (
  articles: Article[],
  favoriteArticlesIds: number[]
): boolean => getFavoriteArticles(articles, favoriteArticlesIds).length > 0;

export const getFavoriteArticles = (
  articles: Article[],
  favoriteArticlesIds: number[]
): Article[] =>
  articles.filter((article) => favoriteArticlesIds.includes(article.id));

export const hideArticleNotInFavorites = (
  article: Article,
  favoriteArticles: Article[]
): Article => {
  let hide = false;
  if (favoriteArticles.length > 0) hide = !favoriteArticles.includes(article);
  return { ...article, hide: hide };
};

const numberOfActiveFilters = (filters: ArticleFilter[]) =>
  filters.filter((item) => item.active).length;
