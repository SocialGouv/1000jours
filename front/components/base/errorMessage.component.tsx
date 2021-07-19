import type { ApolloError } from "@apollo/client";
import * as React from "react";
import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";

import { Labels, Paddings } from "../../constants";
import type { ApolloHealthResponse } from "../../types";
import { reportError } from "../../utils/logging.util";
import { Text, View } from "../Themed";

interface Props {
  error: ApolloError;
}

const ErrorMessage: React.FC<Props> = ({ error }) => {
  const [errorMessage, setErrorMessage] = useState(Labels.errorMsg);
  const [fetchIsComplete, setFetchIsComplete] = useState(true);

  const createAlertMessage = () => {
    const message = error.graphQLErrors
      .map((graphqlError) => `${graphqlError.message}`)
      .join("\n");

    // Sans le setTimeout l'Alert peut disparaitre si elle est appelée pendant une animation de navigation
    setTimeout(() => {
      Alert.alert(Labels.warning, message, [{ text: "OK" }]);
    }, 500);
  };

  // Vérifie si l'api graphql est opérationnelle
  const checkApolloApi = async (apolloError: ApolloError) => {
    setFetchIsComplete(false);

    try {
      const response = await fetch(
        `${process.env.API_URL}/.well-known/apollo/server-health`,
        { cache: "no-cache" }
      );
      reportError(`${Labels.errorMsg} : ${apolloError.message}`);

      let responseJson = null;

      try {
        responseJson = (await response.json()) as ApolloHealthResponse;
      } catch (e: unknown) {
        const responseText: string = await response.text();
        reportError(responseText);
      }
      if (responseJson?.status === "pass") {
        setErrorMessage(Labels.errorMsg);
      } else {
        throw new Error();
      }
    } catch (e: unknown) {
      setErrorMessage(Labels.errorNetworkMsg);
    } finally {
      setFetchIsComplete(true);
    }
  };

  useEffect(() => {
    if (error.graphQLErrors.length > 0) createAlertMessage();
    else void checkApolloApi(error);
  }, []);

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
