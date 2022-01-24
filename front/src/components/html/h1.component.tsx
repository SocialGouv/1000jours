import * as React from "react";
import { StyleSheet } from "react-native";

import { FontWeight, Paddings, Sizes } from "../../styles";
import type { TextProps } from "../baseComponents";
import { SecondaryText } from "../baseComponents";

const H1: React.FC<TextProps> = (props) => (
  <SecondaryText
    {...props}
    style={[styles.h1, props.style]}
    accessibilityRole="header"
  />
);

const styles = StyleSheet.create({
  h1: {
    fontSize: Sizes.xxl,
    fontWeight: FontWeight.bold,
    paddingVertical: Paddings.default,
  },
});

export default H1;
