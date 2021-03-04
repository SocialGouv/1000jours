import type { FC } from "react";
import * as React from "react";
import { Text as DefaultText, View as DefaultView } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export const useThemeColor = (
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.dark & keyof typeof Colors.light
): string => {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
};

interface ThemeProps {
  lightColor?: string;
  darkColor?: string;
}

export type TextProps = DefaultText["props"] & ThemeProps;
export type ViewProps = DefaultView["props"] & ThemeProps;

export const Text: FC<TextProps> = (props) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ dark: darkColor, light: lightColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};

export const View: FC<ViewProps> = (props) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { dark: darkColor, light: lightColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};
