import { gql, useLazyQuery } from "@apollo/client";
import type { FC } from "react";
import { useState } from "react";
import * as React from "react";
import { StyleSheet, TextInput, useWindowDimensions, View } from "react-native";
import type {
  NavigationState,
  SceneRendererProps,
} from "react-native-tab-view";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

import { articlesRoute, poisRoute } from "../../components";
import {
  CustomButton,
  SecondaryText,
  TitleH1,
} from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import { FetchPoliciesConstants, Labels } from "../../constants";
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
import { KeyboardUtils, StringUtils, TrackerUtils } from "../../utils";
import { stringIsNotNullNorEmpty } from "../../utils/strings.util";

const TabSearchScreen: FC = () => {
  const [keywords, setKeywords] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [updatedText, setUpdatedText] = useState(Labels.search.writeKeyword);
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

  const [getSearchArticlesByKeywords] = useLazyQuery(
    gql(SEARCH_ARTICLES_BY_KEYWORDS),
    {
      fetchPolicy: FetchPoliciesConstants.NO_CACHE,
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        const results = (data as { articles: Article[] }).articles;
        setArticles(results);
        if (results.length === 0) setUpdatedText(Labels.search.noArticleFound);
      },
    }
  );

  const onSearchByKeywords = async () => {
    setUpdatedText(Labels.search.loading);
    KeyboardUtils.dismissKeyboard();
    if (stringIsNotNullNorEmpty(keywords)) {
      setEnteredKeyword(keywords);
      const variables = {
        keywords,
      };
      await getSearchArticlesByKeywords({ variables });
    }
  };

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
            onChangeText={(text: string) => {
              setKeywords(text);
              if (!StringUtils.stringIsNotNullNorEmpty(text)) {
                setUpdatedText(Labels.search.writeKeyword);
                setArticles([]);
              }
            }}
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
          articlesSearchResult: () => articlesRoute(updatedText, articles),
          poisSearchResult: () => poisRoute(updatedText, articles),
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
