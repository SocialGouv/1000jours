import type { ApolloError } from "@apollo/client";
import * as React from "react";
import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";

import { Labels, Paddings } from "../constants";
import type { ApolloHealthResponse } from "../types";
import { Text, View } from "./Themed";

interface Props {
  error: ApolloError;
}

const ErrorMessage: React.FC<Props> = ({ error }) => {
  const [errorMessage, setErrorMessage] = useState(Labels.errorMsg);
  const [fetchIsComplete, setFetchIsComplete] = useState(false);

  const createAlertMessage = () => {
    const message = error.graphQLErrors
      .map((graphqlError) => `${graphqlError.message}`)
      .join("\n");

    Alert.alert(Labels.warning, message, [{ text: "OK" }]);
  };

  useEffect(() => {
    if (error.graphQLErrors.length > 0) createAlertMessage();
  }, []);

  // Vérifie si l'api graphql est opérationnelle
  fetch(`${process.env.API_URL}/.well-known/apollo/server-health`)
    .then(async (data) => data.json())
    .then((jsonData: ApolloHealthResponse) => {
      if (jsonData.status !== "pass") setErrorMessage(Labels.errorNetworkMsg);
    })
    .catch(() => {
      setErrorMessage(Labels.errorNetworkMsg);
    })
    .finally(() => {
      setFetchIsComplete(true);
    });

  return fetchIsComplete ? (
    <View style={styles.mainContainer}>
      <Text>{errorMessage}</Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: Paddings.default,
  },
});

export default ErrorMessage;
