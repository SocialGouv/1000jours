import type { FC } from "react";
import * as React from "react";
import { StyleSheet, Text } from "react-native";

import Colors from "../../constants/Colors";
import Labels from "../../constants/Labels";
import { CommonText } from "../StyledText";
import { View } from "../Themed";

interface Props {
  description: string;
}

const DidYouKnow: FC<Props> = ({ description }) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return description?.length > 0 ? (
    <View style={styles.didYouKnowContainer}>
      <View style={[styles.cardTitleContainer, styles.positionRelative]}>
        <CommonText style={[styles.didYouKnowTitle]}>
          {Labels.article.didYouKnowTitle}
        </CommonText>
        <Text
          style={[
            styles.cardBackgroundSymbol,
            styles.didYouKnowBackgroundSymbol,
          ]}
        >
          ?
        </Text>
      </View>
      <CommonText style={[styles.didYouKnowContent]}>{description}</CommonText>
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
  didYouKnowBackgroundSymbol: {
    color: Colors.primaryYellowLight,
  },
  didYouKnowContainer: {
    backgroundColor: Colors.cardGrey,
    borderLeftColor: Colors.primaryYellow,
    borderLeftWidth: 4,
    paddingVertical: 12,
  },
  didYouKnowContent: {
    color: Colors.primaryBlueDark,
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 18,
    paddingTop: 5,
  },
  didYouKnowTitle: {
    color: Colors.primaryYellow,
    fontSize: 16,
  },
  positionRelative: {
    position: "relative",
  },
});

export default DidYouKnow;
