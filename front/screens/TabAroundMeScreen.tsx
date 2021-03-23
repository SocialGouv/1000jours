import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

const TabAroundMeScreen: FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>TabAroundMeScreen</Text>
    <View
      style={styles.separator}
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TabAroundMeScreen;
