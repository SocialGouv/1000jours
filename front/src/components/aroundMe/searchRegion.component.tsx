import * as Location from "expo-location";
import type { FC } from "react";
import { useEffect, useState } from "react";
import type { LatLng, Region } from "react-native-maps";

import { AroundMeConstants, Labels } from "../../constants";
import { AroundMeUtils } from "../../utils";

interface Props {
  triggerSearchRegionByLocation: boolean;
  setRegion: (region: Region | undefined) => void;
  setUserLocation: (userLocation: LatLng | undefined) => void;
  showSnackBarWithMessage: (message: string) => void;
  setIsLoading: (value: boolean) => void;
  triggerSearchRegionByPostalCode: boolean;
  postalCodeInput: string;
  setPostalCodeInvalid: (value: boolean) => void;
}

const SearchRegion: FC<Props> = ({
  triggerSearchRegionByLocation,
  setRegion,
  setUserLocation,
  showSnackBarWithMessage,
  setIsLoading,
  triggerSearchRegionByPostalCode,
  postalCodeInput,
  setPostalCodeInvalid,
}) => {
  const [componentIsInitialized, setComponentIsInitialized] = useState(false);

  const searchRegionByLocation = async () => {
    setIsLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED) {
      showSnackBarWithMessage(Labels.aroundMe.pleaseAllowGeolocation);
      setIsLoading(false);
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
        setUserLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        setRegion({
          latitude: currentLocation.coords.latitude,
          latitudeDelta: AroundMeConstants.DEFAULT_DELTA,
          longitude: currentLocation.coords.longitude,
          longitudeDelta: AroundMeConstants.DEFAULT_DELTA,
        });
      } else {
        setUserLocation(undefined);
        setRegion(undefined);
      }
    } catch {
      setUserLocation(undefined);
      setRegion(undefined);
    }

    setIsLoading(false);
  };

  const searchRegionByPostalCode = async () => {
    setIsLoading(true);

    if (postalCodeInput.length !== AroundMeConstants.POSTAL_CODE_MAX_LENGTH) {
      setPostalCodeInvalid(true);
      return;
    }
    const newRegion = await AroundMeUtils.searchRegionByPostalCode(
      postalCodeInput
    );

    if (newRegion) setRegion(newRegion);
    else showSnackBarWithMessage(Labels.aroundMe.postalCodeNotFound);
    setIsLoading(false);
  };

  useEffect(() => {
    setComponentIsInitialized(true);
  }, []);

  useEffect(() => {
    if (componentIsInitialized) void searchRegionByLocation();
  }, [triggerSearchRegionByLocation]);

  useEffect(() => {
    if (componentIsInitialized) void searchRegionByPostalCode();
  }, [triggerSearchRegionByPostalCode]);

  return null;
};

export default SearchRegion;
