declare module "*.svg" {
  import type { FC } from "react";
  import type { SvgProps } from "react-native-svg";

  const content: FC<SvgProps>;
  export default content;
}

declare module "*.ttf" {
  import type { FontSource } from "expo-font";

  const content: FontSource;
  export default content;
}
