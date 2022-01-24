import type { ReactElement } from "react";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";

import ArticleCard from "../../components/article/articleCard.component";
import { SecondaryTextItalic } from "../../components/baseComponents";
import { Labels } from "../../constants";
import ArticleDetail from "../../screens/articleDetail.component";
import { Margins, Paddings } from "../../styles";
import type { Article, Step } from "../../types";
import TabAroundMeInstruction from "./tabAroundMeInstruction.component";

export const articlesRoute = (articles: Article[]): ReactElement => {
  const [showArticle, setShowArticle] = useState(false);
  const [currentArticleId, setCurrentArticleId] = useState(0);
  const [currentArticleStep, setCurrentArticleStep] = useState<
    Step | undefined
  >();

  if (articles.length <= 0) {
    return (
      <View style={styles.center}>
        <SecondaryTextItalic>{Labels.search.writeKeyword}</SecondaryTextItalic>
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

export const poisRoute = (articles: Article[]): ReactElement =>
  articles.length > 0 ? (
    <TabAroundMeInstruction articles={articles} />
  ) : (
    <View style={styles.center}>
      <SecondaryTextItalic>{Labels.search.writeKeyword}</SecondaryTextItalic>
    </View>
  );

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
