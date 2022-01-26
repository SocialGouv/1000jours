import { ApolloProvider } from "@apollo/client";
import Constants from "expo-constants";
import * as Font from "expo-font";
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
  TrackerProvider,
  TrackScreenViewComponent,
} from "./src/components";
import { initLocales } from "./src/config/calendar-config";
import { StorageKeysConstants } from "./src/constants";
import { useCachedResources, useColorScheme } from "./src/hooks";
import Navigation from "./src/navigation/navigation.component";
import { apolloService } from "./src/services";
import { initMonitoring, StorageUtils, TrackerUtils } from "./src/utils";

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

    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  if (!fontsLoaded || !isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <TrackerAppStart />
        <TrackScreenViewComponent
          screenName={`${TrackerUtils.TrackingEvent.APP_ACTIVE} - ${appCounter}`}
          launchTracking
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
