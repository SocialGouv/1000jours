import type { FC } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

import { Labels } from "../../constants";
import { Colors, Paddings, Sizes } from "../../styles";
import type { Article, Step } from "../../types";
import { ArticleUtils } from "../../utils";
import { SecondaryText } from "../baseComponents";
import ArticleCard from "./articleCard.component";

type ArticleOrString = Article | string;

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headerComponent?: any;
  articleList: Article[];
  animationDuration: number;
  step?: Step;
  isFromSearchScreen?: boolean;
  setStepAndArticleId?: (articleId: number, step: Step | undefined) => void;
}

const ArticleList: FC<Props> = ({
  headerComponent,
  articleList,
  animationDuration,
  step,
  isFromSearchScreen,
  setStepAndArticleId,
}) => {
  const flatListRef = useRef<FlatList>();
  const [articlesWithHeaders, setArticlesWithHeaders] = useState<
    ArticleOrString[]
  >([]);

  useEffect(() => {
    let mounted = true;
    const sortArticles = async () => {
      const sortedArticles = await ArticleUtils.sortReadAndUnreadArticles(
        articleList
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
  }, [articleList]);

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
              articles={articleList}
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
      articleList,
      isFromSearchScreen,
      setStepAndArticleId,
      step,
    ]
  );

  return (
    <>
      <FlatList
        ListHeaderComponent={headerComponent}
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
