import { useLazyQuery } from "@apollo/client";
import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, useWindowDimensions, View } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

import { Button, CommonText, ErrorMessage, TitleH1 } from "../../components";
import { Colors, Labels, Margins, Paddings } from "../../constants";
import { SEARCH_ARTICLES_BY_KEYWORDS } from "../../constants/databaseQueries.constants";
import type { Article } from "../../types";
import { KeyboardUtils } from "../../utils";
import { articlesRoute, poisRoute } from "./tabSearchRoutes.component";

const TabSearchScreen: FC = () => {
  const [keywords, setKeywords] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);

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
    KeyboardUtils.dismissKeyboard();
    await getSearchArticlesByKeywords();
  };

  useEffect(() => {
    if (!loading && data) {
      const results = (data as { articles: Article[] }).articles;
      setArticles(results);
    }
  }, [loading, data]);

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <View style={styles.mainContainer}>
        <TitleH1
          title={Labels.search.title}
          description={Labels.search.findAdaptedResponses}
          animated={false}
        />

        <View style={styles.searchBloc}>
          <CommonText>{Labels.search.yourSearch}</CommonText>
          <TextInput
            style={styles.searchInput}
            onChangeText={setKeywords}
            placeholder={Labels.search.writeKeywordPlaceholder}
            value={keywords}
          />

          <View style={styles.center}>
            <Button
              title={Labels.search.validButton}
              rounded={true}
              action={onSearchByKeywords}
            />
          </View>
        </View>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          articlesSearchResult: () => articlesRoute(articles),
          poisSearchResult: () => poisRoute(articles),
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ backgroundColor: Colors.white }}
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
    marginVertical: Margins.smaller,
    paddingHorizontal: Paddings.light,
    paddingVertical: Paddings.smallest,
  },
});

export default TabSearchScreen;
