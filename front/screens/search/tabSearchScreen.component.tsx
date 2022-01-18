import { useLazyQuery } from "@apollo/client";
import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, useWindowDimensions, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";
import { SceneMap, TabView } from "react-native-tab-view";

import {
  Button,
  CommonText,
  ErrorMessage,
  Text,
  TitleH1,
} from "../../components";
import ArticleCard from "../../components/article/articleCard.component";
import { Colors, Labels, Margins, Paddings } from "../../constants";
import { SEARCH_ARTICLES_BY_KEYWORDS } from "../../constants/databaseQueries.constants";
import type { Article, Step } from "../../types";
import { KeyboardUtils } from "../../utils";
import { ArticleDetail } from "..";
import TabAroundMeInstruction from "./tabAroundMeInstruction.component";

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
            onChangeText={(text) => {
              setKeywords(text);
            }}
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

const articlesRoute = (articles: Article[]) => {
  const [showArticle, setShowArticle] = useState(false);
  const [currentArticleId, setCurrentArticleId] = useState(0);
  const [currentArticleStep, setCurrentArticleStep] = useState<
    Step | undefined
  >();

  if (articles.length <= 0) {
    return (
      <View style={styles.center}>
        <Text>{Labels.search.noArticleFound}</Text>
      </View>
    );
  }

  return showArticle ? (
    <ArticleDetail
      _articleId={currentArticleId}
      _articleStep={currentArticleStep}
      goBack={() => {
        setShowArticle(false);
      }}
    />
  ) : (
    <ScrollView style={styles.listContainer}>
      {articles.map((article: Article, index: number) => (
        <Animatable.View
          key={index}
          animation="fadeInUp"
          duration={1000}
          delay={0}
        >
          <ArticleCard
            article={article}
            isFromSearchScreen
            setStepAndArticleId={(articleId, step) => {
              setShowArticle(true);
              setCurrentArticleId(articleId);
              setCurrentArticleStep(step);
            }}
          />
        </Animatable.View>
      ))}
    </ScrollView>
  );
};

const poisRoute = (articles: Article[]) =>
  articles.length > 0 ? (
    <TabAroundMeInstruction articles={articles} />
  ) : (
    <View style={styles.center}>
      <Text>{Labels.search.writeKeyword}</Text>
    </View>
  );

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Margins.default,
  },
  listContainer: {
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.smallest,
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
