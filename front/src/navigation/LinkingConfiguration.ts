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
          tabEpds: {
            screens: {
              tabEpdsScreen: "epds",
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
