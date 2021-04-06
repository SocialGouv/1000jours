import type { FC } from "react";
import * as React from "react";
import type { StyleProp, TextStyle } from "react-native";
import { StyleSheet } from "react-native";

import { FontWeight } from "../constants/Layout";
import type { TextProps } from "./Themed";
import { Text } from "./Themed";

const fontsMap = new Map<string, string>([
  [FontWeight.light, "comfortaa-light"],
  [FontWeight.normal, "comfortaa-regular"],
  [FontWeight.medium, "comfortaa-medium"],
  [FontWeight.semibold, "comfortaa-semibold"],
  [FontWeight.bold, "comfortaa-bold"],
  ["normal", "comfortaa-regular"],
  ["bold", "comfortaa-bold"],
]);

const getFontFromWeight = (style: StyleProp<TextStyle>) => {
  const fontWeight = style ? StyleSheet.flatten(style).fontWeight : "normal";
  return {
    fontFamily: fontWeight ? fontsMap.get(fontWeight) : fontsMap.get("normal"),
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
