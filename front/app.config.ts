import { ExpoConfig, ConfigContext } from "expo/config";

/* eslint-disable @typescript-eslint/naming-convention */
const APP_VERSION = "1.1.110";
const APP_VERSION_NUM = 110;

// export default ({ config }: ConfigContext): ExpoConfig => ({
// ...config,
export default {
  expo: {
    android: {
      adaptiveIcon: {
        backgroundColor: "#FFFFFF",
        foregroundImage: "./src/assets/images/adaptive-icon.png",
      },
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
      intentFilters: [
        {
          action: "VIEW",
          autoVerify: true,
          category: ["DEFAULT", "BROWSABLE"],
          data: [
            {
              host: process.env.DEEPLINK_DOMAIN,
              pathPrefix: `/${process.env.DEEPLINK_PATH}`,
              scheme: "https",
            },
          ],
        },
      ],
      package: "com.fabrique.millejours",
      permissions: [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "READ_CALENDAR",
        "WRITE_CALENDAR",
        "RECEIVE_BOOT_COMPLETED",
        "SCHEDULE_EXACT_ALARM",
        "VIBRATE",
      ],
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.fabrique.millejours",
    },
    assetBundlePatterns: ["**/*"],
    extra: {
      eas: {
        projectId: "f6ac4fdc-cbef-49b5-9e33-fca51d77281e",
      },
    },
    icon: "./src/assets/images/icon.png",
    ios: {
      appStoreUrl:
        "https://apps.apple.com/us/app/1000-premiers-jours/id1573729958",
      associatedDomains: [`applinks:${process.env.DEEPLINK_DOMAIN}`],
      buildNumber: APP_VERSION,
      bundleIdentifier: "com.fabrique.millejours",
      infoPlist: {
        NSCalendarsUsageDescription:
          "Permet de synchroniser les événements avec le calendrier de votre téléphone",
        NSLocationWhenInUseUsageDescription:
          "Permet de vous positionner précisément sur la carte et de lancer une recherche des POI autour de vous.",
        NSRemindersUsageDescription:
          "Permet à l'application de vous faire des rappels sur les événements",
      },
      supportsTablet: true,
    },
    name: "1000 jours",
    orientation: "portrait",
    owner: "1000.jours",
    plugins: [
      [
        "@sentry/react-native/expo",
        {
          project: "nos-1000-jours",
          organization: "incubateur",
          url: "https://sentry.fabrique.social.gouv.fr",
        },
      ],
      [
        "expo-notifications",
        {
          icon: "./src/assets/images/notification_icon.png",
        },
      ],
      "expo-localization",
      [
        "expo-build-properties",
        {
          android: {
            buildToolsVersion: "35.0.0",
            compileSdkVersion: 35,
            targetSdkVersion: 35,
            // kotlinVersion: "1.7.20",
          },
          ios: {
            deploymentTarget: "16.0",
          },
        },
      ],
      "expo-font",
      "expo-asset",
      [
        "expo-build-properties",
        {
          android: {
            // kotlinVersion: "1.7.20",
          },
        },
      ],
      "expo-web-browser",
      [
        "expo-calendar",
        {
          calendarPermission:
            "Permet de synchroniser les événements avec le calendrier de votre téléphone",
        },
      ],
    ],
    runtimeVersion: {
      policy: "sdkVersion",
    },
    scheme: "millejours",
    slug: "1000jours",
    splash: {
      backgroundColor: "#ffffff",
      image: "./src/assets/images/splash.png",
      resizeMode: "contain",
    },
    userInterfaceStyle: "light",
    version: APP_VERSION,
    // web: {
    //   favicon: "./src/assets/images/favicon.png",
    // },
    doctor: {
      reactNativeDirectoryCheck: {
        exclude: [
          "react-native-indicators",
          "matomo-tracker-react-native",
          "react-native-elements",
          "@apollo/client",
          "@native-html/iframe-plugin",
          "@native-html/table-plugin",
          "@react-native-community/masked-view",
          "@react-native-community/picker",
          "@socialgouv/nos1000jours-lib",
          "expo-asset-utils",
          "graphql",
          "patch",
          "patch-package",
          "postinstall-postinstall",
          "react-native-confetti",
          "react-native-vector-icons",
          "uuid",
        ],
      },
    },
  },
};
