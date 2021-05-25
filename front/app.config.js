export default {
  expo: {
    name: "1000jours",
    slug: "1000jours",
    version: "1.0.4",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.millejours.fabrique",
      buildNumber: "1.0.4",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      package: "com.millejours.fabrique",
      versionCode: 4,
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",
          config: {
            organization: "incubateur",
            project: "nos-1000-jours",
            authToken: process.env.SENTRY_TOKEN,
          },
        },
      ],
    },
  },
};
