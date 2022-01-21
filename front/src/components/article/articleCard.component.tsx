import ExpoFastImage from "expo-fast-image";
import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Image, ListItem } from "react-native-elements";

import type { Article, Step } from "../../types";
import DefaultImage from "../../assets/images/default.png";
import {
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../constants";
import * as RootNavigation from "../../utils/rootNavigation.util";
import { getVisuelFormat, VisuelFormat } from "../../utils/visuel.util";
import { CommonText, SecondaryText } from "../StyledText";

interface Props {
  article: Article;
  step?: Step;
  isFromSearchScreen?: boolean;
  setStepAndArticleId?: (articleId: number, step: Step | undefined) => void;
}

const ArticleCard: FC<Props> = ({
  article,
  step,
  isFromSearchScreen,
  setStepAndArticleId,
}) => {
  // Permet de forcer le composant ExpoFastImage à être actualisé
  const [showImage, setShowImage] = React.useState(false);
  React.useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      if (mounted) setShowImage(Boolean(article.visuel?.id));
    }, 100);
    return () => {
      mounted = false;
    };
  }, [article]);

  return (
    <ListItem
      bottomDivider
      onPress={() => {
        if (isFromSearchScreen && setStepAndArticleId)
          setStepAndArticleId(article.id, step);
        else {
          RootNavigation.navigate("article", {
            id: article.id,
            step: step,
          });
        }
      }}
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
          style={[styles.articleImage, styles.borderLeftRadius]}
        />
      ) : (
        <Image
          source={DefaultImage}
          containerStyle={[styles.articleImage, styles.borderLeftRadius]}
        />
      )}
      <ListItem.Content style={styles.articleContent}>
        <ListItem.Title style={styles.articleTitleContainer}>
          <CommonText style={styles.articleTitle}>{article.titre}</CommonText>
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
});

export default ArticleCard;
