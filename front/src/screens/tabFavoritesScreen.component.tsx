import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import { TitleH1, View } from "../components/baseComponents";
import { Labels } from "../constants";

const TabFavoritesScreen: FC = () => (
  <View style={styles.container}>
    <TitleH1 title={Labels.tabs.favoritesTitle} animated={false} />
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
});

export default TabFavoritesScreen;
