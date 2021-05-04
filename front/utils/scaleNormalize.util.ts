import { Dimensions, PixelRatio, Platform } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Based on iPhone 6's scale : 375 x 667
const scale = SCREEN_WIDTH / 375;

export function scaleNormalize(size: number): number {
  if (size === 0) {
    return 0;
  }
  const newSize = size * scale;
  let result = 0;
  if (Platform.OS === "ios") {
    result = Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    result = Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
  if (result < 1) {
    return 1;
  }
  return result;
}
