import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import { FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type { Tag } from "../../types";
import { SecondaryText } from "./StyledText";
import { View } from "./Themed";

interface Props {
  tags: Tag[];
}

const Tags: FC<Props> = ({ tags }) => {
  return (
    <View style={[styles.flexStart, styles.mainContainer]}>
      {tags.map((tag, index) => {
        return (
          <View
            style={[styles.tagContainer, { backgroundColor: tag.bgColor }]}
            key={index}
          >
            <SecondaryText style={[styles.tag, { color: tag.color }]}>
              {tag.name}
            </SecondaryText>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  flexStart: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  mainContainer: {
    backgroundColor: "transparent",
  },
  tag: {
    fontSize: Sizes.xs,
    fontWeight: FontWeight.bold,
  },
  tagContainer: {
    borderRadius: Sizes.xxxxxs,
    marginBottom: Margins.smallest,
    marginRight: Margins.smaller,
    paddingHorizontal: Paddings.smaller,
    paddingVertical: Paddings.smallest,
  },
});

export default Tags;
