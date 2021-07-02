import { Dimensions, Platform } from "react-native";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

// Based on iPhone 6's scale : 375 x 667
const IPHONE6_WIDTH_SCALE = 375;
export const SCREEN_SCALE = SCREEN_WIDTH / IPHONE6_WIDTH_SCALE;
export const PLATFORM_IS_IOS = Platform.OS === "ios";
export const PLATFORM_IS_ANDROID = Platform.OS === "android";
export const MAJOR_VERSION_IOS = parseInt(Platform.Version.toString(), 10);
