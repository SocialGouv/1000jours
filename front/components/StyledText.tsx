import type { FC } from "react";
import * as React from "react";
import type { StyleProp, TextStyle } from "react-native";
import { StyleSheet } from "react-native";

import { FontWeight } from "../constants/Layout";
import type { TextProps } from "./Themed";
import { Text } from "./Themed";

export enum FontNames {
  comfortaa = "comfortaa",
  spaceMono = "space-mono",
  avenir = "avenir",
}
const fontsMap = {
  [FontWeight.thin]: "light",
  [FontWeight.extralight]: "light",
  [FontWeight.light]: "light",
  [FontWeight.normal]: "regular",
  [FontWeight.medium]: "medium",
  [FontWeight.semibold]: "semibold",
  [FontWeight.bold]: "bold",
  [FontWeight.extrabold]: "bold",
  [FontWeight.black]: "black",
  bold: "bold",
  normal: "regular",
};

export const getFontFamilyName = (
  fontName: string,
  fontWeight:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | "bold"
    | "normal"
): string => {
  return fontName + "-" + fontsMap[fontWeight];
};

const getFontFromWeight = (fontName: string, style?: StyleProp<TextStyle>) => {
  const fontWeight = style
    ? StyleSheet.flatten(style).fontWeight ?? FontWeight.normal
    : FontWeight.normal;
  return {
    fontFamily: getFontFamilyName(fontName, fontWeight),
  };
};

export const MonoText: FC<TextProps> = (props) => {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: FontNames.spaceMono }]}
    />
  );
};

export const CommonText: FC<TextProps> = (props) => {
  return (
    <Text
      {...props}
      style={[props.style, getFontFromWeight(FontNames.comfortaa, props.style)]}
    />
  );
};

export const SecondaryText: FC<TextProps> = (props) => {
  return (
    <Text
      {...props}
      style={[props.style, getFontFromWeight(FontNames.avenir, props.style)]}
    />
  );
};
