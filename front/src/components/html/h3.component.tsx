import * as React from "react";
import { StyleSheet } from "react-native";

import { Labels } from "../../constants";
import { FontWeight, Paddings, Sizes } from "../../styles";
import type { TextProps } from "../baseComponents";
import { SecondaryText } from "../baseComponents";

const H3: React.FC<TextProps> = (props) => (
  <SecondaryText
    {...props}
    style={[styles.h3, props.style]}
    accessibilityHint={`${props.children}. ${Labels.accessibility.subSubtitle}`}
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
