import { filter } from "lodash";
import type { FC } from "react";
import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { ListItem } from "react-native-elements";

import Colors from "../../constants/Colors";
import Labels from "../../constants/Labels";
import type { ArticleInShortItem } from "../../types";
import Icomoon, { IcomoonIcons } from "../Icomoon";
import { CommonText, fontsMap } from "../StyledText";
import { View } from "../Themed";

export const inShortIconNames = {
  baby: "bebe",
  babyBottle: "alimentation",
  parents: "parent",
};

interface Props {
  inShortArray: ArticleInShortItem[];
}

const InShort: FC<Props> = ({ inShortArray }) => {
  const iconSize = 40;
  const inShortIcons = {
    [inShortIconNames.baby]: (
      <Icomoon
        name={IcomoonIcons.bebe}
        size={iconSize}
        color={Colors.primaryBlue}
      />
    ),
    [inShortIconNames.parents]: (
      <Icomoon
        name={IcomoonIcons.parents}
        size={iconSize}
        color={Colors.primaryBlue}
      />
    ),
    [inShortIconNames.babyBottle]: (
      <Icomoon
        name={IcomoonIcons.biberon}
        size={iconSize}
        color={Colors.primaryBlue}
      />
    ),
  };

  return filter(inShortArray, "text").length > 0 ? (
    <View style={styles.inShortContainer}>
      <View style={[styles.cardTitleContainer, styles.positionRelative]}>
        <CommonText style={[styles.inShortTitle]}>
          {Labels.article.inShortTitle}
        </CommonText>
        <Text
          style={[styles.cardBackgroundSymbol, styles.inShortBackgroundSymbol]}
        >
          !
        </Text>
      </View>

      <View style={styles.inShortListItemsContainer}>
        {filter(inShortArray, "text").map((item, index) => (
          <ListItem key={index} containerStyle={[styles.listItemContainer]}>
            {inShortIcons[item.icon]}
            <ListItem.Content>
              <ListItem.Title>
                <CommonText style={[styles.listItemTitle]}>
                  {item.text}
                </CommonText>
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  cardBackgroundSymbol: {
    fontSize: 50,
    fontWeight: "bold",
    paddingLeft: 18,
    position: "absolute",
    zIndex: -1,
  },
  cardTitleContainer: {
    backgroundColor: "transparent",
    flex: 1,
    height: 35,
    justifyContent: "center",
    paddingLeft: 18,
  },
  colorPrimaryBlueDark: {
    color: Colors.primaryBlueDark,
  },
  htmlContainer: {
    color: Colors.commonText,
    fontFamily: fontsMap.normal,
    fontSize: 14,
  },
  inShortBackgroundSymbol: {
    color: Colors.secondaryGreenLight,
  },
  inShortContainer: {
    backgroundColor: Colors.cardGrey,
    borderLeftColor: Colors.secondaryGreen,
    borderLeftWidth: 4,
    paddingVertical: 12,
  },
  inShortListItemsContainer: {
    backgroundColor: "transparent",
  },
  inShortTitle: {
    color: Colors.secondaryGreen,
    fontSize: 16,
    marginVertical: "auto",
  },
  listItemContainer: {
    backgroundColor: "transparent",
  },
  listItemTitle: {
    color: Colors.primaryBlueDark,
    fontSize: 14,
  },
  positionRelative: {
    position: "relative",
  },
});

export default InShort;
