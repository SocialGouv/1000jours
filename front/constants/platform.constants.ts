import { Dimensions, Platform } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Based on iPhone 6's scale : 375 x 667
const IPHONE6_SCALE = 375;
export const SCREEN_SCALE = SCREEN_WIDTH / IPHONE6_SCALE;
export const PLATFORM_IS_IOS = Platform.OS === "ios";
