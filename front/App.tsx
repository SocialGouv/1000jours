import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import type { AppStateStatus } from "react-native";
import { AppState } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { CheckAppVersion, StoreCurrentStepArticleIds } from "./src/components";
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
import type { TrackerEvent } from "./src/type";
import {
  AppUtils,
  initMonitoring,
  NotificationUtils,
  StorageUtils,
  TrackerUtils,
} from "./src/utils";

setNotificationHandler();
initLocales();
initMonitoring();

// eslint-disable-next-line @typescript-eslint/naming-convention
const customFonts = { IcoMoon: BaseAssets.IcomoonFont };

export enum AppStatus {
  active = "active",
  inactive = "inactive",
  background = "background",
  unknown = "unknown",
  extension = "extension",
}

const MainAppContainer: FC = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [appCounter, setAppCounter] = useState(-1);
  const [appCounterIsLoaded, setAppCounterIsLoaded] = useState(false);
  const [sendTracker, setSendTracker] = useState(false);
  const [screenCanBeDisplayed, setScreenCanBeDisplayed] = useState(false);
  const [storeCurrentStepArticleIds, setStoreCurrentStepArticleIds] =
    useState(false);
  const [checkAppVersion, setCheckAppVersion] = useState(true);
  const [trackerEventObject, setTrackerEventObject] = useState<TrackerEvent>();

  const updateAppActiveCounter = async () => {
    const appActiveCounterStr = await StorageUtils.getStringValue(
      StorageKeysConstants.appActiveCounter
    );
    let appActiveCounter = appActiveCounterStr
      ? Number(appActiveCounterStr)
      : 0;
    if (await TrackerUtils.shouldTrackAppOpening()) {
      appActiveCounter++;
      await StorageUtils.storeStringValue(
        StorageKeysConstants.appActiveCounter,
        appActiveCounter.toString()
      );
      setSendTracker(true);
      await StorageUtils.storeStringValue(
        StorageKeysConstants.appOpeningLastDate,
        new Date().toISOString()
      );
    }
    setAppCounter(appActiveCounter);
    setAppCounterIsLoaded(true);
    return appActiveCounter;
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === AppStatus.active) {
      setStoreCurrentStepArticleIds(true);
      setCheckAppVersion(true);
      void updateAppActiveCounter();
      void checkNotificationPermission();
    }
    if (nextAppState === AppStatus.inactive) {
      setCheckAppVersion(false);
    }
  };

  const checkNotificationPermission = async () => {
    const notificationsAreAllowed =
      await NotificationUtils.allowsNotifications();
    const notificationsAreAllowedFromStorage =
      await StorageUtils.getObjectValue(
        StorageKeysConstants.notificationsAreAllowed
      );
    if (
      !notificationsAreAllowed &&
      notificationsAreAllowedFromStorage !== false
    ) {
      setTrackerEventObject({
        action: TrackerUtils.TrackingEvent.SETTINGS,
        name: TrackerUtils.TrackingEvent.NOTIFICATIONS_DISABLED,
      });
    }
    await StorageUtils.storeObjectValue(
      StorageKeysConstants.notificationsAreAllowed,
      notificationsAreAllowed
    );
  };

  useEffect(() => {
    const init = async () => {
      await AppUtils.manageStorage();
      // Pour éviter un autre useEffect on utilise la valeur retournée,
      // car à ce moment là `appCounter` n'est pas encore à jour.
      const appActiveCounter = await updateAppActiveCounter();
      await NotificationUtils.scheduleMoodboardNotifications();
      await AppUtils.handleInAppReviewPopup(appActiveCounter);
    };
    void init();
    // Permet de détecter lorsque l'app change d'état ('active' | 'background' | 'inactive' | 'unknown' | 'extension')
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoadingComplete && appCounterIsLoaded) {
      setScreenCanBeDisplayed(true);
    }
  }, [isLoadingComplete, appCounterIsLoaded]);

  const renderView = () => {
    const appContainer = (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TrackerAppStart />
        <TrackerHandler eventObject={trackerEventObject} />
        <LinksHandler />
        {sendTracker && (
          <TrackerHandler
            screenName={`${TrackerUtils.TrackingEvent.APP_ACTIVE} - ${appCounter}`}
          />
        )}
        {storeCurrentStepArticleIds && <StoreCurrentStepArticleIds />}
        {checkAppVersion && <CheckAppVersion />}
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
    return <GraphQLProvider appContainer={appContainer} />;
  };

  return screenCanBeDisplayed ? renderView() : null;
};

const App: FC = () => {
  return <TrackerProvider appContainer={<MainAppContainer />} />;
};

export default App;
