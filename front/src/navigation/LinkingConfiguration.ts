import * as Linking from "expo-linking";

export default {
  config: {
    screens: {
      loading: "loading",
      notFound: "*",
      onboarding: "onboarding",
      profile: "profile",
      root: {
        screens: {
          tabAroundMe: {
            screens: {
              tabAroundMeScreen: "around-me",
            },
          },
          tabCalendar: {
            screens: {
              tabCalendarScreen: "calendar",
            },
          },
          tabFavorites: {
            screens: {
              tabFavoritesScreen: "favorites",
            },
          },
          tabHome: {
            screens: {
              tabHomeScreen: "home",
            },
          },
        },
      },
    },
  },
  prefixes: [Linking.makeUrl("/")],
};
