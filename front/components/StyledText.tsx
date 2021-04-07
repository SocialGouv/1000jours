import type { FC } from "react";
import * as React from "react";
import type { StyleProp, TextStyle } from "react-native";
import { StyleSheet } from "react-native";

import { FontWeight } from "../constants/Layout";
import type { TextProps } from "./Themed";
import { Text } from "./Themed";

const fontsMap = {
  "100": "comfortaa-light",
  "200": "comfortaa-light",
  "300": "comfortaa-light",
  "400": "comfortaa-regular",
  "500": "comfortaa-medium",
  "600": "comfortaa-semibold",
  "700": "comfortaa-bold",
  "800": "comfortaa-bold",
  "900": "comfortaa-bold",
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
