import { getDefaultConfig } from "metro-config";

export default (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    resolver: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      assetExts: assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
    },
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
  };
})();
