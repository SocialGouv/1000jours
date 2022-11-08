import * as Location from "expo-location";
import type { FC } from "react";
import { useEffect, useState } from "react";
import type { LatLng } from "react-native-maps";

import { AroundMeConstants } from "../../constants";
import { SearchUtils } from "../../utils";

interface Props {
  triggerGetUserLocation: boolean;
  triggerGetPostalCodeCoords: boolean;
  postalCodeInput: string;
  postalCodeIsInvalid: () => void;
  setCoordinates: (coordinates: LatLng | undefined) => void;
  allowGeolocationMessage: () => void;
}

const SearchUserLocationOrPostalCodeCoords: FC<Props> = ({
  triggerGetUserLocation,
  triggerGetPostalCodeCoords,
  postalCodeInput,
  postalCodeIsInvalid,
  setCoordinates,
  allowGeolocationMessage,
}) => {
  const [componentIsInitialized, setComponentIsInitialized] = useState(false);

  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED) {
      allowGeolocationMessage();
      return;
    }
    try {
      let currentLocation = undefined;
      let locationSuccess = false;
      let getPositionAttempts = 0;
      // Il y a un temps de latence entre le moment où on autorise la géolocalisation
      // et le moment où le getCurrentPositionAsync() retourne une localication
      // donc tant qu'il ne retourne rien, on le rappelle
      while (!locationSuccess) {
        try {
          currentLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Lowest,
          });
          locationSuccess = true;
        } catch (ex: unknown) {
          getPositionAttempts = getPositionAttempts + 1;
          if (
            // Si l'exception remontée n'est pas une erreur de service non-disponible
            // Ou si le nombre de tentatives a été dépassé, on arrête les rappels
            !JSON.stringify(ex).includes(
              AroundMeConstants.ERROR_LOCATION_PROVIDER_UNAVAILABLE_MESSAGE
            ) ||
            getPositionAttempts > AroundMeConstants.GET_POSITION_MAX_ATTEMPTS
          ) {
            locationSuccess = true;
          }
        }
      }
      if (currentLocation) {
        const locationLatLng = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        };
        setCoordinates(locationLatLng);
      } else {
        setCoordinates(undefined);
      }
    } catch {
      setCoordinates(undefined);
    }
  };

  useEffect(() => {
    setComponentIsInitialized(true);
  }, []);

  useEffect(() => {
    if (componentIsInitialized) void getUserLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerGetUserLocation]);

  useEffect(() => {
    if (componentIsInitialized) {
      void SearchUtils.searchRegionByPostalCode(
        postalCodeInput,
        postalCodeIsInvalid
      ).then((coordinates) => {
        setCoordinates(coordinates);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerGetPostalCodeCoords]);

  return null;
};

export default SearchUserLocationOrPostalCodeCoords;
