/* eslint-disable @typescript-eslint/naming-convention */
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
      ],
      versionCode: 39,
    },
    assetBundlePatterns: ["**/*"],
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
      associatedDomains: [`applinks:${process.env.DEEPLINK_DOMAIN}`],
      buildNumber: "1.1.39",
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
    version: "1.1.39",
    web: {
      favicon: "./src/assets/images/favicon.png",
    },
  },
};
