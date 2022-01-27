import * as Location from "expo-location";
import type { FC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import type { Region } from "react-native-maps";

import { AroundMeConstants, Labels } from "../../constants";
import { AroundMeUtils } from "../../utils";
import SharedCartoData from "../../utils/sharedCartoData.class";

interface Props {
  triggerSearchRegionByLocation: boolean;
  setRegion: (region: Region | undefined) => void;
  showSnackBarWithMessage: (message: string) => void;
  setIsLoading: (value: boolean) => void;
  triggerSearchRegionByPostalCode: boolean;
  postalCodeInput: string;
  setPostalCodeInvalid: (value: boolean) => void;
}

const SearchRegion: FC<Props> = ({
  triggerSearchRegionByLocation,
  setRegion,
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
      // setSearchIsReady(true); // Si on refuse la géoloc, on peut toujours lancer une recherche (manuelle ou via CP)
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
        SharedCartoData.userLocation = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        };

        setRegion({
          latitude: currentLocation.coords.latitude,
          latitudeDelta: AroundMeConstants.DEFAULT_DELTA,
          longitude: currentLocation.coords.longitude,
          longitudeDelta: AroundMeConstants.DEFAULT_DELTA,
        });
      } else setRegion(undefined);
    } catch {
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
