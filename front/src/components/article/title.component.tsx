import * as React from "react";
import type { Text as DefaultText } from "react-native";
import { StyleSheet } from "react-native";

import { Colors, FontWeight, Margins, Sizes } from "../../styles";
import { CommonText } from "../baseComponents";

interface Props {
  title: string | null;
}

const Title = React.forwardRef<DefaultText, Props>((props: Props, ref) => {
  return props.title?.length ? (
    <CommonText style={[styles.title]} accessibilityRole="header" ref={ref}>
      {props.title}
    </CommonText>
  ) : null;
});
Title.displayName = "Title";

const styles = StyleSheet.create({
  title: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.mmd,
    fontWeight: FontWeight.bold,
    lineHeight: Sizes.xxl,
    marginBottom: Margins.light,
  },
});

export default Title;
