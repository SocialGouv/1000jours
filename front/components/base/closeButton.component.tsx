import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Colors, Labels, Paddings, Sizes } from "../../constants";
import Icomoon, { IcomoonIcons } from "../base/icomoon.component";

interface Props {
  onPress: () => void;
  clear: boolean;
}

const CloseButton: React.FC<Props> = ({ onPress, clear }) => {
  return (
    <TouchableOpacity
      style={[styles.closeModalView, clear ? null : styles.solidRounded]}
      onPress={onPress}
      accessibilityLabel={Labels.buttons.close}
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
    padding: Paddings.default,
  },
  solidRounded: {
    backgroundColor: Colors.primaryBlueDark,
    borderRadius: 20,
    color: Colors.white,
  },
});

export default CloseButton;
