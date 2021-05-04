import { PixelRatio } from "react-native";

import { PlatformConstants } from "../constants";

export const scaleNormalize = (size: number): number => {
  if (size === 0) {
    return 0;
  }
  const newSize = size * PlatformConstants.SCREEN_SCALE;
  const result = PlatformConstants.PLATFORM_IS_IOS
    ? Math.round(PixelRatio.roundToNearestPixel(newSize))
    : Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;

  if (result < 1) {
    return 1;
  }
  return result;
};
