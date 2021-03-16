import * as React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import Colors from "../../constants/Colors";

interface Props {
  title: string;
  rounded: boolean;
  disabled: boolean;
  action: () => void;
}

const _Button: React.FC<Props> = ({ title, rounded, disabled, action }) => {
  return (
    <Button
      disabled={disabled}
      disabledStyle={disabled ? styles.disabledButton : null}
      iconRight
      title={title}
      buttonStyle={rounded ? styles.roundedButton : styles.clearButton}
      titleStyle={rounded ? styles.roundedButtonTitle : styles.clearButtonTitle}
      onPress={action}
      type={rounded ? "solid" : "clear"}
    />
  );
};

const styles = StyleSheet.create({
  clearButton: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    padding: 15,
  },
  clearButtonTitle: {
    color: Colors.tertiaryColor,
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: Colors.tertiaryColorDisabled,
  },
  roundedButton: {
    backgroundColor: Colors.tertiaryColor,
    borderRadius: 40,
  },
  roundedButtonTitle: {
    color: "white",
    textAlign: "center",
  },
});

export default _Button;
