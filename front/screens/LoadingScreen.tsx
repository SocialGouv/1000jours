import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { isFirstLaunchKey } from "../storage/storage-keys";
import {
  getObjectValue,
  getStringValue,
  storeObjectValue,
} from "../storage/storage-utils";
import type { RootStackParamList } from "../types";

interface LoadingScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "loading">;
}

const LoadingScreen: FC<LoadingScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const handleFirstLaunch = async () => {
      const isFirstLaunch = await getObjectValue(isFirstLaunchKey);
      if (isFirstLaunch === null) {
        navigation.navigate("onboarding");
      } else {
        navigation.navigate("root");
      }
    };
    handleFirstLaunch();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
  },
});

export default LoadingScreen;
