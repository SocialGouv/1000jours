import type { LatLng, Region } from "react-native-maps";

import { AroundMeConstants } from "../constants";

export const searchRegionByPostalCode = async (
  postalCodeInput: string
): Promise<Region | undefined> => {
  const response = await fetch(
    AroundMeConstants.getApiUrlWithParam(postalCodeInput) as RequestInfo
  );
  const json = await response.json();

  let newRegion = undefined;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (json.features[0]?.geometry.coordinates) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const coordinates: string[] = json.features[0].geometry.coordinates;
    newRegion = {
      latitude: Number(coordinates[1]),
      latitudeDelta: AroundMeConstants.DEFAULT_LATITUDE_DELTA,
      longitude: Number(coordinates[0]),
      longitudeDelta: AroundMeConstants.DEFAULT_LONGITUDE_DELTA,
    };
  }

  return newRegion;
};

export const getLatLngPoint = (
  region: Region,
  cornerType: AroundMeConstants.LatLngPointType
): LatLng => {
  const halftLatitude = region.latitudeDelta / 2;
  const halfLongitude = region.longitudeDelta / 2;

  switch (cornerType) {
    case AroundMeConstants.LatLngPointType.center:
      return {
        latitude: region.latitude,
        longitude: region.longitude,
      };
    case AroundMeConstants.LatLngPointType.topLeft:
      return {
        latitude: region.latitude + halftLatitude,
        longitude: region.longitude - halfLongitude,
      };
    case AroundMeConstants.LatLngPointType.bottomRight:
      return {
        latitude: region.latitude - halftLatitude,
        longitude: region.longitude + halfLongitude,
      };
  }
};
