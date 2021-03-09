import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../../constants/Colors";
import { Text } from "../Themed";

interface ButtonProps {
  title: string;
  rounded: boolean;
  disabled: boolean;
  action: () => void;
}

const getStyle = (rounded: boolean, disabled: boolean) => {
  return [
    styles.normalButton,
    rounded ? styles.roundedButton : null,
    disabled ? styles.disabledButton : null,
  ];
};

const Button: React.FC<ButtonProps> = ({
  title,
  rounded,
  disabled,
  action,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={getStyle(rounded, disabled)}
      onPress={action}
    >
      <Text
        style={rounded ? styles.roundedButtonText : styles.normalButtonText}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabledButton: {
    backgroundColor: Colors.tertiaryColorDisabled,
  },
  normalButton: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    padding: 15,
  },
  normalButtonText: {
    color: Colors.tertiaryColor,
    textAlign: "center",
  },
  roundedButton: {
    backgroundColor: Colors.tertiaryColor,
    borderRadius: 40,
  },
  roundedButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default Button;
