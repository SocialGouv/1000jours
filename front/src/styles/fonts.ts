import type { StyleProp, TextStyle } from "react-native";
import { StyleSheet } from "react-native";

import { FontWeight } from "./layout";

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

type FontWeightValues =
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
  | "normal";

export const getFontFamilyName = (
  fontName: string,
  fontWeight: FontWeightValues
): string => `${fontName}-${fontsMap[fontWeight]}`;

export const getFontFromWeight = (
  fontName: string,
  style?: StyleProp<TextStyle>
): TextStyle => {
  const fontWeight = style
    ? StyleSheet.flatten(style).fontWeight ?? FontWeight.normal
    : FontWeight.normal;
  return {
    fontFamily: getFontFamilyName(fontName, fontWeight),
    fontWeight: FontWeight.normal,
  };
};
