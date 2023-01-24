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

import { Labels } from "../../constants";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Paddings,
  Sizes,
} from "../../styles";
import Icomoon, { IcomoonIcons } from "./icomoon.component";
import { View } from "./Themed";

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
  accessibilityHint?: string;
  hasOptions?: boolean;
  optionsAction?: () => void;
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
  accessibilityHint,
  hasOptions,
  optionsAction,
}) => (
  <View style={styles.rowContainer}>
    <Button
      disabled={disabled}
      disabledStyle={disabled ? setDisabledStyle(disabledStyle) : null}
      icon={icon}
      iconRight={false}
      title={title}
      buttonStyle={[
        rounded
          ? hasOptions
            ? styles.roundedButtonLeft
            : styles.roundedButton
          : null,
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
      accessibilityHint={disabled ? accessibilityHint : undefined}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={accessibilityState}
    />
    {hasOptions && (
      <Button
        icon={
          <Icomoon
            name={IcomoonIcons.reglages}
            size={Sizes.md}
            color={Colors.primaryBlue}
          />
        }
        buttonStyle={[
          rounded ? styles.roundedButtonRight : null,
          buttonStyle,
          styles.accessibilitySize,
        ]}
        onPress={optionsAction}
        type={rounded ? "solid" : "clear"}
        accessibilityHint={disabled ? accessibilityHint : undefined}
        accessibilityLabel={Labels.accessibility.options}
        accessibilityRole="button"
        accessibilityState={accessibilityState}
      />
    )}
  </View>
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
  roundedButtonLeft: {
    backgroundColor: Colors.primaryBlue,
    borderBottomStartRadius: Sizes.xxxl,
    borderTopStartRadius: Sizes.xxxl,
    paddingHorizontal: Paddings.larger,
    paddingVertical: Paddings.smaller,
  },
  roundedButtonRight: {
    backgroundColor: Colors.primaryBlue,
    borderBottomEndRadius: Sizes.xxxl,
    borderLeftWidth: 0,
    borderTopEndRadius: Sizes.xxxl,
  },
  roundedButtonTitle: {
    color: Colors.white,
    textAlign: "center",
  },
  rowContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
  },
});

export default CustomButton;
