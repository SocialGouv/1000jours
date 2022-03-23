import * as React from "react";
import { StyleSheet } from "react-native";

import { Paddings } from "../../styles";
import type { TextProps } from "../baseComponents";
import { SecondaryText } from "../baseComponents";

const P: React.FC<TextProps> = (props) => (
  <SecondaryText {...props} style={[styles.p, props.style]} />
);

const styles = StyleSheet.create({
  p: {
    paddingVertical: Paddings.light,
  },
});

export default P;
