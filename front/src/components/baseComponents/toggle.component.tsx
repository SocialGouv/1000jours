import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Colors, Sizes } from "../../styles";
import Icomoon, { IcomoonIcons } from "./icomoon.component";

interface Props {
  isToggleOn: boolean;
  toggleSwitch: () => void;
}

const Toggle: React.FC<Props> = ({ isToggleOn, toggleSwitch }) => {
  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        onPress={toggleSwitch}
        accessibilityRole="switch"
        accessibilityState={{ checked: isToggleOn }}
      >
        <Icomoon
          name={isToggleOn ? IcomoonIcons.toggleOn : IcomoonIcons.toggleOff}
          color={Colors.mood.veryGood}
          size={Sizes.sm}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    paddingTop: 0,
  },
});

export default Toggle;
