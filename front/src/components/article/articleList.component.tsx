import type { FC } from "react";
import * as React from "react";
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
  return (
    <>
      {articleList.map((article, index) => (
        <Animatable.View
          key={index}
          animation="fadeInUp"
          duration={animationDuration}
          delay={0}
        >
          <ArticleCard
            selectedArticleId={article.id}
            articles={articleList}
            step={step}
            isFromSearchScreen={isFromSearchScreen}
            setStepAndArticleId={setStepAndArticleId}
          />
        </Animatable.View>
      ))}
    </>
  );
};

export default ArticleList;
