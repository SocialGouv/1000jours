import type { FC } from "react";
import * as React from "react";

import { FontNames, getFontFromWeight } from "../constants/Fonts";
import type { TextProps } from "./Themed";
import { Text } from "./Themed";

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

export const SecondaryTextItalic: FC<TextProps> = (props) => {
  return (
    <Text {...props} style={[props.style, { fontFamily: "avenir-italic" }]} />
  );
};
