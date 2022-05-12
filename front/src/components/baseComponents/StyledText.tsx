import type { FC } from "react";
import * as React from "react";
import type { Text as DefaultText } from "react-native";

import { FontNames, getFontFromWeight } from "../../styles";
import type { TextProps } from "./Themed";
import { Text } from "./Themed";

export const CommonText = React.forwardRef<DefaultText, TextProps>(
  (props: TextProps, ref) => {
    return (
      <Text
        ref={ref}
        {...props}
        style={[
          // eslint-disable-next-line react/prop-types
          props.style,
          // eslint-disable-next-line react/prop-types
          getFontFromWeight(FontNames.comfortaa, props.style),
        ]}
      />
    );
  }
);
CommonText.displayName = "CommonText";

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
