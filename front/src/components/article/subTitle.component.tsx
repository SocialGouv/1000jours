import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import { Colors, FontWeight, Margins, Sizes } from "../../styles";
import { CommonText } from "../StyledText";

interface Props {
  title: string | null;
}

const SubTitle: FC<Props> = ({ title }) =>
  title?.length ? (
    <CommonText style={styles.title} accessibilityRole="header">
      {title}
    </CommonText>
  ) : null;

const styles = StyleSheet.create({
  title: {
    color: Colors.primaryBlue,
    fontSize: Sizes.md,
    fontWeight: FontWeight.bold,
    marginTop: Margins.default,
  },
});

export default SubTitle;
