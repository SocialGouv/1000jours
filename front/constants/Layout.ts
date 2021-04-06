import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export enum FontWeight {
  light = "300",
  normal = "400",
  medium = "500",
  semibold = "600",
  bold = "700",
}

export default {
  isSmallDevice: width < 375,
  window: {
    height,
    width,
  },
};
