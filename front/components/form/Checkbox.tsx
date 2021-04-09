import * as React from "react";
import { StyleSheet } from "react-native";
import { CheckBox as RNECheckBox } from "react-native-elements";

import CheckedIcon from "../../assets/images/radio_checked.svg";
import UncheckedIcon from "../../assets/images/radio_unchecked.svg";
import Colors from "../../constants/Colors";
import { fontsMap } from "../StyledText";

interface Props {
  title: string;
  checked: boolean;
  onPress: () => void;
}

const Checkbox: React.FC<Props> = ({ title, checked, onPress }) => {
  return (
    <RNECheckBox
      title={title}
      checkedIcon={<CheckedIcon width={16} height={16} />}
      uncheckedIcon={<UncheckedIcon width={16} height={16} />}
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
    paddingVertical: 5,
  },
  label: {
    color: Colors.primaryBlueDark,
    fontFamily: fontsMap.normal,
    fontSize: 11,
  },
  labelSelected: {
    color: Colors.secondaryGreen,
  },
});

export default Checkbox;
