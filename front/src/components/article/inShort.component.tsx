import _ from "lodash";
import type { FC } from "react";
import * as React from "react";
import { ImageBackground, StyleSheet, Text } from "react-native";
import { ListItem } from "react-native-elements";

import BgImage from "../../assets/images/bg-icon-in-short.png";
import { Labels } from "../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type { ArticleInShortItem } from "../../types";
import {
  CommonText,
  Icomoon,
  IcomoonIcons,
  SecondaryText,
  View,
} from "../baseComponents";

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
        name={IcomoonIcons.entourage}
        size={iconSize}
        color={Colors.secondaryGreen}
      />
    ),
  };

  return _.filter(inShortArray, "text").length > 0 ? (
    <View style={styles.inShortContainer}>
      <View style={[styles.cardTitleContainer, styles.positionRelative]}>
        <CommonText style={[styles.inShortTitle]} accessibilityRole="header">
          {Labels.article.inShortTitle}
        </CommonText>
        <Text
          style={[styles.cardBackgroundSymbol, styles.inShortBackgroundSymbol]}
          importantForAccessibility="no"
          accessible={false}
        >
          !
        </Text>
      </View>

      <View style={styles.inShortListItemsContainer}>
        {_.filter(inShortArray, "text").map((item, index) => (
          <ListItem key={index} containerStyle={[styles.listItemContainer]}>
            <ImageBackground
              source={BgImage}
              imageStyle={styles.imageBackground}
              style={styles.listItemIcon}
            >
              <View
                importantForAccessibility="no-hide-descendants"
                accessible={false}
                accessibilityElementsHidden={true}
              >
                {inShortIcons[item.icon]}
              </View>
            </ImageBackground>
            <ListItem.Content>
              <ListItem.Title>
                <SecondaryText style={[styles.listItemTitle]}>
                  {item.text}
                </SecondaryText>
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
    fontSize: Sizes.xxxxl,
    paddingLeft: Paddings.default,
    position: "absolute",
    zIndex: -1,
  },
  cardTitleContainer: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    minHeight: Sizes.xxxl,
    paddingLeft: Paddings.default,
  },
  colorPrimaryBlueDark: {
    color: Colors.primaryBlueDark,
  },
  imageBackground: {
    marginBottom: Margins.smaller,
    marginStart: Margins.smallest,
    resizeMode: "contain",
  },
  inShortBackgroundSymbol: {
    color: Colors.secondaryGreenLight,
  },
  inShortContainer: {
    backgroundColor: Colors.cardWhite,
    borderBottomColor: Colors.borderGrey,
    borderLeftColor: Colors.secondaryGreen,
    borderLeftWidth: 4,
    borderRightColor: Colors.borderGrey,
    borderTopColor: Colors.borderGrey,
    borderWidth: 1,
    marginVertical: Margins.light,
    paddingVertical: Paddings.smallest,
  },
  inShortListItemsContainer: {
    backgroundColor: "transparent",
  },
  inShortTitle: {
    color: Colors.secondaryGreen,
    fontSize: Sizes.md,
    fontWeight: FontWeight.bold,
    marginVertical: "auto",
  },
  listItemContainer: {
    backgroundColor: "transparent",
    padding: Paddings.light,
  },
  listItemIcon: {
    alignItems: "center",
    backgroundColor: "transparent",
    height: iconSize + Paddings.default,
    justifyContent: "center",
    paddingTop: Margins.light,
    width: iconSize + Paddings.light,
  },
  listItemTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.medium,
  },
  positionRelative: {
    position: "relative",
  },
});

export default InShort;
