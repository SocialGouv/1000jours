import type { LatLng, Region } from "react-native-maps";

import { AroundMeConstants } from "../constants";

export const getPostalCodeCoords = async (
  postalCodeInput: string
): Promise<LatLng | undefined> => {
  try {
    const response = await fetch(
      AroundMeConstants.getApiUrlWithParam(postalCodeInput) as RequestInfo
    );

    const json = await response.json();

    let newCoords = undefined;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (json.features[0]?.geometry.coordinates) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const coordinates: string[] = json.features[0].geometry.coordinates;
      newCoords = {
        latitude: Number(coordinates[1]),
        longitude: Number(coordinates[0]),
      };
    }

    return newCoords;
  } catch (error: unknown) {
    console.log(error);
    return undefined;
  }
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

export const adaptZoomAccordingToRegion = async (
  lat: number,
  long: number
): Promise<number> => {
  const response = await fetch(
    AroundMeConstants.getApiGouvUrlForPopulation(lat, long) as RequestInfo
  );
  const json = await response.json();
  if (json[0].population) {
    const population = json[0].population;
    if (population > AroundMeConstants.POPULATION_STEP_TWO_MILLION)
      return AroundMeConstants.DELTA_HIGH;
    if (population > AroundMeConstants.POPULATION_STEP_EIGHT_HUNDRED_THOUSAND)
      return AroundMeConstants.DELTA_MIDDLE;
    if (population > AroundMeConstants.POPULATION_STEP_THREE_HUNDRED_THOUSAND)
      return AroundMeConstants.DELTA_LOW;
  }

  return AroundMeConstants.DEFAULT_DELTA;
};
