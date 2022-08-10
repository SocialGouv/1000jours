import * as React from "react";
import { StyleSheet } from "react-native";

import { FontWeight, Paddings, Sizes } from "../../styles";
import type { TextProps } from "../baseComponents";
import { SecondaryText } from "../baseComponents";

const H4: React.FC<TextProps> = (props) => (
  <SecondaryText {...props} style={[styles.h4, props.style]} />
);

const styles = StyleSheet.create({
  h4: {
    fontSize: Sizes.md,
    fontWeight: FontWeight.bold,
    paddingVertical: Paddings.light,
  },
});

export default H4;
