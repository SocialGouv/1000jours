import * as React from "react";
import { StyleSheet } from "react-native";

import { Paddings } from "../../styles";
import type { TextProps } from "../baseComponents";
import { SecondaryText } from "../baseComponents";

const Li: React.FC<TextProps> = (props) => {
  const newProps = {
    ...props,
    children: `${props.children}`,
  };
  return <SecondaryText {...newProps} style={[styles.li, props.style]} />;
};

const styles = StyleSheet.create({
  li: {
    paddingVertical: Paddings.smallest,
  },
});

export default Li;
