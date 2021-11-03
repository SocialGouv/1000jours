import { AccessibilityInfo } from "react-native";

export const screenReaderIsEnabled = async (): Promise<boolean> => {
  return AccessibilityInfo.isScreenReaderEnabled();
};
