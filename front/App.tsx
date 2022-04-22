import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { assertWrappingType } from "graphql";
import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import type { AppStateStatus } from "react-native";
import { AppState } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { BaseAssets } from "./src/components/assets";
import LinksHandler from "./src/components/links/linksHandler.component";
import { setNotificationHandler } from "./src/components/notification/notificationHandler.component";
import TrackerHandler from "./src/components/tracker/trackerHandler.component";
import {
  TrackerAppStart,
  TrackerProvider,
} from "./src/components/tracker/trackerInit.component";
import { initLocales } from "./src/config/calendar-config";
import { StorageKeysConstants } from "./src/constants";
import { useCachedResources, useColorScheme } from "./src/hooks";
import Navigation from "./src/navigation/navigation.component";
import { GraphQLProvider } from "./src/services";
import { initMonitoring, StorageUtils, TrackerUtils } from "./src/utils";
import { manageStorage } from "./src/utils/app.util";
import { scheduleMoodboardNotifications } from "./src/utils/notification.util";

setNotificationHandler();
initLocales();
initMonitoring();

// eslint-disable-next-line @typescript-eslint/naming-convention
const customFonts = { IcoMoon: BaseAssets.IcomoonFont };

const MainAppContainer: FC = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [appCounter, setAppCounter] = useState(-1);
  const [appCounterIsLoaded, setAppCounterIsLoaded] = useState(false);
  const [sendTracker, setSendTracker] = useState(false);
  const [screenCanBeDisplayed, setScreenCanBeDisplayed] = useState(false);
  // Load Custom Fonts (Icomoon)
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const updateAppActiveCounter = async () => {
    const appActiveCounterStr = await StorageUtils.getStringValue(
      StorageKeysConstants.appActiveCounter
    );
    const appActiveCounter = appActiveCounterStr
      ? Number(appActiveCounterStr)
      : 0;
    setAppCounter(appActiveCounter);
    if (await TrackerUtils.needToTrackOpeningApp()) {
      const newAppActiveCounter = appActiveCounter + 1;
      void StorageUtils.storeStringValue(
        StorageKeysConstants.appActiveCounter,
        newAppActiveCounter.toString()
      );
      setAppCounter(newAppActiveCounter);
      setSendTracker(true);
      void StorageUtils.storeStringValue(
        StorageKeysConstants.appOpeningLastDate,
        new Date().toISOString()
      );
    }
    setAppCounterIsLoaded(true);
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === "active") {
      void updateAppActiveCounter();
    }
  };

  useEffect(() => {
    const init = async () => {
      await Font.loadAsync(customFonts)
        .then(() => {
          setFontsLoaded(true);
        })
        .catch((error) => {
          console.log(error);
        });

      await manageStorage();
      await updateAppActiveCounter();
      await scheduleMoodboardNotifications();
    };

    void init();
    // Permet de détecter lorsque l'app change d'état ('active' | 'background' | 'inactive' | 'unknown' | 'extension')
    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoadingComplete && fontsLoaded && appCounterIsLoaded)
      setScreenCanBeDisplayed(true);
  }, [isLoadingComplete, fontsLoaded, appCounterIsLoaded]);

  const renderView = () => {
    const appContainer = (
      <>
        <TrackerAppStart />
        <LinksHandler />
        {sendTracker && (
          <TrackerHandler
            screenName={`${TrackerUtils.TrackingEvent.APP_ACTIVE} - ${appCounter}`}
          />
        )}
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </>
    );
    return <GraphQLProvider appContainer={appContainer} />;
  };

  return screenCanBeDisplayed ? renderView() : null;
};

const App: FC = () => {
  return <TrackerProvider appContainer={<MainAppContainer />} />;
};

export default App;
