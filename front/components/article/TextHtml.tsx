import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import HTML from "react-native-render-html";

import Colors from "../../constants/Colors";
import { fontsMap } from "../StyledText";

interface Props {
  html: string;
}

const TextHtml: FC<Props> = ({ html }) => {
  return <HTML baseFontStyle={styles.htmlContainer} source={{ html }} />;
};

const styles = StyleSheet.create({
  htmlContainer: {
    color: Colors.commonText,
    fontFamily: fontsMap.normal,
    fontSize: 12,
    lineHeight: 20,
  },
});

export default TextHtml;
