/* eslint-disable @typescript-eslint/no-unsafe-return */
const { getDefaultConfig } = require("expo/metro-config");
const { mergeConfig } = require("metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const baseConfig = getDefaultConfig(__dirname);

const customConfig = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: baseConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...baseConfig.resolver.sourceExts, "svg", "cjs"],
  },
};

module.exports = mergeConfig(baseConfig, customConfig);
