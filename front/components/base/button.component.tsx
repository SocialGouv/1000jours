import * as React from "react";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import { Button as RNEButton } from "react-native-elements";
import type { IconNode } from "react-native-elements/dist/icons/Icon";

import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Paddings,
  Sizes,
} from "../../constants";

interface Props {
  title: string;
  rounded: boolean;
  action?: () => void;
  icon?: IconNode;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const Button: React.FC<Props> = ({
  title,
  icon,
  rounded,
  disabled,
  action,
  buttonStyle,
  titleStyle,
  onPress,
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
      // Pour le volet de la carto, le onPress ne fonctionne pas sur Android, donc obligé d'ajouter onPressIn
      onPressIn={onPress}
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
    color: Colors.primaryBlue,
    textAlign: "left",
  },
  disabledButton: {
    backgroundColor: Colors.primaryBlueDisabled,
  },
  font: {
    fontFamily: getFontFamilyName(FontNames.comfortaa, FontWeight.bold),
    fontSize: Sizes.mmd,
    fontWeight: FontWeight.normal,
  },
  roundedButton: {
    backgroundColor: Colors.primaryBlue,
    borderRadius: Sizes.xxxl,
    paddingHorizontal: Paddings.larger,
    paddingVertical: Paddings.smaller,
  },
  roundedButtonTitle: {
    color: Colors.white,
    textAlign: "center",
  },
});

export default Button;
