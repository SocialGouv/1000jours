/* eslint-disable @typescript-eslint/naming-convention */
const APP_VERSION = "1.1.77";
const APP_VERSION_NUM = 77;

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
      versionCode: APP_VERSION_NUM,
    },
    assetBundlePatterns: ["**/*"],
    extra: {
      eas: {
        projectId: "f6ac4fdc-cbef-49b5-9e33-fca51d77281e",
      },
    },
    hooks: {
      postPublish: [
        {
          config: {
            authToken: process.env.SENTRY_TOKEN,
            organization: "incubateur",
            project: "nos-1000-jours",
            url: "https://sentry.fabrique.social.gouv.fr",
          },
          file: "sentry-expo/upload-sourcemaps",
        },
      ],
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
    plugins: [
      "sentry-expo",
      [
        "expo-notifications",
        {
          icon: "./src/assets/images/notification_icon.png",
        },
      ],
    ],
    scheme: "millejours",
    slug: "1000jours",
    splash: {
      backgroundColor: "#ffffff",
      image: "./src/assets/images/splash.png",
      resizeMode: "contain",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    userInterfaceStyle: "light",
    version: APP_VERSION,
    web: {
      favicon: "./src/assets/images/favicon.png",
    },
  },
};
