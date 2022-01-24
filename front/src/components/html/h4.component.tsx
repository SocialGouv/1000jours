import * as React from "react";
import { StyleSheet } from "react-native";

import { Labels } from "../../constants";
import { FontWeight, Paddings, Sizes } from "../../styles";
import { SecondaryText } from "../StyledText";
import type { TextProps } from "../Themed";

const H4: React.FC<TextProps> = (props) => (
  <SecondaryText
    {...props}
    style={[styles.h4, props.style]}
    accessibilityHint={Labels.accessibility.subtitle}
  />
);

const styles = StyleSheet.create({
  h4: {
    fontSize: Sizes.md,
    fontWeight: FontWeight.bold,
    paddingVertical: Paddings.light,
  },
});

export default H4;
