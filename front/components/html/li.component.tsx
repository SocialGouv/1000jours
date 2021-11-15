import * as React from "react";
import { StyleSheet } from "react-native";

import { Paddings } from "../../constants";
import SpecialChars from "../../constants/specialChars";
import { SecondaryText } from "..";
import type { TextProps } from "../Themed";

const Li: React.FC<TextProps> = (props) => {
  const newProps = {
    ...props,
    children: `${SpecialChars.bullet} ${props.children}`,
  };
  return <SecondaryText {...newProps} style={[styles.li, props.style]} />;
};

const styles = StyleSheet.create({
  li: {
    paddingVertical: Paddings.smallest,
  },
});

export default Li;
