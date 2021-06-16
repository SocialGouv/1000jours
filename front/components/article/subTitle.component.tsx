import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import { FontWeight } from "../../constants/Layout";
import { CommonText } from "../StyledText";

interface Props {
  title: string;
}

const SubTitle: FC<Props> = ({ title }) => (
  <CommonText style={styles.title}>{title}</CommonText>
);

const styles = StyleSheet.create({
  title: {
    color: Colors.primaryBlue,
    fontSize: 14,
    fontWeight: FontWeight.bold,
    marginTop: 15,
  },
});

export default SubTitle;
