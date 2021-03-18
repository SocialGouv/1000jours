import * as React from "react";
import { CheckBox as RNECheckBox } from "react-native-elements";

import CheckedIcon from "../../assets/images/radio_checked.svg";
import UncheckedIcon from "../../assets/images/radio_unchecked.svg";

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
    />
  );
};

export default Checkbox;
