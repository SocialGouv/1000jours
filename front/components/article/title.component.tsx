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

const Title: FC<Props> = ({ title }) =>
  title.length ? <CommonText style={[styles.title]}>{title}</CommonText> : null;

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
