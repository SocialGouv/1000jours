import * as React from "react";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import { Button as RNEButton } from "react-native-elements";
import type { IconNode } from "react-native-elements/dist/icons/Icon";

import Colors from "../../constants/Colors";
import { FontWeight } from "../../constants/Layout";
import { FontNames, getFontFamilyName } from "../StyledText";

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
        styles.font,
        rounded ? styles.roundedButtonTitle : styles.clearButtonTitle,
        icon ? styles.buttonWithIcon : null,
        titleStyle,
      ]}
      disabledTitleStyle={rounded ? styles.roundedButtonTitle : null}
      onPress={action}
      type={rounded ? "solid" : "clear"}
    />
  );
};

const styles = StyleSheet.create({
  buttonWithIcon: {
    paddingStart: 8,
  },
  clearButtonTitle: {
    color: Colors.primaryBlueDark,
    textAlign: "left",
  },
  disabledButton: {
    backgroundColor: Colors.primaryBlueDisabled,
  },
  font: {
    fontFamily: getFontFamilyName(FontNames.comfortaa, FontWeight.bold),
    fontSize: 17,
  },
  roundedButton: {
    backgroundColor: Colors.primaryBlue,
    borderRadius: 40,
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
  roundedButtonTitle: {
    color: "white",
    textAlign: "center",
  },
});

export default Button;
