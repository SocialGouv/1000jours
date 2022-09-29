import * as React from "react";
import { StyleSheet } from "react-native";

import SpecialChars from "../../constants/specialChars";
import { Colors, Margins, Paddings, Sizes } from "../../styles";
import type { TextProps } from "../baseComponents";
import { SecondaryText, View } from "../baseComponents";

const Li: React.FC<TextProps> = (props) => {
  const newProps = {
    ...props,
    children: `${props.children}`,
  };
  return (
    <View style={styles.content}>
      <SecondaryText style={styles.dot} accessibilityLabel="Puces">
        {SpecialChars.blackLargeCircle}
      </SecondaryText>
      <SecondaryText {...newProps} style={[styles.li, props.style]} />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    display: "flex",
    flexDirection: "row",
  },
  dot: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xxxxs,
    lineHeight: Sizes.lg,
    marginRight: Margins.default,
    textAlignVertical: "top",
  },
  li: {
    paddingVertical: Paddings.smallest,
  },
});

export default Li;
