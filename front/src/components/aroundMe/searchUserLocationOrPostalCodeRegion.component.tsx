/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import { useEffect, useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import type { LatLng } from "react-native-maps";
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
import { KeyboardUtils } from "../../utils";
import { CustomButton, View } from "../baseComponents";
import SearchUserLocationOrPostalCodeCoords from "./searchUserLocationOrPostalCodeCoords.component";

interface Props {
  setCoordinatesAndUserLocation: (
    coordinates: LatLng,
    displayUL: boolean
  ) => void;
  hideSnackBar: () => void;
  showSnackBarWithMessage: (message: string) => void;
  setIsLoading: (value: boolean) => void;
}

const SearchUserLocationOrPostalCodeRegion: React.FC<Props> = ({
  setCoordinatesAndUserLocation,
  hideSnackBar,
  showSnackBarWithMessage,
  setIsLoading,
}) => {
  const [postalCodeInput, setPostalCodeInput] = useState("");
  const [postalCodeInvalid, setPostalCodeInvalid] = useState(false);
  const [searchIsByPostalCode, setSearchIsByPostalCode] = useState(false);
  const [triggerCheckLocation, setTriggerCheckLocation] = useState(false);
  const [triggerSearchByPostalCode, setTriggerSearchByPostalCode] =
    useState(false);
  const [showAllowGeolocSnackBar, setShowAllowGeolocSnackBar] = useState(false);

  const geolocationIcon = require("../../assets/images/carto/geolocation.png");

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

  const handleGetCoordinates = (newCoordinates: LatLng | undefined) => {
    setIsLoading(false);
    if (newCoordinates) {
      setCoordinatesAndUserLocation(newCoordinates, !searchIsByPostalCode);
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
