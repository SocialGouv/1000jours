import { filter } from "lodash";
import type { FC } from "react";
import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { ListItem } from "react-native-elements";

import Colors from "../../constants/Colors";
import Labels from "../../constants/Labels";
import type { ArticleInShortItem } from "../../types";
import Icomoon, { IcomoonIcons } from "../Icomoon";
import { CommonText } from "../StyledText";
import { View } from "../Themed";

export const inShortIconNames = {
  baby: "bebe",
  babyBottle: "alimentation",
  parents: "parent",
};

interface Props {
  inShortArray: ArticleInShortItem[];
}

const iconSize = 30;
const InShort: FC<Props> = ({ inShortArray }) => {
  const inShortIcons = {
    [inShortIconNames.baby]: (
      <Icomoon
        name={IcomoonIcons.bebe}
        size={iconSize}
        color={Colors.secondaryGreen}
      />
    ),
    [inShortIconNames.parents]: (
      <Icomoon
        name={IcomoonIcons.parents}
        size={iconSize}
        color={Colors.secondaryGreen}
      />
    ),
    [inShortIconNames.babyBottle]: (
      <Icomoon
        name={IcomoonIcons.biberon}
        size={iconSize}
        color={Colors.secondaryGreen}
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
            <View style={styles.listItemIcon}>{inShortIcons[item.icon]}</View>
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
    fontSize: 45,
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
  inShortBackgroundSymbol: {
    color: Colors.secondaryGreenLight,
  },
  inShortContainer: {
    backgroundColor: Colors.cardGrey,
    borderLeftColor: Colors.secondaryGreen,
    borderLeftWidth: 4,
    paddingVertical: 4,
  },
  inShortListItemsContainer: {
    backgroundColor: "transparent",
  },
  inShortTitle: {
    color: Colors.secondaryGreen,
    fontSize: 12,
    marginVertical: "auto",
  },
  listItemContainer: {
    alignItems: "flex-start",
    backgroundColor: "transparent",
    padding: 10,
  },
  listItemIcon: {
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "center",
    width: iconSize + 10,
  },
  listItemTitle: {
    color: Colors.primaryBlueDark,
    fontSize: 12,
  },
  positionRelative: {
    position: "relative",
  },
});

export default InShort;
