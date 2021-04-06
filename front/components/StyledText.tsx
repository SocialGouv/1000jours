import type { FC } from "react";
import * as React from "react";
import type { StyleProp, TextStyle } from "react-native";
import { StyleSheet } from "react-native";

import type { TextProps } from "./Themed";
import { Text } from "./Themed";

export const MonoText: FC<TextProps> = (props) => {
  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
};

const getFontFromWeight = (style: StyleProp<TextStyle>) => {
  const fontWeight = style ? StyleSheet.flatten(style).fontWeight : "normal";

  if (fontWeight === "300") return { fontFamily: "comfortaa-light" };
  if (fontWeight === "500") return { fontFamily: "comfortaa-medium" };
  if (fontWeight === "600") return { fontFamily: "comfortaa-semibold" };
  if (fontWeight === "bold" || fontWeight === "700")
    return { fontFamily: "comfortaa-bold" };
  return { fontFamily: "comfortaa-regular" };
};
export const ComfortaText: FC<TextProps> = (props) => {
  return (
    <Text {...props} style={[props.style, getFontFromWeight(props.style)]} />
  );
};
