// /* eslint-disable @typescript-eslint/no-unsafe-return */
// const { getDefaultConfig } = require("@expo/metro-config");

// module.exports = (async () => {
//   const config = await getDefaultConfig(__dirname);
//   const { transformer, resolver } = config;

//   config.transformer = {
//     ...transformer,
//     babelTransformerPath: require.resolve("react-native-svg-transformer"),
//   };

//   config.resolver = {
//     ...resolver,
//     assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
//     sourceExts: [...resolver.sourceExts, "svg", "cjs"],
//   };

//   return config;
// })();

// /* eslint-disable @typescript-eslint/no-unsafe-return */
// const { getDefaultConfig } = require("@expo/metro-config");

// // Récupère la config par défaut Expo
// const config = getDefaultConfig(__dirname);

// // Personnalisation du transformer pour les SVG
// config.transformer.babelTransformerPath = require.resolve(
//   "react-native-svg-transformer"
// );

// // Ajuste les extensions
// config.resolver.assetExts = config.resolver.assetExts.filter(
//   (ext) => ext !== "svg"
// );
// config.resolver.sourceExts.push("svg", "cjs");

// module.exports = config;

/* eslint-disable @typescript-eslint/no-unsafe-return */
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer"
);

defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);
defaultConfig.resolver.sourceExts.push("svg", "cjs");

module.exports = defaultConfig;
