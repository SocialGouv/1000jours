import * as React from "react";
import { StyleSheet } from "react-native";

import { Labels } from "../../constants";
import { FontWeight, Paddings, Sizes } from "../../styles";
import type { TextProps } from "../baseComponents";
import { SecondaryText } from "../baseComponents";

const H2: React.FC<TextProps> = (props) => (
  <SecondaryText
    {...props}
    style={[styles.h2, props.style]}
    accessibilityHint={`${props.children}. ${Labels.accessibility.subtitle}`}
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
