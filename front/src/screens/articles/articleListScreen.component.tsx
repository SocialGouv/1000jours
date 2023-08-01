import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import { ArticleList } from "../../components";
import { View } from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import { FetchPoliciesConstants, HomeDbQueries } from "../../constants";
import { GraphQLQuery } from "../../services";
import { Colors, FontWeight, Paddings, Sizes } from "../../styles";
import type { Article, Step, TabHomeParamList } from "../../types";
import { TrackerUtils } from "../../utils";

interface Props {
  navigation: StackNavigationProp<TabHomeParamList>;
  route: RouteProp<{ params: { step: Step } }, "params">;
}

const ArticleListScreen: FC<Props> = ({ navigation, route }) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const screenTitle = route?.params?.step?.nom ?? null;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const description = route?.params?.step?.description ?? null;
  const [trackerAction, setTrackerAction] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [showArticles, setShowArticles] = useState(false);

  useEffect(() => {
    setShowArticles(true);
  }, [articles]);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", () => {
      setShowArticles(false);
      setTimeout(() => {
        setShowArticles(true);
      }, 100);
    });
    return willFocusSubscription;
  }, [navigation]);

  const handleResults = useCallback((data: unknown) => {
    const results = (data as { articles: Article[] }).articles;
    setArticles(results);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <TrackerHandler
        screenName={TrackerUtils.trackerArticlesScreenName(
          route.params.step.nom
        )}
        actionName={trackerAction}
      />
      {showArticles && (
        <View style={styles.listContainer}>
          <ArticleList
            articleListHeaderParams={{
              description: description ?? undefined,
              navigation: navigation,
              setArticles: setArticles,
              setTrackerAction: setTrackerAction,
              title: screenTitle,
            }}
            articles={articles}
            animationDuration={1000}
            step={route.params.step}
          />
        </View>
      )}
      <GraphQLQuery
        query={HomeDbQueries.LIST_ARTICLES_WITH_STEP(route.params.step.id)}
        fetchPolicy={FetchPoliciesConstants.CACHE_AND_NETWORK}
        getFetchedData={handleResults}
        noLoaderBackdrop={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  borderLeftRadius: {
    borderBottomLeftRadius: Sizes.xxxxxs,
    borderTopLeftRadius: Sizes.xxxxxs,
  },
  description: {
    color: Colors.commonText,
  },
  flexStart: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  listContainer: {
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.smallest,
  },
  mainContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  title: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.md,
    fontWeight: FontWeight.black,
    textTransform: "uppercase",
  },
  topContainer: {
    paddingTop: Paddings.default,
  },
});

export default ArticleListScreen;
