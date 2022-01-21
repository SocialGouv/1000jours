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
          tabSearch: {
            screens: {
              tabSearchScreen: "search",
            },
          },
        },
      },
    },
  },
  prefixes: [Linking.makeUrl("/")],
};
