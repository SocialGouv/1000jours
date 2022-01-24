import * as React from "react";
import { StyleSheet } from "react-native";

import { View } from "../Themed";

interface Props {
  isVisible: boolean;
  onPress: () => void;
}

const Backdrop: React.FC<Props> = ({ isVisible, onPress }) => {
  return isVisible ? (
    <View style={styles.backdrop} onTouchStart={onPress}></View>
  ) : null;
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "black",
    height: "100%",
    left: 0,
    opacity: 0.5,
    position: "absolute",
    width: "100%",
  },
});

export default Backdrop;
