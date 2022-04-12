import type { FC } from "react";
import { useCallback, useRef } from "react";
import * as React from "react";
import { FlatList } from "react-native";
import * as Animatable from "react-native-animatable";

import type { Article, Step } from "../../types";
import ArticleCard from "./articleCard.component";

interface Props {
  articleList: Article[];
  animationDuration: number;
  step?: Step;
  isFromSearchScreen?: boolean;
  setStepAndArticleId?: (articleId: number, step: Step | undefined) => void;
}

const ArticleList: FC<Props> = ({
  articleList,
  animationDuration,
  step,
  isFromSearchScreen,
  setStepAndArticleId,
}) => {
  const flatListRef = useRef<FlatList>();

  const setFlatListRef = useCallback((ref: FlatList) => {
    flatListRef.current = ref;
  }, []);

  const keyExtractor = useCallback((item: Article) => item.id.toString(), []);

  const renderArticle = useCallback(
    ({ item }: { item: Article }) => {
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
        ref={setFlatListRef}
        data={articleList}
        keyExtractor={keyExtractor}
        renderItem={renderArticle}
      />
    </>
  );
};

export default ArticleList;
