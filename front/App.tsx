import { ApolloProvider } from "@apollo/client";
import Constants from "expo-constants";
import * as Font from "expo-font";
import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";
import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import type { AppStateStatus } from "react-native";
import { AppState } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import IcomoonFont from "./src/assets/icomoon/icomoon.ttf";
import {
  setNotificationHandler,
  TrackerAppStart,
  TrackerHandler,
  TrackerProvider,
} from "./src/components";
import { initLocales } from "./src/config/calendar-config";
import { Links, StorageKeysConstants } from "./src/constants";
import { useCachedResources, useColorScheme } from "./src/hooks";
import Navigation from "./src/navigation/navigation.component";
import { apolloService } from "./src/services";
import {
  initMonitoring,
  RootNavigation,
  StorageUtils,
  TrackerUtils,
} from "./src/utils";

setNotificationHandler();

const client = apolloService.getApolloClient();

initLocales();
initMonitoring();

// eslint-disable-next-line @typescript-eslint/naming-convention
const customFonts = { IcoMoon: IcomoonFont };

const MainAppContainer: FC = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [appCounter, setAppCounter] = useState(0);

  // Load Custom Fonts (Icomoon)
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const updateAppActiveCounter = async () => {
    const appActiveCounterStr = await StorageUtils.getStringValue(
      StorageKeysConstants.appActiveCounter
    );
    const appActiveCounter = appActiveCounterStr
      ? Number(appActiveCounterStr)
      : 0;
    const newAppActiveCounter = appActiveCounter + 1;
    void StorageUtils.storeStringValue(
      StorageKeysConstants.appActiveCounter,
      newAppActiveCounter.toString()
    );
    setAppCounter(newAppActiveCounter);
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === "active") {
      void updateAppActiveCounter();
      void manageStorage();
    }
  };

  const manageStorage = async () => {
    if (process.env.CLEAR_STORAGE === "true")
      void StorageUtils.multiRemove(StorageKeysConstants.allStorageKeys);

    const lastVersionLaunch = await StorageUtils.getStringValue(
      StorageKeysConstants.lastVersionLaunchKey
    );

    if (
      Constants.manifest.version &&
      lastVersionLaunch !== Constants.manifest.version
    ) {
      await StorageUtils.storeStringValue(
        StorageKeysConstants.lastVersionLaunchKey,
        Constants.manifest.version
      );
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.forceToScheduleEventsNotif,
        true
      );
    }
  };

  const redirectDeepLink = (url: string) => {
    const { path, queryParams } = Linking.parse(url);
    if (path === Linking.parse(Links.deepLinkUrl).path) {
      RootNavigation.navigate(queryParams.page as string, {
        id: queryParams.id,
      });
    }
  };

  const handleOpenURL = ({ url }: { url: string }) => {
    if (url) redirectDeepLink(url);
  };

  useEffect(() => {
    Font.loadAsync(customFonts)
      .then(() => {
        setFontsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });

    void manageStorage();

    // Permet de détecter lorsque l'app change d'état ('active' | 'background' | 'inactive' | 'unknown' | 'extension')
    AppState.addEventListener("change", handleAppStateChange);

    // Permet de récupérer l'url qui a déclenché l'ouverture de l'app lorsque celle-ci n'est pas déjà ouverte
    Linking.getInitialURL()
      .then((url) => {
        if (url) {
          setTimeout(() => {
            redirectDeepLink(url);
          }, 2000);
        }
      })
      .catch((err) => {
        console.error("An error occurred", err);
      });

    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
      Linking.removeEventListener("url", handleOpenURL);
    };
  }, []);

  if (!fontsLoaded || !isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <TrackerAppStart />
        <TrackerHandler
          screenName={`${TrackerUtils.TrackingEvent.APP_ACTIVE} - ${appCounter}`}
        />
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </ApolloProvider>
    );
  }
};

const App: FC = () => {
  return <TrackerProvider appContainer={<MainAppContainer />} />;
};

export default App;
