import type { Region } from "react-native-maps";

import { AroundMeConstants } from "../constants";

export interface NewRegionData {
  regionIsFetched: boolean;
  newRegion?: Region;
}

export const searchRegionByPostalCode = async (
  postalCodeInput: string
): Promise<NewRegionData> => {
  const response = await fetch(
    AroundMeConstants.getApiUrlWithParam(postalCodeInput) as RequestInfo
  );
  const json = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (json.features[0]?.geometry.coordinates) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const coordinates: string[] = json.features[0].geometry.coordinates;
    const newRegion = {
      latitude: Number(coordinates[1]) - AroundMeConstants.LATITUDE_OFFSET,
      latitudeDelta: AroundMeConstants.DEFAULT_LATITUDE_DELTA,
      longitude: Number(coordinates[0]),
      longitudeDelta: AroundMeConstants.DEFAULT_LONGITUDE_DELTA,
    };

    return { newRegion, regionIsFetched: true };
  } else {
    return { regionIsFetched: false };
  }
};
