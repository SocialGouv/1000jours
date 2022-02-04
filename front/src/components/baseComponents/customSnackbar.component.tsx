import * as React from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

import { Colors, FontWeight, Margins, Paddings } from "../../styles";
import { SecondaryText } from "./StyledText";

interface Props {
  duration: number;
  visible: boolean;
  isOnTop?: boolean;
  marginTopValue?: number;
  backgroundColor?: string;
  onDismiss: () => void;
  textColor?: string;
  text: string;
}

const CustomSnackbar: React.FC<Props> = ({
  duration,
  visible,
  isOnTop,
  marginTopValue,
  backgroundColor,
  onDismiss,
  textColor,
  text,
}) => {
  useEffect(() => {
    if (!visible) return;
    setTimeout(() => {
      onDismiss();
    }, duration);
  }, [visible]);

  const snackbarStyle = {
    backgroundColor: backgroundColor ?? Colors.white,
  };
  const textColorStyle = {
    color: textColor ?? Colors.dark.text,
  };

  const marginTop = { marginTop: marginTopValue };

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
          <SecondaryText style={[styles.defaultTextStyle, textColorStyle]}>
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
