import type { FC } from "react";
import * as React from "react";

import type { TextProps } from "./Themed";
import { Text } from "./Themed";

export const MonoText: FC<TextProps> = (props) => {
  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
};
