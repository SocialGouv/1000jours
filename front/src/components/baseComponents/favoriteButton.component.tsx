import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import type { AlertButton, StyleProp, ViewStyle } from "react-native";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";

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
import type { TrackerEvent } from "../../type";
import { ArticleUtils, FavoritesUtils } from "../../utils";
import { FavoritesAssets } from "../assets";
import TrackerHandler from "../tracker/trackerHandler.component";
import CustomButton from "./customButton.component";

interface Props {
  buttonStyle?: StyleProp<ViewStyle>;
  articleId: number;
  isDisplayedWithTitle: boolean;
  onUpdate?: () => void;
}

const FavoriteButton: React.FC<Props> = ({
  buttonStyle,
  articleId,
  isDisplayedWithTitle,
  onUpdate,
}) => {
  const [isArticleFavorite, setIsArticleFavorite] = useState(false);
  const [accessibilityLabel, setAccessibilityLabel] = useState(
    Labels.accessibility.favorites.add
  );
  const [trackerEventObject, setTrackerEventObject] = useState<TrackerEvent>();

  useEffect(() => {
    const checkFavorites = async () => {
      setIsArticleFavorite(await ArticleUtils.isArticleInFavorites(articleId));
    };
    void checkFavorites();
  }, [articleId]);

  useEffect(() => {
    setAccessibilityLabel(
      isArticleFavorite
        ? Labels.accessibility.favorites.remove
        : Labels.accessibility.favorites.add
    );
  }, [isArticleFavorite]);

  const handleOnFavorite = useCallback(
    async (shouldAddFavorite: boolean) => {
      await FavoritesUtils.handleOnFavorite(shouldAddFavorite, articleId);
      setIsArticleFavorite(shouldAddFavorite);
      if (onUpdate) onUpdate();
    },
    [articleId, onUpdate]
  );

  const confirmDeleteFavorite = useCallback(() => {
    const alertButtons: AlertButton[] = [
      { text: Labels.buttons.no },
      {
        onPress: async () => {
          await handleOnFavorite(false);
        },
        text: Labels.buttons.yes,
      },
    ];
    Alert.alert(
      Labels.warning,
      Labels.article.favorite.confirmDeleteMessage,
      alertButtons
    );
  }, [handleOnFavorite]);

  const addOrDeleteFromFavorites = useCallback(async () => {
    const shouldAddFavorite = !isArticleFavorite;
    if (shouldAddFavorite) {
      await handleOnFavorite(shouldAddFavorite);
      setTrackerEventObject({
        action: "AddToFavorites",
        name: `Article : ${articleId}`,
      });
    } else {
      confirmDeleteFavorite();
    }
  }, [confirmDeleteFavorite, handleOnFavorite, isArticleFavorite, articleId]);

  return (
    <>
      <TrackerHandler eventObject={trackerEventObject} />
      {isDisplayedWithTitle ? (
        <CustomButton
          title={
            isArticleFavorite
              ? Labels.article.favorite.deleteFromFavorites
              : Labels.article.favorite.addToFavorites
          }
          icon={FavoritesAssets.getFavoriteIcon(isArticleFavorite, Sizes.md)}
          rounded
          disabled={false}
          action={addOrDeleteFromFavorites}
          titleStyle={styles.buttonTitleStyle}
          buttonStyle={[styles.defaultButtonStyle, buttonStyle]}
          accessibilityLabel={accessibilityLabel}
        />
      ) : (
        <TouchableOpacity
          onPress={addOrDeleteFromFavorites}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="button"
        >
          {FavoritesAssets.getFavoriteIcon(isArticleFavorite, Sizes.xl)}
        </TouchableOpacity>
      )}
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
