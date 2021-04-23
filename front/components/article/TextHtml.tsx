import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import HTML from "react-native-render-html";

import Colors from "../../constants/Colors";
import { FontWeight } from "../../constants/Layout";
import { FontNames, getFontFamilyName } from "../StyledText";

interface Props {
  html: string;
}

const TextHtml: FC<Props> = ({ html }) => {
  return (
    <HTML
      containerStyle={styles.containerStyle}
      baseFontStyle={styles.baseFontStyle}
      source={{ html }}
      tagsStyles={{ b: styles.bold, strong: styles.bold }}
    />
  );
};

const styles = StyleSheet.create({
  baseFontStyle: {
    color: Colors.commonText,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.medium),
    fontSize: 16,
    lineHeight: 25,
  },
  bold: {
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.bold),
  },
  containerStyle: {
    margin: 0,
    padding: 0,
  },
});

export default TextHtml;
