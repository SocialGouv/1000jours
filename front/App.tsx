import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { Subscription } from "@unimodules/core";
import * as Font from "expo-font";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import { MatomoProvider, useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import type { AppStateStatus } from "react-native";
import { AppState } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import IcomoonFont from "./assets/icomoon/icomoon.ttf";
import { initLocales } from "./config/calendar-config";
import { Labels, StorageKeysConstants } from "./constants";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { StorageUtils, TrackerUtils } from "./utils";
import { initMonitoring } from "./utils/logging.util";
import { registerForPushNotificationsAsync } from "./utils/notification.util";

Notifications.setNotificationHandler({
  // eslint-disable-next-line @typescript-eslint/require-await
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowAlert: false,
  }),
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  headers: { "content-type": "application/json" },
  uri: `${process.env.API_URL}/graphql`,
});

initLocales();
initMonitoring();

// eslint-disable-next-line @typescript-eslint/naming-convention
const customFonts = { IcoMoon: IcomoonFont };

const App: FC = () => {
  const { trackScreenView } = useMatomo();
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // Load Custom Fonts (Icomoon)
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { trackAppStart } = useMatomo();
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

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
    trackScreenView(
      `${TrackerUtils.TrackingEvent.APP_ACTIVE} - ${newAppActiveCounter}`
    );
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === "active") {
      void updateAppActiveCounter();
    }
  };

  useEffect(() => {
    trackAppStart();
    Font.loadAsync(customFonts)
      .then(() => {
        setFontsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });

    // Permet de détecter lorsque l'app change d'état ('active' | 'background' | 'inactive' | 'unknown' | 'extension')
    AppState.addEventListener("change", handleAppStateChange);

    // Notifications
    void registerForPushNotificationsAsync();
    // Se déclenche lorsque l'on reçoit une notification et que l'app est ouverte
    notificationListener.current =
      Notifications.addNotificationReceivedListener((newNotification) => {
        setNotification(newNotification);
      });
    // Se déclenche lorsque l'on clique sur la notification native
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const notificationType =
          response.notification.request.content.data.type ?? "";
        trackScreenView(
          `${TrackerUtils.TrackingEvent.NOTIFICATION} (${notificationType}) - ${Labels.notification.openTheApp}`
        );
        setNotification(response.notification);
      });

    return () => {
      AppState.removeEventListener("change", handleAppStateChange);

      if (notificationListener.current)
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );

      if (responseListener.current)
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (process.env.CLEAR_STORAGE === "true")
    void StorageUtils.multiRemove(StorageKeysConstants.allStorageKeys);

  if (!fontsLoaded || !isLoadingComplete) {
    return null;
  } else {
    return (
      <MatomoProvider instance={TrackerUtils.matomoInstance}>
        <ApolloProvider client={client}>
          <SafeAreaProvider>
            <Navigation
              colorScheme={colorScheme}
              notification={notification}
              setNotification={setNotification}
            />
            <StatusBar />
          </SafeAreaProvider>
        </ApolloProvider>
      </MatomoProvider>
    );
  }
};

export default App;
