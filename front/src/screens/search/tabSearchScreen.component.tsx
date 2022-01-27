import { useLazyQuery } from "@apollo/client";
import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, useWindowDimensions, View } from "react-native";
import type {
  NavigationState,
  SceneRendererProps,
} from "react-native-tab-view";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

import { articlesRoute, poisRoute, TrackerHandler } from "../../components";
import {
  CustomButton,
  ErrorMessage,
  SecondaryText,
  TitleH1,
} from "../../components/baseComponents";
import { Labels } from "../../constants";
import { SEARCH_ARTICLES_BY_KEYWORDS } from "../../constants/databaseQueries.constants";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
  Paddings,
  Sizes,
} from "../../styles";
import type { Article } from "../../types";
import { KeyboardUtils, TrackerUtils } from "../../utils";

const TabSearchScreen: FC = () => {
  const [keywords, setKeywords] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [enteredKeyword, setEnteredKeyword] = useState("");

  // Tabs
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      accessible: true,
      key: "articlesSearchResult",
      title: Labels.search.articles,
    },
    {
      accessible: true,
      key: "poisSearchResult",
      title: Labels.search.aroundMe,
    },
  ]);

  const [getSearchArticlesByKeywords, { loading, error, data }] = useLazyQuery(
    SEARCH_ARTICLES_BY_KEYWORDS(keywords)
  );

  const onSearchByKeywords = async () => {
    setIsLoading(true);
    setEnteredKeyword(keywords);
    KeyboardUtils.dismissKeyboard();
    await getSearchArticlesByKeywords();
  };

  useEffect(() => {
    if (!loading && data) {
      const results = (data as { articles: Article[] }).articles;
      setArticles(results);
    }

    setIsLoading(false);
  }, [loading, data]);

  if (error) return <ErrorMessage error={error} />;

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{
        accessible: boolean;
        key: string;
        title: string;
      }>;
    }
  ) => (
    <TabBar
      {...props}
      labelStyle={styles.tabBarLabel}
      style={[styles.whiteBackground]}
      indicatorStyle={styles.indicator}
    />
  );

  return (
    <>
      <View style={styles.mainContainer}>
        <TrackerHandler
          screenName={TrackerUtils.TrackingEvent.RECHERCHER}
          searchKeyword={enteredKeyword}
        />
        <TitleH1
          title={Labels.search.title}
          description={Labels.search.findAdaptedResponses}
          showDescription={articles.length === 0}
          animated={false}
        />
        <View style={styles.searchBloc}>
          <SecondaryText>{Labels.search.yourSearch}</SecondaryText>
          <TextInput
            style={styles.searchInput}
            onChangeText={setKeywords}
            placeholder={Labels.search.writeKeywordPlaceholder}
            value={keywords}
          />

          <View style={styles.center}>
            <CustomButton
              titleStyle={styles.fontButton}
              title={Labels.search.validButton}
              rounded={true}
              action={onSearchByKeywords}
            />
          </View>
        </View>
      </View>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          articlesSearchResult: () => articlesRoute(articles),
          poisSearchResult: () => poisRoute(articles),
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={styles.whiteBackground}
      />
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Margins.default,
  },
  fontButton: {
    fontSize: Sizes.sm,
  },
  indicator: {
    backgroundColor: Colors.primaryBlue,
  },
  mainContainer: {
    backgroundColor: Colors.white,
    paddingLeft: Paddings.default,
    paddingRight: Paddings.default,
    paddingTop: Paddings.default,
  },
  searchBloc: {
    paddingTop: Paddings.default,
  },
  searchInput: {
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.medium),
    marginVertical: Margins.smaller,
    paddingHorizontal: Paddings.light,
    paddingVertical: Paddings.smallest,
  },
  tabBarLabel: {
    color: Colors.primaryBlue,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.medium),
  },
  whiteBackground: {
    backgroundColor: Colors.white,
  },
});

export default TabSearchScreen;
