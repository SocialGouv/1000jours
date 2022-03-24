import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Labels } from "../../constants";
import { Colors, Paddings, Sizes } from "../../styles";
import Icomoon, { IcomoonIcons } from "./icomoon.component";

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
        size={Sizes.sm}
        color={clear ? Colors.primaryBlueDark : Colors.white}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  closeModalView: {
    minHeight: Sizes.minButton,
    minWidth: Sizes.minButton,
    padding: Paddings.default,
  },
  solidRounded: {
    backgroundColor: Colors.primaryBlueDark,
    borderRadius: 20,
    color: Colors.white,
  },
});

export default CloseButton;
