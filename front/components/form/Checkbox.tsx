import * as React from "react";
import { StyleSheet } from "react-native";
import { CheckBox as RNECheckBox } from "react-native-elements";

import CheckedIcon from "../../assets/images/radio_checked.svg";
import UncheckedIcon from "../../assets/images/radio_unchecked.svg";
import { Paddings, Sizes } from "../../constants";
import Colors from "../../constants/Colors";
import { FontWeight } from "../../constants/Layout";
import { FontNames, getFontFamilyName } from "../StyledText";

interface Props {
  title: string;
  checked: boolean;
  onPress: () => void;
}

const Checkbox: React.FC<Props> = ({ title, checked, onPress }) => {
  return (
    <RNECheckBox
      title={title}
      checkedIcon={<CheckedIcon width={Sizes.xs} height={Sizes.xs} />}
      uncheckedIcon={<UncheckedIcon width={Sizes.xs} height={Sizes.xs} />}
      checked={checked}
      onPress={onPress}
      containerStyle={[styles.checkbox]}
      textStyle={[styles.label, checked ? styles.labelSelected : null]}
    />
  );
};
const styles = StyleSheet.create({
  checkbox: {
    alignSelf: "flex-start",
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingVertical: Paddings.smallest,
  },
  label: {
    color: Colors.primaryBlueDark,
    fontFamily: getFontFamilyName(FontNames.comfortaa, FontWeight.bold),
    fontSize: Sizes.xxxs,
    fontWeight: FontWeight.normal,
  },
  labelSelected: {
    color: Colors.secondaryGreen,
  },
});

export default Checkbox;
