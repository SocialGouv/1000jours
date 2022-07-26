import type { FC } from "react";
import * as React from "react";
import type {
  AccessibilityState,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import type { IconNode } from "react-native-elements/dist/icons/Icon";

import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Paddings,
  Sizes,
} from "../../styles";

interface Props {
  title: string;
  rounded: boolean;
  action?: () => void;
  icon?: IconNode;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  onPressIn?: () => void;
  accessibilityLabel?: string;
  accessibilityState?: AccessibilityState;
}

const setDisabledStyle = (
  disabledStyle?: StyleProp<ViewStyle>
): StyleProp<ViewStyle> =>
  disabledStyle ? disabledStyle : styles.disabledButton;

const CustomButton: FC<Props> = ({
  title,
  icon,
  rounded,
  disabled,
  action,
  buttonStyle,
  disabledStyle,
  titleStyle,
  onPressIn,
  accessibilityLabel,
  accessibilityState,
}) => (
  <Button
    disabled={disabled}
    disabledStyle={disabled ? setDisabledStyle(disabledStyle) : null}
    icon={icon}
    iconRight={false}
    title={title}
    buttonStyle={[
      rounded ? styles.roundedButton : null,
      buttonStyle,
      styles.accessibilitySize,
    ]}
    titleStyle={[
      styles.font,
      rounded ? styles.roundedButtonTitle : styles.clearButtonTitle,
      icon ? styles.buttonWithIcon : null,
      titleStyle,
    ]}
    disabledTitleStyle={rounded ? styles.roundedButtonTitle : null}
    // Pour le volet de la carto, le onPress ne fonctionne pas sur Android, donc obligé d'ajouter onPressIn
    onPressIn={onPressIn}
    onPress={action}
    type={rounded ? "solid" : "clear"}
    accessibilityLabel={accessibilityLabel}
    accessibilityRole="button"
    accessibilityState={accessibilityState}
  />
);

const styles = StyleSheet.create({
  accessibilitySize: {
    minHeight: Sizes.accessibilityMinButton,
    minWidth: Sizes.accessibilityMinButton,
  },
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

export default CustomButton;
