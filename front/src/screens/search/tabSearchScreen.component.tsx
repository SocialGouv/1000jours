import { gql, useLazyQuery } from "@apollo/client";
import type { FC } from "react";
import { useState } from "react";
import * as React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import type {
  NavigationState,
  SceneRendererProps,
} from "react-native-tab-view";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

import { articlesRoute, poisRoute } from "../../components";
import {
  CustomButton,
  Icomoon,
  IcomoonIcons,
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
import type { TrackerSearch } from "../../type";
import type { Article } from "../../types";
import { KeyboardUtils, StringUtils, TrackerUtils } from "../../utils";
import { stringIsNotNullNorEmpty } from "../../utils/strings.util";

const TabSearchScreen: FC = () => {
  const [keywords, setKeywords] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [updatedText, setUpdatedText] = useState(Labels.search.writeKeyword);
  const [trackerSearchObject, setTrackerSearchObject] =
    useState<TrackerSearch>();
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

  const [getSearchArticlesByKeywords] = useLazyQuery(
    gql(SEARCH_ARTICLES_BY_KEYWORDS),
    {
      fetchPolicy: FetchPoliciesConstants.NO_CACHE,
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        const results = (data as { articles: Article[] }).articles;
        setArticles(results);
        if (results.length === 0) setUpdatedText(Labels.search.noArticleFound);
        setTrackerSearchObject({
          category: trackerSearchCategory,
          count: results.length,
          keyword: keywords,
        });
      },
    }
  );

  const onSearchByKeywords = async () => {
    setUpdatedText(Labels.search.loading);
    KeyboardUtils.dismissKeyboard();
    if (stringIsNotNullNorEmpty(keywords)) {
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
          searchObject={trackerSearchObject}
        />
        <TitleH1
          title={Labels.search.title}
          description={Labels.search.findAdaptedResponses}
          showDescription={articles.length === 0}
          animated={false}
        />
        <View style={articles.length === 0 && styles.searchView}>
          <SecondaryText>{Labels.search.yourSearch}</SecondaryText>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.searchTextInput}
              onChangeText={(text: string) => {
                setKeywords(text);
                if (!StringUtils.stringIsNotNullNorEmpty(text)) {
                  setUpdatedText(Labels.search.writeKeyword);
                  setArticles([]);
                }
              }}
              placeholder={Labels.search.writeKeywordPlaceholder}
              value={keywords}
              clearButtonMode="always"
            />
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setKeywords("");
                setArticles([]);
                setUpdatedText(Labels.search.writeKeyword);
              }}
            >
              <Icomoon
                name={IcomoonIcons.fermer}
                size={Sizes.xs}
                color={Colors.primaryBlue}
              />
            </TouchableOpacity>
          </View>
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
  clearButton: {
    bottom: 0,
    justifyContent: "center",
    marginRight: Margins.smaller,
    position: "absolute",
    right: 0,
    top: 0,
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
  searchTextInput: {
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.medium),
    paddingLeft: Margins.smaller,
    width: "90%",
  },
  searchView: {
    paddingTop: Paddings.default,
  },
  tabBarLabel: {
    color: Colors.primaryBlueDark,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.medium),
  },
  textInputView: {
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    flexDirection: "row",
    paddingVertical: Paddings.smallest,
  },
  whiteBackground: {
    backgroundColor: Colors.white,
  },
});

export default TabSearchScreen;
