import type { FC } from "react";
import * as React from "react";
import type { StyleProp, TextStyle } from "react-native";
import { StyleSheet } from "react-native";

import { FontWeight } from "../constants/Layout";
import type { TextProps } from "./Themed";
import { Text } from "./Themed";

const fontsMap = {
  [FontWeight.weight100]: "comfortaa-light",
  [FontWeight.weight200]: "comfortaa-light",
  [FontWeight.light]: "comfortaa-light",
  [FontWeight.normal]: "comfortaa-regular",
  [FontWeight.medium]: "comfortaa-medium",
  [FontWeight.semibold]: "comfortaa-semibold",
  [FontWeight.bold]: "comfortaa-bold",
  [FontWeight.weight800]: "comfortaa-bold",
  [FontWeight.weight900]: "comfortaa-bold",
  bold: "comfortaa-bold",
  normal: "comfortaa-regular",
};

const getFontFromWeight = (style: StyleProp<TextStyle>) => {
  const fontWeight = style
    ? StyleSheet.flatten(style).fontWeight
    : FontWeight.normal;
  return {
    fontFamily: fontWeight ? fontsMap[fontWeight] : fontsMap[FontWeight.normal],
  };
};

export const MonoText: FC<TextProps> = (props) => {
  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
};

export const CommonText: FC<TextProps> = (props) => {
  return (
    <Text {...props} style={[props.style, getFontFromWeight(props.style)]} />
  );
};
