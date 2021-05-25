import { Asset } from "expo-asset";
import * as AssetUtils from "expo-asset-utils";

export const getAssetsAsync = async (asset: string): Promise<Asset> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const expoAsset = await Asset.fromModule(asset).downloadAsync();
  return AssetUtils.resolveAsync(expoAsset).then((newAsset: Asset) => newAsset);
};
