import * as React from "react";
import { StyleSheet } from "react-native";
import { CheckBox as RNECheckBox } from "react-native-elements";

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
  checked: boolean;
  onPress: () => void;
  labelSize?: number;
}

const Checkbox: React.FC<Props> = ({ title, checked, onPress, labelSize }) => {
  const labelSizeStyle = { fontSize: labelSize ?? Sizes.xxs };
  return (
    <RNECheckBox
      title={title}
      checkedIcon={
        <BaseAssets.CheckedIcon width={Sizes.xs} height={Sizes.xs} />
      }
      uncheckedIcon={
        <BaseAssets.UncheckedIcon width={Sizes.xs} height={Sizes.xs} />
      }
      checked={checked}
      onPress={onPress}
      containerStyle={[styles.checkbox]}
      textStyle={[
        styles.label,
        labelSizeStyle,
        checked ? styles.labelSelected : null,
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
  labelSelected: {
    color: Colors.secondaryGreen,
  },
});

export default Checkbox;
