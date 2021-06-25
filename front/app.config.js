export default {
  expo: {
    android: {
      adaptiveIcon: {
        backgroundColor: "#FFFFFF",
        foregroundImage: "./assets/images/adaptive-icon.png",
      },
      config: {
        googleMaps: {
          apiKey: "AIzaSyBh4I3B8R5Qrf2Sj-maDxwrbQXVcHuDlR0",
        },
      },
      package: "com.fabrique.millejours",
      versionCode: 8,
    },
    assetBundlePatterns: ["**/*"],
    hooks: {
      postPublish: [
        {
          config: {
            authToken: process.env.SENTRY_TOKEN,
            organization: "incubateur",
            project: "1000-premiers-jours",
          },
          file: "sentry-expo/upload-sourcemaps",
        },
      ],
    },
    icon: "./assets/images/icon.png",
    ios: {
      buildNumber: "1.0.8",
      bundleIdentifier: "com.fabrique.millejours",
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
    version: "1.0.8",
    web: {
      favicon: "./assets/images/favicon.png",
    },
  },
};
