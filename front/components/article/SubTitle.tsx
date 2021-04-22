import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import { SecondaryText } from "../StyledText";

interface Props {
  title: string;
}

const SubTitle: FC<Props> = ({ title }) => (
  <SecondaryText style={styles.title}>{title}</SecondaryText>
);

const styles = StyleSheet.create({
  title: {
    color: Colors.primaryBlue,
    fontSize: 12,
    fontWeight: "normal",
    marginTop: 20,
  },
});

export default SubTitle;
