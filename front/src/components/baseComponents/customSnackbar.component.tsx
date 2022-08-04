import * as React from "react";
import { useEffect, useRef, useState } from "react";
import type { Text as DefaultText } from "react-native";
import { AccessibilityInfo, findNodeHandle, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

import { Colors, FontWeight, Margins, Paddings } from "../../styles";
import { AccessibilityUtils } from "../../utils";
import { SecondaryText } from "./StyledText";

interface Props {
  isAccessibilityModeOn: boolean;
  visible: boolean;
  isOnTop?: boolean;
  marginTopValue?: string;
  backgroundColor?: string;
  onDismiss: () => void;
  textColor?: string;
  text: string;
}

const CustomSnackbar: React.FC<Props> = ({
  isAccessibilityModeOn,
  visible,
  isOnTop,
  marginTopValue,
  backgroundColor,
  onDismiss,
  textColor,
  text,
}) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let mounted = true;
    if (!visible) return;
    setAccessibilityFocus();
    setDuration(AccessibilityUtils.getSnackBarDuration(isAccessibilityModeOn));

    setTimeout(() => {
      if (mounted) onDismiss();
    }, duration);

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, duration]);

  const snackbarStyle = {
    backgroundColor: backgroundColor ?? Colors.white,
  };
  const textColorStyle = {
    color: textColor ?? Colors.dark.text,
  };

  const marginTop = { marginTop: marginTopValue };

  const elementRef = useRef<DefaultText>(null);
  const setAccessibilityFocus = () => {
    if (elementRef.current) {
      const reactTag = findNodeHandle(elementRef.current);
      if (reactTag) {
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    }
  };

  return (
    <>
      {visible && (
        <Animatable.View
          animation="fadeIn"
          duration={200}
          style={[
            isOnTop
              ? [styles.snackbarViewTop, marginTop]
              : styles.snackbarViewBottom,
            styles.snackbarView,
            snackbarStyle,
          ]}
        >
          <SecondaryText
            ref={elementRef}
            style={[styles.defaultTextStyle, textColorStyle]}
          >
            {text}
          </SecondaryText>
        </Animatable.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  defaultTextStyle: {
    fontWeight: FontWeight.bold,
    padding: Paddings.default,
  },
  snackbarView: {
    left: 0,
    margin: Margins.smaller,
    position: "absolute",
    right: 0,
  },
  snackbarViewBottom: {
    bottom: 0,
  },
  snackbarViewTop: {
    top: 0,
  },
});

export default CustomSnackbar;
