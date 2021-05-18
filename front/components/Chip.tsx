import * as React from "react";
import { StyleSheet } from "react-native";
import { Chip as RNChip } from "react-native-elements";

import { Colors, FontWeight, Margins, Paddings, Sizes } from "../constants";
import { FontNames, getFontFamilyName } from "./StyledText";

interface Props {
  id: number;
  title: string;
  selected: boolean;
  action: (id: number, active: boolean) => void;
}

const Chip: React.FC<Props> = ({ id, title, selected, action }) => {
  const [isSelected, setIsSelected] = React.useState(selected);
  const onPress = () => {
    action(id, !isSelected);
    setIsSelected(!isSelected);
  };

  return (
    <RNChip
      buttonStyle={[styles.chip, isSelected ? styles.chipSelected : null]}
      title={title}
      type={isSelected ? "solid" : "outline"}
      titleStyle={[
        styles.chipTitle,
        isSelected ? styles.chipSelectedTitle : null,
      ]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  chip: {
    borderColor: Colors.primaryBlue,
    marginHorizontal: Paddings.smallest,
    marginVertical: Margins.smallest,
  },
  chipSelected: {
    backgroundColor: Colors.primaryBlue,
  },
  chipSelectedTitle: {
    color: "white",
  },
  chipTitle: {
    color: Colors.primaryBlue,
    fontFamily: getFontFamilyName(FontNames.comfortaa, FontWeight.bold),
    fontSize: Sizes.xs,
  },
});

export default Chip;
