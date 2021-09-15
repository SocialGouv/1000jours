/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as Location from "expo-location";
import * as React from "react";
import { useEffect } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import type { LatLng, Region } from "react-native-maps";
import { HelperText } from "react-native-paper";

import { Button } from "../../components";
import { View } from "../../components/Themed";
import {
  AroundMeConstants,
  Colors,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../constants";
import {
  PLATFORM_IS_IOS,
  SCREEN_WIDTH,
} from "../../constants/platform.constants";
import { AroundMeUtils, KeyboardUtils } from "../../utils";

interface Props {
  postalCodeInput: string;
  setPostalCodeInput: (value: string) => void;
  postalCodeInvalid: boolean;
  setPostalCodeInvalid: (value: boolean) => void;
  hideSnackBar: () => void;
  setAndGoToNewRegion: (region: Region) => void;
  showSnackBarWithMessage: (message: string) => void;
  setIsLoading: (value: boolean) => void;
  updateUserLocation: (coordinates: LatLng | undefined) => void;
  setSearchIsReady: (value: boolean) => void;
  setLocationPermissionIsGranted: (value: boolean) => void;
}

const SearchByPostalCode: React.FC<Props> = ({
  postalCodeInput,
  setPostalCodeInput,
  postalCodeInvalid,
  setPostalCodeInvalid,
  hideSnackBar,
  setAndGoToNewRegion,
  showSnackBarWithMessage,
  setIsLoading,
  updateUserLocation,
  setSearchIsReady,
  setLocationPermissionIsGranted,
}) => {
  useEffect(() => {
    setSearchIsReady(false);
    void checkLocation();
  }, []);

  const checkLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED) {
      showSnackBarWithMessage(Labels.aroundMe.pleaseAllowGeolocation);
      setIsLoading(false);
      return;
    }

    setLocationPermissionIsGranted(true);
    setIsLoading(true);
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
          // eslint-disable-next-line no-empty
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
      updateUserLocation(currentLocation ? currentLocation.coords : undefined);
    } catch {
      updateUserLocation(undefined);
    }

    setIsLoading(false);
    setSearchIsReady(true);
  };

  const onPostalCodeChanged = (newPostalCode: string) => {
    setPostalCodeInput(newPostalCode);
    setPostalCodeInvalid(false);
  };

  const geolocationIcon = require("../../assets/images/carto/geolocation.png");

  const onSearchByPostalCodeButtonClick = async () => {
    setIsLoading(true);
    KeyboardUtils.dismissKeyboard();
    hideSnackBar();
    await searchByPostalCodeAndGoToNewRegion();
  };

  const searchByPostalCodeAndGoToNewRegion = async () => {
    if (postalCodeInput.length !== AroundMeConstants.POSTAL_CODE_MAX_LENGTH) {
      setPostalCodeInvalid(true);
      setIsLoading(false);
      return;
    }
    const newRegion = await AroundMeUtils.searchRegionByPostalCode(
      postalCodeInput
    );

    if (newRegion) {
      setAndGoToNewRegion(newRegion);
    } else {
      showSnackBarWithMessage(Labels.aroundMe.postalCodeNotFound);
    }
    setIsLoading(false);
  };

  return (
    <View>
      <View style={styles.postalCodeRow}>
        <TextInput
          style={[
            styles.postalCodeInput,
            PLATFORM_IS_IOS && styles.widthForIos,
          ]}
          onChangeText={onPostalCodeChanged}
          value={postalCodeInput}
          placeholder={Labels.aroundMe.postalCodeInputPlaceholder}
          keyboardType="number-pad"
          maxLength={AroundMeConstants.POSTAL_CODE_MAX_LENGTH}
        />
        <Button
          buttonStyle={styles.searchByPostalCodeButton}
          title={Labels.aroundMe.searchButton}
          titleStyle={styles.fontButton}
          rounded={true}
          disabled={postalCodeInvalid}
          action={onSearchByPostalCodeButtonClick}
        />
        <View style={styles.geolicationIconView}>
          <TouchableOpacity
            onPress={() => {
              void checkLocation();
            }}
          >
            <Image
              source={geolocationIcon}
              style={styles.geolicationIconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
      {postalCodeInvalid && (
        <HelperText type="error">
          {Labels.aroundMe.postalCodeInvalid}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fontButton: {
    fontSize: Sizes.xxs,
  },
  geolicationIconStyle: {
    height: Margins.largest,
    width: Margins.largest,
  },
  geolicationIconView: {
    alignSelf: "center",
    backgroundColor: "transparent",
    marginHorizontal: Margins.default,
    position: "absolute",
    right: 0,
  },
  postalCodeInput: {
    backgroundColor: Colors.cardGrey,
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    paddingHorizontal: Paddings.smaller,
  },
  postalCodeRow: {
    flexDirection: "row",
    paddingLeft: Margins.default,
    paddingVertical: Paddings.smaller,
  },
  searchByPostalCodeButton: {
    marginHorizontal: Margins.smaller,
  },
  widthForIos: {
    width: SCREEN_WIDTH / 2.2,
  },
});

export default SearchByPostalCode;
