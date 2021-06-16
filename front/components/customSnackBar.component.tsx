import * as React from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
  Paddings,
} from "../constants";
import { CommonText } from ".";

interface Props {
  duration: number;
  visible: boolean;
  isOnTop?: boolean;
  backgroundColor?: string;
  onDismiss: () => void;
  textColor?: string;
  text: string;
}

const CustomSnackbar: React.FC<Props> = ({
  duration,
  visible,
  isOnTop,
  backgroundColor,
  onDismiss,
  textColor,
  text,
}) => {
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        onDismiss();
      }, duration);
    }
  }, [visible]);

  const snackbarStyle = {
    backgroundColor: backgroundColor ?? Colors.white,
  };
  const textColorStyle = {
    color: textColor ?? Colors.dark.text,
  };

  return (
    <>
      {visible && (
        <Animatable.View
          animation="fadeIn"
          duration={200}
          style={[
            isOnTop ? styles.snackbarViewTop : styles.snackbarViewBottom,
            styles.snackbarView,
            snackbarStyle,
          ]}
        >
          <CommonText style={[styles.defaultTextStyle, textColorStyle]}>
            {text}
          </CommonText>
        </Animatable.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  defaultTextStyle: {
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.medium),
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
