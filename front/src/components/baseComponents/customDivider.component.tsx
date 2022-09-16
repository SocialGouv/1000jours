import type { FC } from "react";
import React from "react";
import { StyleSheet } from "react-native";

import { Colors, Sizes } from "../../styles";
import { View } from "../baseComponents";

const CustomDivider: FC = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    alignSelf: "center",
    backgroundColor: Colors.primaryBlue,
    borderRadius: Sizes.xs,
    height: Sizes.divider,
    width: "100%",
  },
});

export default CustomDivider;
