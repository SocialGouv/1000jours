import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import HTML from "react-native-render-html";

import Colors from "../../constants/Colors";

interface Props {
  html: string;
}

const TextHtml: FC<Props> = ({ html }) => {
  return (
    <HTML
      containerStyle={styles.containerStyle}
      baseFontStyle={styles.baseFontStyle}
      source={{ html }}
    />
  );
};

const styles = StyleSheet.create({
  baseFontStyle: {
    color: Colors.commonText,
    fontSize: 12,
    lineHeight: 20,
  },
  containerStyle: {
    margin: 0,
    padding: 0,
  },
});

export default TextHtml;
