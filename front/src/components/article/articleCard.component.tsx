import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { AccessibilityInfo, StyleSheet } from "react-native";
import { Image, ListItem } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import DefaultImage from "../../assets/images/default.png";
import { Labels } from "../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type { Article, Step } from "../../types";
import {
  ArticleUtils,
  FavoritesUtils,
  getVisuelFormat,
  RootNavigation,
  VisuelFormat,
} from "../../utils";
import { FavoritesAssets } from "../assets";
import { CommonText, SecondaryText, View } from "../baseComponents";

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
  const [isArticleFavorite, setIsArticleFavorite] = useState(false);

  const checkReadAndFavorites = useCallback(async () => {
    if (article) {
      setArticleIsRead(await ArticleUtils.isArticleRead(article.id));
      setIsArticleFavorite(await ArticleUtils.isArticleInFavorites(article.id));
    }
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

  useEffect(() => {
    void checkReadAndFavorites();
  }, [checkReadAndFavorites]);

  const updateView = useCallback(() => {
    void checkReadAndFavorites();
  }, [checkReadAndFavorites]);

  const onItemPressed = useCallback(async () => {
    if (isFromSearchScreen && setStepAndArticleId && article)
      setStepAndArticleId(article.id, step);
    else {
      const isScreenReaderEnabled =
        await AccessibilityInfo.isScreenReaderEnabled();
      void RootNavigation.navigate(
        !isScreenReaderEnabled && articles.length > 1
          ? "articleSwipe"
          : "article",
        {
          articles: articles,
          id: article?.id,
          onBackButtonPressed: () => {
            updateView();
          },
          step: step,
        },
        true
      );
    }
  }, [
    isFromSearchScreen,
    setStepAndArticleId,
    article,
    step,
    articles,
    updateView,
  ]);

  const imageStyle = [
    styles.articleImage,
    styles.borderLeftRadius,
    articleIsRead && styles.readArticleImage,
  ];

  const onFavoriteButtonClick = useCallback(async () => {
    if (article) {
      const shouldAddFavorite = !isArticleFavorite;
      await FavoritesUtils.handleOnFavorite(shouldAddFavorite, article.id);
      setIsArticleFavorite(shouldAddFavorite);
    }
  }, [article, isArticleFavorite]);

  return (
    <>
      {article && (
        <>
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
              <Image
                containerStyle={imageStyle}
                source={{
                  uri: getVisuelFormat(article.visuel, VisuelFormat.thumbnail),
                }}
              />
            ) : (
              <Image source={DefaultImage} containerStyle={imageStyle} />
            )}
            {articleIsRead && (
              <View style={styles.articleIsReadView}>
                <SecondaryText style={styles.articleIsReadText}>
                  {Labels.article.readArticle}
                </SecondaryText>
              </View>
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
          <View style={styles.favoriteView}>
            <TouchableWithoutFeedback onPress={onFavoriteButtonClick}>
              {FavoritesAssets.getFavoriteIcon(isArticleFavorite, Sizes.xl)}
            </TouchableWithoutFeedback>
          </View>
        </>
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
  articleIsReadText: {
    color: Colors.secondaryGreenDark,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.bold,
    padding: Paddings.smallest,
  },
  articleIsReadView: {
    borderRadius: Sizes.xxxxxs,
    left: Paddings.light,
    position: "absolute",
    top: Paddings.light,
  },
  articleTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.bold,
  },
  articleTitleContainer: {
    maxWidth: "90%",
    paddingBottom: Paddings.light,
  },
  borderLeftRadius: {
    borderBottomLeftRadius: Sizes.xxxxxs,
    borderTopLeftRadius: Sizes.xxxxxs,
  },
  favoriteView: {
    backgroundColor: "transparent",
    padding: Paddings.smallest,
    position: "absolute",
    right: Paddings.light,
    top: Paddings.light,
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
    backgroundColor: Colors.primaryBlueDark,
    opacity: 0.5,
  },
});

export default ArticleCard;
