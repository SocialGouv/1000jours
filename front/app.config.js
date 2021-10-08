/* eslint-disable @typescript-eslint/naming-convention */
export default {
  expo: {
    android: {
      adaptiveIcon: {
        backgroundColor: "#FFFFFF",
        foregroundImage: "./assets/images/adaptive-icon.png",
      },
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
      package: "com.fabrique.millejours",
      permissions: [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "READ_CALENDAR",
        "WRITE_CALENDAR",
      ],
      versionCode: 29,
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
    icon: "./assets/images/icon.png",
    ios: {
      buildNumber: "1.0.29",
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
    scheme: "myapp",
    slug: "1000jours",
    splash: {
      backgroundColor: "#ffffff",
      image: "./assets/images/splash.png",
      resizeMode: "contain",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    userInterfaceStyle: "light",
    version: "1.0.29",
    web: {
      favicon: "./assets/images/favicon.png",
    },
  },
};
