import * as React from "react";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import { Button as RNEButton } from "react-native-elements";
import type { IconNode } from "react-native-elements/dist/icons/Icon";

import Colors from "../../constants/Colors";

interface Props {
  title: string;
  rounded: boolean;
  action: () => void;
  icon?: IconNode;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<Props> = ({
  title,
  icon,
  rounded,
  disabled,
  action,
  buttonStyle,
  titleStyle,
}) => {
  return (
    <RNEButton
      disabled={disabled}
      disabledStyle={disabled ? styles.disabledButton : null}
      icon={icon}
      iconRight={false}
      title={title}
      buttonStyle={[rounded ? styles.roundedButton : null, buttonStyle]}
      titleStyle={[
        rounded ? styles.roundedButtonTitle : styles.clearButtonTitle,
        titleStyle,
      ]}
      onPress={action}
      type={rounded ? "solid" : "clear"}
    />
  );
};

const styles = StyleSheet.create({
  clearButtonTitle: {
    color: Colors.primaryBlue,
    textAlign: "left",
  },
  disabledButton: {
    backgroundColor: Colors.primaryBlueLight,
  },
  roundedButton: {
    backgroundColor: Colors.primaryBlue,
    borderRadius: 40,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  roundedButtonTitle: {
    color: "white",
    textAlign: "center",
  },
});

export default Button;
