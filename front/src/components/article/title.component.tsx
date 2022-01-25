import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import { Colors, FontWeight, Margins, Sizes } from "../../styles";
import { CommonText } from "../baseComponents";

interface Props {
  title: string | null;
}

const Title: FC<Props> = ({ title }) =>
  title?.length ? (
    <CommonText style={[styles.title]} accessibilityRole="header">
      {title}
    </CommonText>
  ) : null;

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
