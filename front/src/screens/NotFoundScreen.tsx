import type { StackScreenProps } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import type { RootStackParamList } from "../types";

const NotFoundScreen: FC = ({
  navigation,
}: StackScreenProps<RootStackParamList, "notFound">) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.replace("root");
        }}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    color: "#2e78b7",
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default NotFoundScreen;
