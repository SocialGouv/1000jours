import * as React from "react";
import { Snackbar } from "react-native-paper";

import { Colors, FontWeight } from "../constants";
import { CommonText } from ".";

interface Props {
  duration: number;
  visible: boolean;
  backgroundColor?: string;
  onDismiss: () => void;
  textColor?: string;
  text: string;
}

const CustomSnackBar: React.FC<Props> = ({
  duration,
  visible,
  backgroundColor,
  onDismiss,
  textColor,
  text,
}) => {
  const snackbarStyle = {
    backgroundColor: backgroundColor ?? Colors.white,
  };
  const textStyle = {
    color: textColor ?? Colors.dark.text,
    fontWeight: FontWeight.bold,
  };

  return (
    <Snackbar
      duration={duration}
      visible={visible}
      style={snackbarStyle}
      onDismiss={onDismiss}
    >
      <CommonText style={textStyle}>{text}</CommonText>
    </Snackbar>
  );
};

export default CustomSnackBar;
