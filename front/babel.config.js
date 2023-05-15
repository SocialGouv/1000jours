module.exports = function (api) {
  /* eslint-disable */
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "@babel/preset-typescript"],
    plugins: [
      "inline-dotenv",
      "react-native-reanimated/plugin",
      "@babel/plugin-proposal-private-methods",
      { loose: true },
    ],
  };
};
