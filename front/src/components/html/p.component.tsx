import * as React from "react";
import { StyleSheet } from "react-native";

import { Paddings } from "../../styles";
import { SecondaryText } from "../StyledText";
import type { TextProps } from "../Themed";

const P: React.FC<TextProps> = (props) => (
  <SecondaryText {...props} style={[styles.p, props.style]} />
);

const styles = StyleSheet.create({
  p: {
    paddingVertical: Paddings.light,
  },
});

export default P;
