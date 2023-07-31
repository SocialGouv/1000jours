import Constants from "expo-constants";
import _ from "lodash";
import type { FC } from "react";
import { useCallback, useState } from "react";
import * as React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import type {
  NavigationState,
  SceneRendererProps,
} from "react-native-tab-view";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

import {
  CustomButton,
  CustomTextInput,
  SecondaryText,
  TitleH1,
} from "../../components/baseComponents";
import {
  ArticlesRoute,
  PoisRoute,
} from "../../components/search/tabSearchRoutes.component";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import {
  FetchPoliciesConstants,
  Labels,
  SearchQueries,
  StorageKeysConstants,
} from "../../constants";
import { GraphQLLazyQuery } from "../../services";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
  Paddings,
  Sizes,
} from "../../styles";
import type { TrackerSearch } from "../../type";
import type { TrackerUserInfo } from "../../type/userInfo.types";
import type { Article, UserSituation } from "../../types";
import {
  KeyboardUtils,
  StorageUtils,
  StringUtils,
  TrackerUtils,
} from "../../utils";

const TabSearchScreen: FC = () => {
  const [keywords, setKeywords] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [updatedText, setUpdatedText] = useState(Labels.search.writeKeyword);
  const [trackerSearchObject, setTrackerSearchObject] =
    useState<TrackerSearch>();
  const [triggerGetArticles, setTriggerGetArticles] = useState(false);
  const [queryVariables, setQueryVariables] = useState<unknown>();
  const trackerSearchCategory = "Onglet Rechercher";

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

  const onSearchByKeywords = useCallback(() => {
    setUpdatedText(Labels.search.loading);
    KeyboardUtils.dismissKeyboard();
    if (StringUtils.isNotNullNorEmpty(keywords)) {
      const trimedKeywords = keywords.trim();
      setKeywords(trimedKeywords);
      setQueryVariables({ keywords: trimedKeywords });
      setTriggerGetArticles(!triggerGetArticles);
    }
  }, [keywords, triggerGetArticles]);

  const getUserInfo = async () => {
    const userSituations = (await StorageUtils.getObjectValue(
      StorageKeysConstants.userSituationsKey
    )) as UserSituation[] | null;
    const gender = await StorageUtils.getObjectValue(
      StorageKeysConstants.userGenderKey
    );
    const currentStep = await StorageUtils.getObjectValue(
      StorageKeysConstants.currentStep
    );

    let userSituationLabel = null;
    if (userSituations) {
      const userSituation = _.find(userSituations, { isChecked: true });
      userSituationLabel = userSituation?.label ?? null;
    }

    const userInfo: TrackerUserInfo = {
      dimension1: Constants.expoConfig?.version ?? "",
      dimension2: userSituationLabel,
      dimension3: gender?.label ?? null,
      dimension4: currentStep?.nom ?? null,
    };
    return userInfo;
  };

  const handleResults = useCallback(
    async (data: unknown) => {
      if (data) {
        const results = (data as { articles: Article[] }).articles;
        setArticles(results);
        if (results.length === 0) setUpdatedText(Labels.search.noArticleFound);
        setTrackerSearchObject({
          category: trackerSearchCategory,
          count: results.length,
          keyword: keywords,
          userInfo: await getUserInfo(),
        });
      } else setUpdatedText(Labels.errorMsg);
    },
    [keywords]
  );

  const renderTabBar = useCallback(
    (
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
    ),
    []
  );

  const onKeywordsTextInputChanged = useCallback((text: string) => {
    setKeywords(text);
    if (!StringUtils.isNotNullNorEmpty(text)) {
      setUpdatedText(Labels.search.writeKeyword);
      setArticles([]);
    }
  }, []);

  const onClearPressed = useCallback(() => {
    setKeywords("");
    setArticles([]);
    setUpdatedText(Labels.search.writeKeyword);
  }, []);

  return (
    <>
      <View style={styles.mainContainer}>
        <TrackerHandler
          screenName={TrackerUtils.TrackingEvent.RECHERCHER}
          searchObject={trackerSearchObject}
        />
        <TitleH1
          title={Labels.search.title}
          description={Labels.search.findAdaptedResponses}
          showDescription={articles.length === 0}
          animated={false}
        />
        <GraphQLLazyQuery
          query={SearchQueries.SEARCH_ARTICLES_BY_KEYWORDS}
          fetchPolicy={FetchPoliciesConstants.NO_CACHE}
          notifyOnNetworkStatusChange
          getFetchedData={handleResults}
          triggerLaunchQuery={triggerGetArticles}
          variables={queryVariables}
          noLoader
        />
        <View style={articles.length === 0 && styles.searchView}>
          <SecondaryText>{Labels.search.yourSearch}</SecondaryText>
          <CustomTextInput
            textInputValue={keywords}
            onChangeText={onKeywordsTextInputChanged}
            onClearPress={onClearPressed}
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
          articlesSearchResult: () => ArticlesRoute(updatedText, articles),
          poisSearchResult: () => PoisRoute(updatedText, articles),
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
  searchView: {
    paddingTop: Paddings.default,
  },
  tabBarLabel: {
    color: Colors.primaryBlueDark,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.medium),
  },
  whiteBackground: {
    backgroundColor: Colors.white,
  },
});

export default TabSearchScreen;
