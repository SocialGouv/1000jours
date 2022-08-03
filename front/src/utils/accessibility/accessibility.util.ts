import type { RefObject } from "react";
import type { Text } from "react-native";
import { AccessibilityInfo, findNodeHandle } from "react-native";

import { SnackBarConstants } from "../../constants";

export const isScreenReaderEnabled = async (): Promise<boolean> => {
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

export const getSnackBarDuration = (isAccessibilityModeOn: boolean): number => {
  return isAccessibilityModeOn
    ? SnackBarConstants.ACCESSIBILITY_SNACKBAR_DURATION
    : SnackBarConstants.SNACKBAR_DURATION;
};
