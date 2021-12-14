import * as React from "react";
import { StyleSheet } from "react-native";

import { FontWeight, Labels, Paddings, Sizes } from "../../constants";
import { SecondaryText } from "../StyledText";
import type { TextProps } from "../Themed";

const H2: React.FC<TextProps> = (props) => (
  <SecondaryText
    {...props}
    style={[styles.h2, props.style]}
    accessibilityHint={Labels.accessibility.title}
  />
);

const styles = StyleSheet.create({
  h2: {
    fontSize: Sizes.lg,
    fontWeight: FontWeight.bold,
    paddingVertical: Paddings.light,
  },
});

export default H2;
