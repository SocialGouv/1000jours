import type { Theme } from "@react-navigation/native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import type { ColorSchemeName } from "react-native";

export const getAppTheme = (colorScheme: ColorSchemeName): Theme => {
  return colorScheme === "dark" ? DarkTheme : DefaultTheme;
};
