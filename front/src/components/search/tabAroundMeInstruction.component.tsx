/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { Poi } from "@socialgouv/nos1000jours-lib";
import type { FC } from "react";
import { useState } from "react";
import * as React from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import type { LatLng, Region } from "react-native-maps";
import { HelperText } from "react-native-paper";

import { AroundMeConstants, Labels } from "../../constants";
import {
  PLATFORM_IS_IOS,
  SCREEN_WIDTH,
} from "../../constants/platform.constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import { RootNavigation } from "../../utils";
import FetchPois from "../aroundMe/fetchPois.component";
import SearchRegion from "../aroundMe/searchRegion.component";
import {
  CustomButton,
  CustomSnackbar,
  Loader,
  SecondaryText,
  View,
} from "../baseComponents";

const TabAroundMeInstruction: FC = () => {
  const [postalCodeInput, setPostalCodeInput] = useState("");
  const [postalCodeInvalid, setPostalCodeInvalid] = useState(false);
  const [region, setRegion] = useState<Region>();
  const [userLocation, setUserLocation] = useState<LatLng | undefined>();
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [triggerCheckLocation, setTriggerCheckLocation] = useState(false);
  const [triggerSearchByPostalCode, setTriggerSearchByPostalCode] =
    useState(false);
  const [triggerFetchPois, setTriggerFetchPois] = useState(false);

  const geolocationIcon = require("../../assets/images/carto/geolocation.png");

  const showSnackBarWithMessage = (message: string) => {
    setSnackBarMessage(message);
    setShowSnackBar(true);
  };

  const onPostalCodeChanged = (newPostalCode: string) => {
    setPostalCodeInput(newPostalCode);
    setPostalCodeInvalid(false);
  };

  const checkLocation = () => {
    setIsLoading(true);
    setTriggerCheckLocation(!triggerCheckLocation);
  };

  const searchByPostalCode = () => {
    setIsLoading(true);
    setTriggerSearchByPostalCode(!triggerSearchByPostalCode);
  };

  const handlePois = (pois: Poi[]) => {
    if (pois.length === 0)
      showSnackBarWithMessage(Labels.aroundMe.noAddressFound);
    else if (region)
      void RootNavigation.navigate("aroundMeMapAndList", {
        poisArray: pois,
        region,
        userLocation,
      });
    setIsLoading(false);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <SearchRegion
        triggerSearchRegionByLocation={triggerCheckLocation}
        showSnackBarWithMessage={(message: string) => {
          setIsLoading(false);
          showSnackBarWithMessage(message);
        }}
        setRegion={(newRegion: Region | undefined) => {
          if (newRegion) {
            setRegion(newRegion);
            setTriggerFetchPois(!triggerFetchPois);
          } else {
            setIsLoading(false);
            showSnackBarWithMessage(Labels.aroundMe.regionCouldNotBeDefined);
          }
        }}
        triggerSearchRegionByPostalCode={triggerSearchByPostalCode}
        postalCodeInput={postalCodeInput}
        setPostalCodeInvalid={setPostalCodeInvalid}
        setUserLocation={setUserLocation}
      />

      <FetchPois
        triggerSearchByGpsCoords={triggerFetchPois}
        region={region}
        setFetchedPois={handlePois}
        chooseFilterMessage={() => {
          return;
        }}
      />
      <SecondaryText style={styles.description}>
        {Labels.aroundMe.searchGeolocInstruction}
      </SecondaryText>
      <View style={styles.geolocationRow}>
        <TouchableOpacity
          onPress={() => {
            checkLocation();
          }}
        >
          <Image source={geolocationIcon} style={styles.geolicationIconStyle} />
        </TouchableOpacity>
        <CustomButton
          buttonStyle={styles.geolicationButtonStyle}
          title={Labels.aroundMe.useMyGeolocation}
          titleStyle={styles.fontButton}
          rounded={true}
          action={() => {
            checkLocation();
          }}
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
          disabled={postalCodeInvalid}
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
        onDismiss={() => {
          setShowSnackBar(false);
        }}
        textColor={Colors.aroundMeSnackbar.text}
        text={snackBarMessage}
      />
      {isLoading && <Loader />}
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
    marginLeft: Margins.default,
    width: Margins.largest,
  },
  geolocationRow: {
    flexDirection: "row",
    marginVertical: Margins.default,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: Paddings.default,
    paddingTop: Paddings.default,
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

export default TabAroundMeInstruction;
