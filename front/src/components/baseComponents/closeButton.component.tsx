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
    minHeight: Sizes.accessibilityMinButton,
    minWidth: Sizes.accessibilityMinButton,
    padding: Paddings.default,
  },
  solidRounded: {
    alignItems: "center",
    backgroundColor: Colors.primaryBlueDark,
    borderRadius: 25,
    color: Colors.white,
    justifyContent: "center",
  },
});

export default CloseButton;
