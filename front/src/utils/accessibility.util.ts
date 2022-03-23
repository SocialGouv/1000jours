import type { RefObject } from "react";
import type { Text } from "react-native";
import { AccessibilityInfo, findNodeHandle } from "react-native";

export const screenReaderIsEnabled = async (): Promise<boolean> => {
  return AccessibilityInfo.isScreenReaderEnabled();
};

export const setAccessibilityFocusOnText = (
  elementRef: RefObject<Text>
): void => {
  if (!elementRef.current) return;
  const reactTag = findNodeHandle(elementRef.current);

  if (!reactTag) return;
  AccessibilityInfo.setAccessibilityFocus(reactTag);
};
