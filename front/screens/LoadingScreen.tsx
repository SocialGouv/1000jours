import type { FC } from "react";
import * as React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { useEffect } from "react";
import {
  getObjectValue,
  getStringValue,
  storeObjectValue,
} from "../storage/storage-utils";
import { isFirstLaunchKey } from "../storage/storage-keys";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type LoadingScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "loading">;
};

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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

export default LoadingScreen;
