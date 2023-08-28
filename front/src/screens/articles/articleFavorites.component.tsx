import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import { ArticleList } from "../../components";
import { Loader, View } from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import {
  FetchPoliciesConstants,
  HomeDbQueries,
  Labels,
  StorageKeysConstants,
} from "../../constants";
import { GraphQLQuery } from "../../services";
import { Colors, Paddings } from "../../styles";
import type { Article, TabHomeParamList } from "../../types";
import { StorageUtils, TrackerUtils } from "../../utils";

interface Props {
  navigation: StackNavigationProp<TabHomeParamList>;
}

const ArticleFavorites: FC<Props> = ({ navigation }) => {
  const [trackerAction, setTrackerAction] = useState("");

  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [showArticles, setShowArticles] = useState(false);

  const setFavorites = useCallback(async () => {
    const ids = (await StorageUtils.getObjectValue(
      StorageKeysConstants.favoriteArticlesIds
    )) as number[] | undefined;
    setFavoriteIds(ids ?? []);
    if (favoriteIds.length === 0) setArticles([]);
  }, [favoriteIds.length]);

  useEffect(() => {
    void setFavorites();
  }, [setFavorites]);

  useEffect(() => {
    setShowArticles(true);
  }, [articles, favoriteIds]);

  useEffect(() => {
    void setFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResults = useCallback((data: unknown) => {
    const results = (data as { articles: Article[] }).articles;
    setArticles(results);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <TrackerHandler
        screenName={`${TrackerUtils.TrackingEvent.ARTICLE_FAVORITES}`}
        actionName={trackerAction}
      />
      {favoriteIds.length > 0 && (
        <GraphQLQuery
          query={HomeDbQueries.LIST_FAVORITES_ARTICLES(favoriteIds)}
          fetchPolicy={FetchPoliciesConstants.CACHE_AND_NETWORK}
          getFetchedData={handleResults}
          noLoader={true}
        />
      )}

      {showArticles ? (
        <View style={styles.listContainer}>
          <ArticleList
            articleListHeaderParams={{
              description: Labels.article.favorite.description,
              navigation: navigation,
              setArticles: setArticles,
              setTrackerAction: setTrackerAction,
              title: Labels.article.favorite.title,
            }}
            articles={articles}
            animationDuration={1000}
            emptyListMessage={Labels.article.favorite.empty}
            onFavoriteUpdate={setFavorites}
          />
        </View>
      ) : (
        <Loader backdrop={false} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.smallest,
  },
  mainContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});

export default ArticleFavorites;
