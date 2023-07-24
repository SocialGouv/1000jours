module.exports = function (api) {
  /* eslint-disable */
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "@babel/preset-typescript"],
    plugins: [
      "inline-dotenv",
      "react-native-reanimated/plugin",
      ["@babel/plugin-transform-private-methods", { loose: true }],
    ],
  };
};
