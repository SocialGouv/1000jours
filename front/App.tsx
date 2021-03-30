import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { API_URL, HASURA_ADMIN_SECRET } from "@env";
import { StatusBar } from "expo-status-bar";
import type { FC } from "react";
import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

const client = new ApolloClient({
  cache: new InMemoryCache({ resultCaching: false }),
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
  },
  uri: `${API_URL}/v1/graphql`,
});

const App: FC = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </ApolloProvider>
    );
  }
};

export default App;
