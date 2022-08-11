import * as React from "react";
import { useCallback, useEffect } from "react";
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
} from "../../styles";

interface Props {
  id: number;
  title: string;
  selected: boolean;
  action: (id: number, active: boolean) => void;
}

const Chip: React.FC<Props> = ({ id, title, selected, action }) => {
  const [isSelected, setIsSelected] = React.useState(selected);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const onPress = useCallback(() => {
    action(id, !isSelected);
    setIsSelected(!isSelected);
  }, [action, id, isSelected]);

  return (
    <RNChip
      buttonStyle={[styles.chip, isSelected ? styles.chipSelected : null]}
      title={title + (isSelected ? "  -" : "  +")}
      type={isSelected ? "solid" : "outline"}
      titleStyle={[
        styles.chipTitle,
        isSelected ? styles.chipSelectedTitle : null,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
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
    fontSize: Sizes.xs,
  },
});

export default Chip;
