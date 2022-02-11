import type { ReactElement } from "react";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";

import ArticleCard from "../../components/article/articleCard.component";
import { SecondaryTextItalic } from "../../components/baseComponents";
import { Labels } from "../../constants";
import ArticleDetail from "../../screens/articles/articleDetail.component";
import { Margins, Paddings } from "../../styles";
import type { Article, Step } from "../../types";
import { SearchUtils } from "../../utils";
import TabAroundMeInstruction from "./tabAroundMeInstruction.component";

export const articlesRoute = (
  updatedText: string,
  articles: Article[]
): ReactElement => {
  const [showArticle, setShowArticle] = useState(false);
  const [currentArticleId, setCurrentArticleId] = useState(0);
  const [currentArticleStep, setCurrentArticleStep] = useState<
    Step | undefined
  >();

  if (articles.length <= 0) {
    return (
      <View style={styles.center}>
        <SecondaryTextItalic>{updatedText}</SecondaryTextItalic>
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
          duration={500}
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

export const poisRoute = (
  updatedText: string,
  articles: Article[]
): ReactElement => {
  let searchCanBeLaunched = true;
  if (articles.length > 0) {
    if (SearchUtils.extractedPoiTypesFromArticles(articles).length === 0) {
      searchCanBeLaunched = false;
      updatedText = Labels.search.cantLaunchAroundMeSearch;
    }
  }

  return articles.length > 0 && searchCanBeLaunched ? (
    <TabAroundMeInstruction articles={articles} />
  ) : (
    <View style={styles.center}>
      <SecondaryTextItalic>{updatedText}</SecondaryTextItalic>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    margin: Margins.default,
  },
  listContainer: {
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.smallest,
  },
});
