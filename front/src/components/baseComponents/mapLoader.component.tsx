import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { Colors } from "../../styles";

interface Props {
  onTouchEnd?: () => void;
}

const MapLoader: FC<Props> = ({ onTouchEnd }) => {
  return (
    <ActivityIndicator
      onTouchEnd={onTouchEnd}
      size="large"
      style={styles.indicator}
      color={Colors.primaryBlue}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: "transparent",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
});

export default MapLoader;
