/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import { useEffect, useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import type { LatLng, Region } from "react-native-maps";
import { HelperText } from "react-native-paper";

import { AroundMeConstants, Labels } from "../../constants";
import {
  PLATFORM_IS_IOS,
  SCREEN_WIDTH,
} from "../../constants/platform.constants";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
  Paddings,
  Sizes,
} from "../../styles";
import { AroundMeUtils, KeyboardUtils } from "../../utils";
import { CustomButton, View } from "../baseComponents";
import SearchUserLocationOrPostalCodeCoords from "./searchUserLocationOrPostalCodeCoords.component";

interface Props {
  postalCodeInput: string;
  setPostalCodeInput: (value: string) => void;
  postalCodeInvalid: boolean;
  setPostalCodeInvalid: (value: boolean) => void;
  hideSnackBar: () => void;
  setAndGoToNewRegion: (region: Region) => void;
  showSnackBarWithMessage: (message: string) => void;
  setIsLoading: (value: boolean) => void;
  updateUserLocation: (region: Region | undefined) => void;
}

const SearchUserLocationOrPostalCodeRegion: React.FC<Props> = ({
  postalCodeInput,
  setPostalCodeInput,
  postalCodeInvalid,
  setPostalCodeInvalid,
  hideSnackBar,
  setAndGoToNewRegion,
  showSnackBarWithMessage,
  setIsLoading,
  updateUserLocation,
}) => {
  const [searchIsByPostalCode, setSearchIsByPostalCode] = useState(false);
  const [triggerCheckLocation, setTriggerCheckLocation] = useState(false);
  const [triggerSearchByPostalCode, setTriggerSearchByPostalCode] =
    useState(false);
  const [showAllowGeolocSnackBar, setShowAllowGeolocSnackBar] = useState(false);

  useEffect(() => {
    checkLocation(false);
  }, []);

  const checkLocation = (showAllowGeolocSB: boolean) => {
    setShowAllowGeolocSnackBar(showAllowGeolocSB);
    setSearchIsByPostalCode(false);
    setIsLoading(true);
    setTriggerCheckLocation(!triggerCheckLocation);
  };

  const onPostalCodeChanged = (newPostalCode: string) => {
    setPostalCodeInput(newPostalCode);
    setPostalCodeInvalid(false);
  };

  const geolocationIcon = require("../../assets/images/carto/geolocation.png");

  const onSearchByPostalCodeButtonClick = () => {
    setIsLoading(true);
    KeyboardUtils.dismissKeyboard();
    hideSnackBar();
    searchByPostalCode();
  };

  const searchByPostalCode = () => {
    setSearchIsByPostalCode(true);
    setIsLoading(true);
    setTriggerSearchByPostalCode(!triggerSearchByPostalCode);
  };

  const handleGetCoordinates = async (newCoordinates: LatLng | undefined) => {
    setIsLoading(false);
    if (newCoordinates) {
      const newDelta = await AroundMeUtils.adaptZoomAccordingToRegion(
        newCoordinates.latitude,
        newCoordinates.longitude
      );
      const newRegion = {
        latitude: newCoordinates.latitude,
        latitudeDelta: newDelta,
        longitude: newCoordinates.longitude,
        longitudeDelta: newDelta,
      };
      if (searchIsByPostalCode) setAndGoToNewRegion(newRegion);
      else updateUserLocation(newRegion);
    } else
      showSnackBarWithMessage(
        searchIsByPostalCode
          ? Labels.aroundMe.postalCodeNotFound
          : Labels.aroundMe.geolocationRetrievingError
      );
  };

  return (
    <View>
      <SearchUserLocationOrPostalCodeCoords
        triggerGetUserLocation={triggerCheckLocation}
        triggerGetPostalCodeCoords={triggerSearchByPostalCode}
        postalCodeInput={postalCodeInput}
        setPostalCodeInvalid={setPostalCodeInvalid}
        setCoordinates={handleGetCoordinates}
        allowGeolocationMessage={() => {
          setIsLoading(false);
          if (showAllowGeolocSnackBar)
            showSnackBarWithMessage(Labels.aroundMe.pleaseAllowGeolocation);
        }}
      />
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
        <CustomButton
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
              checkLocation(true);
              // void checkLocation(true);
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
  fontButtonIos15: {
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.bold),
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

export default SearchUserLocationOrPostalCodeRegion;
