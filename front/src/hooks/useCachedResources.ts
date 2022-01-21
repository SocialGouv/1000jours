import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

const useCachedResources = (): boolean => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        void SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          /* eslint-disable */
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
          "comfortaa-bold": require("../assets/fonts/Comfortaa-Bold.ttf"),
          "comfortaa-light": require("../assets/fonts/Comfortaa-Light.ttf"),
          "comfortaa-medium": require("../assets/fonts/Comfortaa-Medium.ttf"),
          "comfortaa-regular": require("../assets/fonts/Comfortaa-Regular.ttf"),
          "comfortaa-semibold": require("../assets/fonts/Comfortaa-SemiBold.ttf"),
          "avenir-black": require("../assets/fonts/Avenir-Black.ttf"),
          "avenir-bold": require("../assets/fonts/Avenir-Heavy.ttf"),
          "avenir-light": require("../assets/fonts/Avenir-Light.ttf"),
          "avenir-medium": require("../assets/fonts/Avenir-Medium.ttf"),
          "avenir-regular": require("../assets/fonts/Avenir-Roman.ttf"),
          "avenir-italic": require("../assets/fonts/Avenir-Italic.ttf"),
        });
      } catch (error: unknown) {
        // We might want to provide this error information to an error reporting service
        console.warn(error);
      } finally {
        setLoadingComplete(true);
        void SplashScreen.hideAsync();
      }
    }

    void loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
};

export default useCachedResources;
