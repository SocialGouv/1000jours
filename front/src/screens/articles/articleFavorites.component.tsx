import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import { ArticleList } from "../../components";
import { CommonText, Loader, View } from "../../components/baseComponents";
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

  const setFavorites = async () => {
    const ids = (await StorageUtils.getObjectValue(
      StorageKeysConstants.favoriteArticlesIds
    )) as number[] | undefined;
    if (ids) setFavoriteIds(ids);
  };

  useEffect(() => {
    void setFavorites();
  }, []);

  useEffect(() => {
    setShowArticles(true);
  }, [articles]);

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
      {favoriteIds.length > 0 ? (
        <GraphQLQuery
          query={HomeDbQueries.LIST_FAVORITES_ARTICLES(favoriteIds)}
          fetchPolicy={FetchPoliciesConstants.CACHE_AND_NETWORK}
          getFetchedData={handleResults}
        />
      ) : (
        <View>
          <CommonText>{Labels.article.favorite.empty}</CommonText>
        </View>
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
          />
        </View>
      ) : (
        <Loader />
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
