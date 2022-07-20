import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";

import { Labels } from "../../constants";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
  Paddings,
  Sizes,
} from "../../styles";
import { ArticleUtils, FavoritesUtils } from "../../utils";
import CustomButton from "./customButton.component";
import Icomoon, { IcomoonIcons } from "./icomoon.component";

interface Props {
  buttonStyle?: StyleProp<ViewStyle>;
  articleId: number;
}

const FavoriteButton: React.FC<Props> = ({ buttonStyle, articleId }) => {
  const [isArticleFavorite, setIsArticleFavorite] = useState(false);

  useEffect(() => {
    const checkFavorites = async () => {
      setIsArticleFavorite(await ArticleUtils.isArticleInFavorites(articleId));
    };
    void checkFavorites();
  }, [articleId]);

  const addOrDeleteFromFavorites = useCallback(async () => {
    const shouldAddFavorite = !isArticleFavorite;
    await FavoritesUtils.handleOnFavorite(shouldAddFavorite, articleId);
    setIsArticleFavorite(!isArticleFavorite);
  }, [articleId, isArticleFavorite]);

  return (
    <>
      <CustomButton
        title={
          isArticleFavorite
            ? Labels.article.favorite.deleteFromFavorites
            : Labels.article.favorite.addToFavorites
        }
        icon={
          <Icomoon
            name={
              isArticleFavorite
                ? IcomoonIcons.favorisChecked
                : IcomoonIcons.favoris
            }
            size={Sizes.md}
            color={Colors.primaryBlue}
          />
        }
        rounded={true}
        disabled={false}
        action={addOrDeleteFromFavorites}
        titleStyle={styles.buttonTitleStyle}
        buttonStyle={[styles.defaultButtonStyle, buttonStyle]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonTitleStyle: {
    color: Colors.primaryBlue,
    fontFamily: getFontFamilyName(FontNames.comfortaa, FontWeight.bold),
    fontSize: Sizes.xs,
    textAlign: "left",
  },
  defaultButtonStyle: {
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    marginBottom: Margins.default,
    paddingBottom: Paddings.smaller,
  },
});

export default FavoriteButton;
