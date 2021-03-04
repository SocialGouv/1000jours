import * as Linking from "expo-linking";

export default {
  config: {
    screens: {
      notFound: "*",
      root: {
        screens: {
          tabOne: {
            screens: {
              tabOneScreen: "one",
            },
          },
          tabTwo: {
            screens: {
              tabTwoScreen: "two",
            },
          },
        },
      },
    },
  },
  prefixes: [Linking.makeUrl("/")],
};
