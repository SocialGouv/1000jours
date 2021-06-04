export default {
  expo: {
    android: {
      adaptiveIcon: {
        backgroundColor: "#FFFFFF",
        foregroundImage: "./assets/images/adaptive-icon.png",
      },
      package: "com.millejours.fabrique",
      versionCode: 5,
    },
    assetBundlePatterns: ["**/*"],
    hooks: {
      postPublish: [
        {
          config: {
            authToken: process.env.SENTRY_TOKEN,
            organization: "incubateur",
            project: "nos-1000-jours",
          },
          file: "sentry-expo/upload-sourcemaps",
        },
      ],
    },
    icon: "./assets/images/icon.png",
    ios: {
      buildNumber: "1.0.5",
      bundleIdentifier: "com.millejours.fabrique",
      supportsTablet: true,
    },
    name: "1000jours",
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
    version: "1.0.5",
    web: {
      favicon: "./assets/images/favicon.png",
    },
  },
};
