import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import IcomoonFont from "./assets/icomoon/icomoon.ttf";
import { initLocales } from "./config/calendar-config";
import { StorageKeysConstants } from "./constants";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { StorageUtils, TrackerUtils } from "./utils";
import { MatomoProvider, useMatomo } from "matomo-tracker-react-native";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  headers: { "content-type": "application/json" },
  uri: `${process.env.API_URL}/graphql`,
});

initLocales();

// eslint-disable-next-line @typescript-eslint/naming-convention
const customFonts = { IcoMoon: IcomoonFont };

const App: FC = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // Load Custom Fonts (Icomoon)
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { trackAppStart } = useMatomo();

  useEffect(() => {
    trackAppStart();
    Font.loadAsync(customFonts)
      .then(() => {
        setFontsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (process.env.CLEAR_STORAGE)
    void StorageUtils.multiRemove(StorageKeysConstants.allStorageKeys);

  if (!fontsLoaded || !isLoadingComplete) {
    return null;
  } else {
    return (
      <MatomoProvider instance={TrackerUtils.matomoInstance}>
        <ApolloProvider client={client}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </ApolloProvider>
      </MatomoProvider>
    );
  }
};

export default App;
