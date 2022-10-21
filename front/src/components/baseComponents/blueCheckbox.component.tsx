import * as React from "react";
import { StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";

import { Colors, FontWeight, Sizes } from "../../styles";
import { BaseAssets } from "../assets";

interface Props {
  title: string;
  isChecked: boolean;
  onPress: () => void;
  iconRight?: boolean;
  accessibilityLabel?: string;
}

const BlueCheckbox: React.FC<Props> = ({
  title,
  isChecked,
  onPress,
  iconRight,
  accessibilityLabel,
}) => {
  return (
    <CheckBox
      containerStyle={styles.checkbox}
      textStyle={[styles.label, isChecked ? styles.selectedLabel : null]}
      iconRight={iconRight}
      uncheckedIcon={
        <BaseAssets.CheckboxUncheckedIcon width={Sizes.sm} height={Sizes.sm} />
      }
      checkedIcon={
        <BaseAssets.CheckboxCheckedIcon width={Sizes.sm} height={Sizes.sm} />
      }
      uncheckedColor={Colors.primaryBlueDark}
      checkedColor={Colors.primaryBlueDark}
      title={title}
      checked={isChecked}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ checked: isChecked }}
    />
  );
};
const styles = StyleSheet.create({
  checkbox: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    minHeight: Sizes.accessibilityMinButton,
  },
  label: {
    color: Colors.primaryBlueDark,
    flex: 1,
    fontWeight: FontWeight.normal,
  },
  selectedLabel: {
    fontWeight: FontWeight.bold,
  },
});

export default BlueCheckbox;
