import ExpoFastImage from "expo-fast-image";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Image, ListItem } from "react-native-elements";

import DefaultImage from "../../assets/images/default.png";
import { Labels } from "../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type { Article, Step } from "../../types";
import {
  ArticleUtils,
  getVisuelFormat,
  RootNavigation,
  VisuelFormat,
} from "../../utils";
import { CommonText, SecondaryText } from "../baseComponents";

interface Props {
  selectedArticleId: number;
  articles: Article[];
  step?: Step;
  isFromSearchScreen?: boolean;
  setStepAndArticleId?: (articleId: number, step: Step | undefined) => void;
}

const ArticleCard: FC<Props> = ({
  selectedArticleId,
  articles,
  step,
  isFromSearchScreen,
  setStepAndArticleId,
}) => {
  const article: Article | undefined = articles.find(
    (item) => item.id == selectedArticleId
  );
  const [articleIsRead, setArticleIsRead] = useState(false);

  useEffect(() => {
    const checkRead = async () => {
      if (article)
        setArticleIsRead(await ArticleUtils.isArticleRead(article.id));
    };
    void checkRead();
  }, [article]);

  // Permet de forcer le composant ExpoFastImage à être actualisé
  const [showImage, setShowImage] = useState(false);
  useEffect(() => {
    let mounted = true;
    setShowImage(false);
    setTimeout(() => {
      if (mounted) setShowImage(Boolean(article?.visuel?.id));
    }, 100);
    return () => {
      mounted = false;
    };
  }, [article]);

  const onItemPressed = useCallback(() => {
    if (isFromSearchScreen && setStepAndArticleId && article)
      setStepAndArticleId(article.id, step);
    else {
      void RootNavigation.navigate("articleSwipe", {
        articles: articles,
        id: article?.id,
        step: step,
      });
    }
  }, [isFromSearchScreen, setStepAndArticleId, article, step, articles]);

  return (
    <>
      {article && (
        <ListItem
          bottomDivider
          onPress={onItemPressed}
          pad={0}
          containerStyle={[styles.listItemContainer, styles.borderLeftRadius]}
          style={[styles.listItem, styles.borderLeftRadius]}
          accessibilityHint={Labels.accessibility.tapForMoreInfo}
          accessibilityLabel={`${Labels.accessibility.articleCard.title} : ${article.titre}. ${Labels.accessibility.articleCard.description} : ${article.resume}`}
        >
          {showImage ? (
            <ExpoFastImage
              uri={getVisuelFormat(article.visuel, VisuelFormat.thumbnail)}
              cacheKey={article.visuel?.id}
              style={[
                styles.articleImage,
                styles.borderLeftRadius,
                articleIsRead && styles.readArticleImage,
              ]}
            />
          ) : (
            <Image
              source={DefaultImage}
              containerStyle={[
                styles.articleImage,
                styles.borderLeftRadius,
                articleIsRead && styles.readArticleImage,
              ]}
            />
          )}
          <ListItem.Content style={styles.articleContent}>
            <ListItem.Title style={styles.articleTitleContainer}>
              <CommonText style={styles.articleTitle}>
                {article.titre}
              </CommonText>
            </ListItem.Title>
            <ListItem.Subtitle style={styles.articleDescription}>
              <SecondaryText
                style={styles.articleDescriptionFont}
                numberOfLines={3}
                allowFontScaling={true}
              >
                {article.resume}
              </SecondaryText>
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  articleContent: {
    justifyContent: "center",
    padding: Paddings.default,
  },
  articleDescription: {
    color: Colors.commonText,
  },
  articleDescriptionFont: {
    color: Colors.commonText,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.medium,
    lineHeight: Sizes.lg,
  },
  articleImage: {
    height: "100%",
    resizeMode: "cover",
    width: Sizes.thumbnail,
  },
  articleTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.bold,
  },
  articleTitleContainer: {
    paddingBottom: Paddings.light,
  },
  borderLeftRadius: {
    borderBottomLeftRadius: Sizes.xxxxxs,
    borderTopLeftRadius: Sizes.xxxxxs,
  },
  listItem: {
    marginVertical: Margins.smallest,
  },
  listItemContainer: {
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    padding: 0,
  },
  readArticleImage: {
    backgroundColor: Colors.primaryBlue,
    opacity: 0.5,
  },
});

export default ArticleCard;
