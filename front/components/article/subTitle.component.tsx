import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import { Margins, Sizes } from "../../constants";
import Colors from "../../constants/Colors";
import { FontWeight } from "../../constants/Layout";
import { CommonText } from "../StyledText";

interface Props {
  title: string;
}

const SubTitle: FC<Props> = ({ title }) =>
  title.length ? <CommonText style={styles.title}>{title}</CommonText> : null;

const styles = StyleSheet.create({
  title: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.bold,
    marginTop: Margins.default,
  },
});

export default SubTitle;
