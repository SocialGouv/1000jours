import * as React from "react";
import { StyleSheet } from "react-native";
import { Chip as RNChip } from "react-native-elements";

import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
  Paddings,
  Sizes,
} from "../../constants";
import { PLATFORM_IS_IOS } from "../../constants/platform.constants";

interface Props {
  id: number;
  title: string;
  selected: boolean;
  action: (id: number, active: boolean) => void;
  changeSizeForIos?: boolean;
}

const Chip: React.FC<Props> = ({
  id,
  title,
  selected,
  action,
  changeSizeForIos,
}) => {
  const [isSelected, setIsSelected] = React.useState(selected);
  const onPress = () => {
    action(id, !isSelected);
    setIsSelected(!isSelected);
  };

  const fontSize = {
    fontSize: changeSizeForIos && PLATFORM_IS_IOS ? Sizes.xxs : Sizes.xs,
  };

  return (
    <RNChip
      buttonStyle={[styles.chip, isSelected ? styles.chipSelected : null]}
      title={title + (isSelected ? "  -" : "  +")}
      type={isSelected ? "solid" : "outline"}
      titleStyle={[
        styles.chipTitle,
        isSelected ? styles.chipSelectedTitle : null,
        fontSize,
      ]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  chip: {
    borderColor: Colors.primaryBlueLight,
    borderRadius: Sizes.xxxxxs,
    borderWidth: 1,
    marginBottom: Margins.smallest,
    marginRight: Margins.smaller,
    marginVertical: Margins.smaller,
    paddingHorizontal: Paddings.light,
    paddingVertical: Paddings.light,
  },
  chipSelected: {
    backgroundColor: Colors.primaryBlueLight,
  },
  chipSelectedTitle: {
    color: Colors.primaryBlue,
  },
  chipTitle: {
    color: Colors.primaryBlue,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.medium),
  },
});

export default Chip;
