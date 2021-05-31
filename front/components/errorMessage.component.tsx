import type { ApolloError } from "@apollo/client";
import * as React from "react";
import { useEffect } from "react";
import { Alert, StyleSheet } from "react-native";

import { Labels, Paddings } from "../constants";
import { Text, View } from "./Themed";

interface Props {
  error: ApolloError;
}

const ErrorMessage: React.FC<Props> = ({ error }) => {
  const createAlertMessage = () => {
    const message = error.graphQLErrors
      .map((graphqlError) => `${graphqlError.message}`)
      .join("\n");

    Alert.alert(Labels.warning, message, [{ text: "OK" }]);
  };

  useEffect(() => {
    if (error.graphQLErrors.length > 0) createAlertMessage();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text>{Labels.errorMsg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: Paddings.default,
  },
});

export default ErrorMessage;
