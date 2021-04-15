import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import { CommonText } from "../StyledText";

interface Props {
  title: string;
}

const SubTitle: FC<Props> = ({ title }) => (
  <CommonText style={[styles.title]}>{title}</CommonText>
);

const styles = StyleSheet.create({
  title: {
    color: Colors.primaryBlue,
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 20,
    textTransform: "uppercase",
  },
});

export default SubTitle;
