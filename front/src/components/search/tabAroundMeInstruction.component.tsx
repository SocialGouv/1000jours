/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { FC } from "react";
import { useCallback, useState } from "react";
import * as React from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import type { LatLng } from "react-native-maps";
import { HelperText } from "react-native-paper";

import { AroundMeConstants, Labels } from "../../constants";
import {
  PLATFORM_IS_IOS,
  SCREEN_WIDTH,
} from "../../constants/platform.constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type { Article } from "../../types";
import { AroundMeUtils, RootNavigation, SearchUtils } from "../../utils";
import SearchUserLocationOrPostalCodeCoords from "../aroundMe/searchUserLocationOrPostalCodeCoords.component";
import {
  CustomButton,
  CustomSnackbar,
  MapLoader,
  SecondaryText,
  View,
} from "../baseComponents";

interface Props {
  articles: Article[];
}
const TabAroundMeInstruction: FC<Props> = ({ articles }) => {
  const [postalCodeInput, setPostalCodeInput] = useState("");
  const [postalCodeInvalid, setPostalCodeInvalid] = useState(false);
  const [searchIsByPostalCode, setSearchIsByPostalCode] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [triggerCheckLocation, setTriggerCheckLocation] = useState(false);
  const [triggerSearchByPostalCode, setTriggerSearchByPostalCode] =
    useState(false);

  const geolocationIcon = require("../../assets/images/carto/geolocation.png");

  const showSnackBarWithMessage = (message: string) => {
    setSnackBarMessage(message);
    setShowSnackBar(true);
  };

  const onPostalCodeChanged = useCallback((newPostalCode: string) => {
    setPostalCodeInput(newPostalCode);
    setPostalCodeInvalid(false);
  }, []);

  const checkLocation = useCallback(() => {
    setSearchIsByPostalCode(false);
    setIsLoading(true);
    setTriggerCheckLocation(!triggerCheckLocation);
  }, [triggerCheckLocation]);

  const searchByPostalCode = useCallback(() => {
    setSearchIsByPostalCode(true);
    setIsLoading(true);
    setTriggerSearchByPostalCode(!triggerSearchByPostalCode);
  }, [triggerSearchByPostalCode]);

  const goToAroundMeMapAndListScreen = useCallback(
    (coordinates: LatLng, zoomOrAltitude: number) => {
      setIsLoading(false);
      void RootNavigation.navigate("aroundMeMapAndList", {
        coordinates,
        displayUserLocation: !searchIsByPostalCode,
        zoomOrAltitude,
      });
    },
    [searchIsByPostalCode]
  );

  const onPostalCodeInvalid = useCallback(() => {
    setPostalCodeInvalid(true);
    setIsLoading(false);
  }, []);

  const handleGetCoordinates = useCallback(
    async (newCoordinates: LatLng | undefined) => {
      /* Si, à partir d'aroundMeMapAndList, on revient sur la Recherche, le filtre doit être remis à jour  */
      SearchUtils.extractedPoiTypesFromArticles(articles);

      if (PLATFORM_IS_IOS) setIsLoading(false);
      if (newCoordinates) {
        const zoomOrAltitude =
          await AroundMeUtils.adaptZoomAccordingToCoordinates(
            newCoordinates.latitude,
            newCoordinates.longitude
          );
        goToAroundMeMapAndListScreen(newCoordinates, zoomOrAltitude);
      } else
        showSnackBarWithMessage(
          searchIsByPostalCode
            ? Labels.aroundMe.postalCodeNotFound
            : Labels.aroundMe.geolocationRetrievingError
        );
    },
    [articles, goToAroundMeMapAndListScreen, searchIsByPostalCode]
  );

  const onAllowGeolocMessage = useCallback(() => {
    setIsLoading(false);
    showSnackBarWithMessage(Labels.aroundMe.pleaseAllowGeolocation);
  }, []);
  const onSnackBarDismiss = useCallback(() => {
    setShowSnackBar(false);
  }, []);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.paddingDefault}>
        <SearchUserLocationOrPostalCodeCoords
          triggerGetUserLocation={triggerCheckLocation}
          triggerGetPostalCodeCoords={triggerSearchByPostalCode}
          postalCodeInput={postalCodeInput}
          postalCodeIsInvalid={onPostalCodeInvalid}
          setCoordinates={handleGetCoordinates}
          allowGeolocationMessage={onAllowGeolocMessage}
        />
        <SecondaryText style={styles.description}>
          {Labels.aroundMe.searchGeolocInstruction}
        </SecondaryText>
        <View style={styles.geolocationRow}>
          <TouchableOpacity
            onPress={checkLocation}
            style={styles.geolicationTouchableStyle}
          >
            <Image
              source={geolocationIcon}
              style={styles.geolicationIconStyle}
            />
          </TouchableOpacity>
          <CustomButton
            buttonStyle={styles.geolicationButtonStyle}
            title={Labels.aroundMe.useMyGeolocation}
            titleStyle={styles.fontButton}
            rounded={true}
            action={checkLocation}
          />
        </View>
        <SecondaryText style={styles.description}>
          {Labels.aroundMe.searchPostalCodeInstruction}
        </SecondaryText>
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
            disabled={
              postalCodeInvalid ||
              postalCodeInput.length !==
                AroundMeConstants.POSTAL_CODE_MAX_LENGTH
            }
            action={searchByPostalCode}
          />
        </View>
        <HelperText type="error" visible={postalCodeInvalid}>
          {Labels.aroundMe.postalCodeInvalid}
        </HelperText>
        <CustomSnackbar
          duration={AroundMeConstants.SNACKBAR_DURATION}
          visible={showSnackBar}
          isOnTop
          backgroundColor={Colors.aroundMeSnackbar.background}
          onDismiss={onSnackBarDismiss}
          textColor={Colors.aroundMeSnackbar.text}
          text={snackBarMessage}
        />
      </View>
      {isLoading && <MapLoader />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  description: {
    color: Colors.commonText,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.medium,
    lineHeight: Sizes.md,
    marginVertical: Margins.default,
  },
  fontButton: {
    fontSize: Sizes.xs,
  },
  geolicationButtonStyle: {
    marginHorizontal: Margins.default,
  },
  geolicationIconStyle: {
    height: Margins.largest,
    width: Margins.largest,
  },
  geolicationTouchableStyle: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: Sizes.minButton,
    minWidth: Sizes.minButton,
  },
  geolocationRow: {
    flexDirection: "row",
    marginVertical: Margins.default,
  },
  mainContainer: {
    flex: 1,
  },
  paddingDefault: {
    padding: Paddings.default,
  },
  postalCodeInput: {
    backgroundColor: Colors.cardGrey,
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    paddingHorizontal: Paddings.smaller,
  },
  postalCodeRow: {
    flexDirection: "row",
    paddingVertical: Paddings.smaller,
  },
  searchByPostalCodeButton: {
    marginHorizontal: Margins.smaller,
  },
  widthForIos: {
    width: SCREEN_WIDTH / 2.2,
  },
});

export default TabAroundMeInstruction;
