import React from "react";
import { StyleSheet, View } from "react-native";

import { Labels } from "../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import { SecondaryText, Toggle } from "../baseComponents";

interface Props {
  isToggleOn: boolean;
  onToggleFavorite: () => void;
}

const ArticlesFilterFavoritesRow: React.FC<Props> = ({
  isToggleOn,
  onToggleFavorite,
}) => {
  return (
    <View style={styles.mainContainer}>
      <SecondaryText
        style={{
          color: Colors.primaryBlueDark,
          fontSize: Sizes.xs,
          fontWeight: isToggleOn ? FontWeight.bold : FontWeight.normal,
        }}
      >
        {Labels.articleList.filterByFavorites}
      </SecondaryText>
      <Toggle isToggleOn={isToggleOn} toggleSwitch={onToggleFavorite} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: Margins.default,
    marginEnd: 0,
    padding: Paddings.default,
    paddingTop: 0,
  },
  rowTitleStyle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.xs,
  },
});

export default ArticlesFilterFavoritesRow;
