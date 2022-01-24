import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export enum FontWeight {
  thin = "100",
  extralight = "200",
  light = "300",
  normal = "400",
  medium = "500",
  semibold = "600",
  bold = "700",
  extrabold = "800",
  black = "900",
}

export enum FontStyle {
  italic = "italic",
  normal = "normal",
}

export default {
  isSmallDevice: width < 375,
  window: {
    height,
    width,
  },
};
