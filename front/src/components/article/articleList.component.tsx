import _ from "lodash";
import type { FC } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import { AccessibilityInfo, FlatList, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

import { Labels } from "../../constants";
import { Colors, Paddings, Sizes } from "../../styles";
import type { Article, ArticleListHeaderParams, Step } from "../../types";
import { ArticleUtils } from "../../utils";
import { SecondaryText } from "../baseComponents/StyledText";
import ArticleCard from "./articleCard.component";
import ArticleListHeader from "./articleListHeader.component";

type ArticleOrString = Article | string;

interface Props {
  articles: Article[];
  articleListHeaderParams?: ArticleListHeaderParams;
  animationDuration: number;
  step?: Step;
  isFromSearchScreen?: boolean;
  setStepAndArticleId?: (articleId: number, step: Step | undefined) => void;
}

const ArticleList: FC<Props> = ({
  articleListHeaderParams,
  articles,
  animationDuration,
  step,
  isFromSearchScreen,
  setStepAndArticleId,
}) => {
  const flatListRef = useRef<FlatList>();
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [articlesWithHeaders, setArticlesWithHeaders] = useState<
    ArticleOrString[]
  >([]);

  useEffect(() => {
    const articlesToShow = _.filter(articles, (article) => !article.hide);
    setFilteredArticles(articlesToShow);

    if (articlesToShow.length > 0)
      AccessibilityInfo.announceForAccessibility(
        articleToReadAccessibilityLabel()
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articles, filteredArticles.length]);

  const articleToReadAccessibilityLabel = () =>
    `${filteredArticles.length} ${Labels.accessibility.articleToRead}`;

  useEffect(() => {
    let mounted = true;
    const sortArticles = async () => {
      const sortedArticles = await ArticleUtils.sortReadAndUnreadArticles(
        filteredArticles
      );

      const _articlesWithHeaders: ArticleOrString[] = [];
      if (sortedArticles.unreadArticles.length > 0) {
        _articlesWithHeaders.push(
          `${sortedArticles.unreadArticles.length} ${Labels.articleList.articlesToRead}`
        );
        sortedArticles.unreadArticles.forEach((article) => {
          _articlesWithHeaders.push(article);
        });
      }
      if (sortedArticles.readArticles.length > 0) {
        _articlesWithHeaders.push(
          `${sortedArticles.readArticles.length} ${Labels.articleList.articlesAlreadyRead}`
        );
        sortedArticles.readArticles.forEach((article) => {
          _articlesWithHeaders.push(article);
        });
      }
      if (mounted) setArticlesWithHeaders(_articlesWithHeaders);
    };

    void sortArticles();

    return () => {
      mounted = false;
    };
  }, [filteredArticles]);

  const setFlatListRef = useCallback((ref: FlatList) => {
    flatListRef.current = ref;
  }, []);

  const keyExtractor = useCallback(
    (item: ArticleOrString) =>
      typeof item === "string" ? item : item.id.toString(),
    []
  );

  const renderArticle = useCallback(
    ({ item }: { item: ArticleOrString }) => {
      if (typeof item === "string") {
        return (
          <SecondaryText style={styles.headerListInfo}>{item}</SecondaryText>
        );
      } else {
        return (
          <Animatable.View
            animation="fadeInUp"
            duration={animationDuration}
            delay={0}
          >
            <ArticleCard
              selectedArticleId={item.id}
              articles={filteredArticles}
              step={step}
              isFromSearchScreen={isFromSearchScreen}
              setStepAndArticleId={setStepAndArticleId}
            />
          </Animatable.View>
        );
      }
    },
    [
      animationDuration,
      filteredArticles,
      isFromSearchScreen,
      setStepAndArticleId,
      step,
    ]
  );

  return (
    <>
      <FlatList
        ListHeaderComponent={
          articleListHeaderParams ? (
            <ArticleListHeader
              title={articleListHeaderParams.title}
              description={articleListHeaderParams.description}
              articles={articles}
              setArticles={articleListHeaderParams.setArticles}
              setTrackerAction={articleListHeaderParams.setTrackerAction}
              navigation={articleListHeaderParams.navigation}
            />
          ) : null
        }
        ref={setFlatListRef}
        data={articlesWithHeaders}
        keyExtractor={keyExtractor}
        renderItem={renderArticle}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerListInfo: {
    color: Colors.secondaryGreen,
    fontSize: Sizes.xs,
    fontStyle: "italic",
    paddingTop: Paddings.default,
    paddingVertical: Paddings.smaller,
  },
});

export default ArticleList;
