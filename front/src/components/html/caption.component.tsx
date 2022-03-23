import * as React from "react";
import { StyleSheet } from "react-native";

import { Paddings, Sizes } from "../../styles";
import type { TextProps } from "../baseComponents";
import { SecondaryTextItalic } from "../baseComponents";

const Caption: React.FC<TextProps> = (props) => (
  <SecondaryTextItalic {...props} style={[styles.caption, props.style]} />
);

const styles = StyleSheet.create({
  caption: {
    fontSize: Sizes.sm,
    paddingVertical: Paddings.smaller,
  },
});

export default Caption;
