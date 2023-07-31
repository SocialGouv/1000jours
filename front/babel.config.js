module.exports = function (api) {
  /* eslint-disable */
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "@babel/preset-typescript"],
    plugins: [
      "inline-dotenv",
      "@babel/plugin-transform-flow-strip-types",
      "react-native-reanimated/plugin",
      ["@babel/plugin-transform-private-methods", { loose: true }],
    ],
  };
};
