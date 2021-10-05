import ExpoFastImage from "expo-fast-image";
import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../constants";
import type { Article, Step } from "../../types";
import * as RootNavigation from "../../utils/rootNavigation.util";
import { getVisuelFormat, VisuelFormat } from "../../utils/visuel.util";
import { CommonText, SecondaryText } from "../StyledText";

interface Props {
  article: Article;
  step?: Step;
}

const ArticleCard: FC<Props> = ({ article, step }) => {
  return (
    <ListItem
      bottomDivider
      onPress={() => {
        RootNavigation.navigate("article", {
          id: article.id,
          step: step,
        });
      }}
      pad={0}
      containerStyle={[styles.listItemContainer, styles.borderLeftRadius]}
      style={[styles.listItem, styles.borderLeftRadius]}
    >
      <ExpoFastImage
        uri={getVisuelFormat(article.visuel, VisuelFormat.thumbnail)}
        cacheKey={article.visuel?.hash}
        style={[styles.articleImage, styles.borderLeftRadius]}
      />
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
    fontSize: Sizes.md,
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
