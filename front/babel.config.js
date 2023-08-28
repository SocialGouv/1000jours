module.exports = function (api) {
  /* eslint-disable */
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "@babel/preset-typescript"],
    plugins: [
      "inline-dotenv",
      "@babel/plugin-transform-flow-strip-types",
      ["@babel/plugin-transform-private-methods", { loose: true }],
      "react-native-reanimated/plugin", // react-native-reanimated/plugin has to be listed last.
    ],
  };
};
