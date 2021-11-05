import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Colors, Labels, Paddings, Sizes } from "../../constants";
import { Icomoon, IcomoonIcons } from "..";

interface Props {
  onPress: () => void;
  clear: boolean;
}

const CloseButton: React.FC<Props> = ({ onPress, clear }) => {
  return (
    <TouchableOpacity
      style={[styles.closeModalView, clear ? null : styles.solidRounded]}
      onPress={onPress}
      accessibilityLabel={Labels.accessibility.close}
      accessibilityRole="button"
    >
      <Icomoon
        name={IcomoonIcons.fermer}
        size={Sizes.xs}
        color={clear ? Colors.primaryBlue : Colors.white}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  closeModalView: {
    padding: Paddings.default,
  },
  solidRounded: {
    backgroundColor: Colors.primaryBlueDark,
    borderRadius: 20,
    color: Colors.white,
  },
});

export default CloseButton;
