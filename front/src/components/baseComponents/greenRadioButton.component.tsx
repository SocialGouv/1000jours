import * as React from "react";
import { StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";

import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
  Paddings,
  Sizes,
} from "../../styles";
import { BaseAssets } from "../assets";

interface Props {
  title: string;
  isChecked: boolean;
  onPress: () => void;
  labelSize?: number;
}

const GreenRadioButton: React.FC<Props> = ({
  title,
  isChecked,
  onPress,
  labelSize,
}) => {
  const labelSizeStyle = { fontSize: labelSize ?? Sizes.xxs };
  return (
    // The native checkbox is used instead of the native radio button for
    // its customization possibilities
    <CheckBox
      title={title}
      checkedIcon={
        <BaseAssets.CheckedIcon width={Sizes.xs} height={Sizes.xs} />
      }
      uncheckedIcon={
        <BaseAssets.UncheckedIcon width={Sizes.xs} height={Sizes.xs} />
      }
      checked={isChecked}
      accessibilityState={{ selected: isChecked }}
      onPress={onPress}
      containerStyle={[styles.checkbox]}
      textStyle={[
        styles.label,
        labelSizeStyle,
        isChecked ? styles.selectedLabel : null,
      ]}
    />
  );
};
const styles = StyleSheet.create({
  checkbox: {
    alignSelf: "flex-start",
    backgroundColor: "transparent",
    borderWidth: 0,
    marginHorizontal: Margins.light,
    marginVertical: 0,
    padding: Paddings.light,
    width: "100%",
  },
  label: {
    color: Colors.primaryBlueDark,
    fontFamily: getFontFamilyName(FontNames.comfortaa, FontWeight.bold),
    fontWeight: FontWeight.normal,
  },
  selectedLabel: {
    color: Colors.secondaryGreen,
  },
});

export default GreenRadioButton;
