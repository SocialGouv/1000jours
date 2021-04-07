import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export enum FontWeight {
  weight100 = "100",
  weight200 = "200",
  light = "300",
  normal = "400",
  medium = "500",
  semibold = "600",
  bold = "700",
  weight800 = "800",
  weight900 = "900",
}

export default {
  isSmallDevice: width < 375,
  window: {
    height,
    width,
  },
};
