import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import type { FC } from "react";
import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import IcomoonFont from "./assets/icomoon/icomoon.ttf";
import { initLocales } from "./config/calendar-config";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { allKeys } from "./storage/storage-keys";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET ?? "",
  },
  uri: `${process.env.API_URL}/v1/graphql`,
});

initLocales();

// eslint-disable-next-line @typescript-eslint/naming-convention
const customFonts = { IcoMoon: IcomoonFont };

const App: FC = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // Load Custom Fonts (Icomoon)
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync(customFonts)
      .then(() => {
        setFontsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (process.env.CLEAR_STORAGE) void AsyncStorage.multiRemove(allKeys);

  if (!fontsLoaded || !isLoadingComplete) {
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
