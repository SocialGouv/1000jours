import { Dimensions, Platform } from "react-native";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

const MAX_TABLET_RATIO = 1.6;
const IS_TABLET = SCREEN_HEIGHT / SCREEN_WIDTH < MAX_TABLET_RATIO;

// Based on iPhone 6's scale : 375 x 667
const IPHONE6_WIDTH_SCALE = 375;
// Based on iPad : 768 x 1024
const IPAD_AIR_WIDTH_SCALE = 768;

export const SCREEN_SCALE =
  SCREEN_WIDTH / (IS_TABLET ? IPAD_AIR_WIDTH_SCALE : IPHONE6_WIDTH_SCALE);
export const PLATFORM_IS_IOS = Platform.OS === "ios";
export const PLATFORM_IS_ANDROID = Platform.OS === "android";
export const MAJOR_VERSION_IOS = parseInt(String(Platform.Version), 10);
export const ICLOUD = "iCloud";

export const TIMEOUT_ON_DISMISS_MODAL = PLATFORM_IS_IOS ? 200 : 0;
