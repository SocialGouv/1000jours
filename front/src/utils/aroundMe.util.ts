import type { LatLng, Region } from "react-native-maps";

import { AroundMeConstants } from "../constants";
import { PLATFORM_IS_IOS } from "../constants/platform.constants";

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

export const adaptZoomAccordingToCoordinates = async (
  lat: number,
  long: number
): Promise<number> => {
  const response = await fetch(
    AroundMeConstants.getApiGouvUrlForPopulation(lat, long) as RequestInfo
  );
  const json = await response.json();
  if (json?.[0]?.population) {
    const population = json[0].population;
    if (population > AroundMeConstants.POPULATION_STEP_TWO_MILLION)
      return PLATFORM_IS_IOS
        ? AroundMeConstants.ALTITUDE_HIGH
        : AroundMeConstants.ZOOM_HIGH;
    if (population > AroundMeConstants.POPULATION_STEP_EIGHT_HUNDRED_THOUSAND)
      return PLATFORM_IS_IOS
        ? AroundMeConstants.ALTITUDE_MIDDLE
        : AroundMeConstants.ZOOM_MIDDLE;
    if (population > AroundMeConstants.POPULATION_STEP_THREE_HUNDRED_THOUSAND)
      return PLATFORM_IS_IOS
        ? AroundMeConstants.ALTITUDE_LOW
        : AroundMeConstants.ZOOM_LOW;
  }

  return PLATFORM_IS_IOS
    ? AroundMeConstants.ALTITUDE_DEFAULT
    : AroundMeConstants.ZOOM_DEFAULT;
};

/* Sur la carto sur iOS, certains triggers avant même que la carte soit à jour, on se retrouve
  donc avec des comportements innatendus (des mauvaises adresses qui ne s'affichent pas sur la bonne zone
  ou la mapView qui se met mal à jour), il faut donc déclencher ces triggers avec un petit timeout */
export const triggerFunctionAfterTimeout = (
  functionToTrigger: () => void
): void => {
  setTimeout(
    () => {
      functionToTrigger();
    },
    PLATFORM_IS_IOS ? 1000 : 500
  );
};
