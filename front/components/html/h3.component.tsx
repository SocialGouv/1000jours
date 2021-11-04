import * as React from "react";
import { StyleSheet } from "react-native";

import { FontWeight, Labels, Paddings, Sizes } from "../../constants";
import { SecondaryText } from "..";
import type { TextProps } from "../Themed";

const H3: React.FC<TextProps> = (props) => (
  <SecondaryText
    {...props}
    style={[styles.h3, props.style]}
    accessibilityHint={Labels.accessibility.subtitle}
  />
);

const styles = StyleSheet.create({
  h3: {
    fontSize: Sizes.mmd,
    fontWeight: FontWeight.bold,
    paddingVertical: Paddings.light,
  },
});

export default H3;
