import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { Subscription } from "@unimodules/core";
import * as Font from "expo-font";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import { MatomoProvider, useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import IcomoonFont from "./assets/icomoon/icomoon.ttf";
import { initLocales } from "./config/calendar-config";
import { StorageKeysConstants } from "./constants";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { StorageUtils, TrackerUtils } from "./utils";
import { initMonitoring, reportError } from "./utils/logging.util";

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
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // Load Custom Fonts (Icomoon)
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { trackAppStart } = useMatomo();
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    trackAppStart();
    Font.loadAsync(customFonts)
      .then(() => {
        setFontsLoaded(true);
      })
      .catch((error) => {
        reportError(error);
      });

    // Notifications
    // Se déclenche lorsque l'on reçoit une notification et que l'app est ouverte
    notificationListener.current =
      Notifications.addNotificationReceivedListener((newNotification) => {
        setNotification(newNotification);
      });
    // Se déclenche lorsque l'on clique sur la notification native
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        setNotification(response.notification);
      });

    return () => {
      if (notificationListener.current)
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );

      if (responseListener.current)
        Notifications.removeNotificationSubscription(responseListener.current);
    };
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
