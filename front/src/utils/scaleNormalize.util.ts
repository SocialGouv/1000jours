import { PixelRatio } from "react-native";

import { PLATFORM_IS_IOS, SCREEN_SCALE } from "../constants/platform.constants";

export const MAX_FONT_SCALE = 1.3;

export const scaleNormalize = (size: number): number => {
  if (size === 0) {
    return 0;
  }
  const newSize = size * SCREEN_SCALE;
  const result = PLATFORM_IS_IOS
    ? Math.round(PixelRatio.roundToNearestPixel(newSize))
    : Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;

  if (result < 1) {
    return 1;
  }
  return result;
};

export const getFontScale = (): number => {
  return PixelRatio.getFontScale();
};
