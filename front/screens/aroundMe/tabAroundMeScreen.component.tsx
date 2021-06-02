import { useRef, useState } from "react";
import * as React from "react";
import { StyleSheet, TextInput } from "react-native";
import type { Region } from "react-native-maps";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { HelperText } from "react-native-paper";

import {
  Button,
  CommonText,
  CustomSnackBar,
  SecondaryText,
} from "../../components";
import FetchPoisCoords from "../../components/aroundMe/fetchPoisCoords.component";
import { View } from "../../components/Themed";
import {
  AroundMeConstants,
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../constants";
import type { CartographiePoisFromDB } from "../../type";
import { AroundMeUtils, KeyboardUtils } from "../../utils";

const TabAroundMeScreen: React.FC = () => {
  const mapRef = useRef<MapView>();
  const [postalCodeInput, setPostalCodeInput] = useState("");
  const [postalCodeInvalid, setPostalCodeInvalid] = useState(false);
  const [region, setRegion] = useState<Region>(
    AroundMeConstants.INITIAL_REGION
  );
  // Variable utilisée pour trigger le useEffect lors du clic sur le bouton Rechercher
  const [triggerSearchByPostalCode, setTriggerSearchByPostalCode] = useState(
    false
  );
  // Variable utilisée pour trigger le useEffect lors du relancement de la Recherche
  const [triggerSearchByGpsCoords, setTriggerSearchByGpsCoords] = useState(
    false
  );
  const [poisArray, setPoisArray] = useState<CartographiePoisFromDB[]>([]);
  const [showRelaunchResearchButton, setShowRelaunchResearchButton] = useState(
    true
  );
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const setMapViewRef = (ref: MapView) => {
    mapRef.current = ref;
  };

  const handleFetchedPois = (pois: CartographiePoisFromDB[]) => {
    if (pois.length === 0) {
      showSnackBarWithMessage(Labels.aroundMe.noAddressFound);
    }
    setPoisArray(pois.slice(0, AroundMeConstants.NUMBER_MAX_MARKERS_ON_MAP));
  };

  const onRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
    setShowSnackBar(false);
    setPostalCodeInvalid(false);
    setShowRelaunchResearchButton(true);
  };

  const onPostalCodeChanged = (newPostalCode: string) => {
    setPostalCodeInput(newPostalCode);
    setPostalCodeInvalid(false);
  };

  const onSearchByPostalCodeButtonClick = async () => {
    KeyboardUtils.dismissKeyboard();
    setShowSnackBar(false);
    await searchByPostalCodeAndGoToNewRegion();
  };

  const searchByPostalCodeAndGoToNewRegion = async () => {
    if (postalCodeInput.length !== AroundMeConstants.POSTAL_CODE_MAX_LENGTH) {
      setPostalCodeInvalid(true);
      return;
    }
    const newRegion = await AroundMeUtils.searchRegionByPostalCode(
      postalCodeInput
    );

    if (newRegion) {
      setTriggerSearchByPostalCode(!triggerSearchByPostalCode);
      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion);
    } else {
      showSnackBarWithMessage(Labels.aroundMe.postalCodeNotFound);
    }
  };

  const showSnackBarWithMessage = (message: string) => {
    setSnackBarMessage(message);
    setShowSnackBar(true);
  };

  const onSnackBarDismiss = () => {
    setShowSnackBar(false);
  };

  return (
    <View style={styles.mainContainer}>
      <FetchPoisCoords
        triggerSearchByPostalCode={triggerSearchByPostalCode}
        triggerSearchByGpsCoords={triggerSearchByGpsCoords}
        postalCode={postalCodeInput}
        region={region}
        setFetchedPois={handleFetchedPois}
      />
      <View style={styles.topContainer}>
        <SecondaryText style={styles.title}>
          {Labels.aroundMe.title}
        </SecondaryText>
        <SecondaryText style={styles.instruction}>
          {Labels.aroundMe.instruction}
        </SecondaryText>
      </View>
      <View>
        <View style={styles.postalCodeRow}>
          <TextInput
            style={styles.postalCodeInput}
            onChangeText={onPostalCodeChanged}
            value={postalCodeInput}
            placeholder={Labels.aroundMe.postalCodeInputPlaceholder}
            keyboardType="number-pad"
            maxLength={AroundMeConstants.POSTAL_CODE_MAX_LENGTH}
          />
          <Button
            buttonStyle={styles.callButton}
            title={Labels.aroundMe.searchButton}
            titleStyle={styles.fontButton}
            rounded={true}
            action={onSearchByPostalCodeButtonClick}
          />
        </View>
        {postalCodeInvalid && (
          <HelperText type="error">
            {Labels.aroundMe.postalCodeInvalid}
          </HelperText>
        )}
      </View>
      <View style={styles.mapContainer}>
        <MapView
          ref={setMapViewRef}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={onRegionChangeComplete}
        >
          {poisArray.map((poi, poiIndex) => (
            <View key={poiIndex}>
              <Marker
                coordinate={{
                  latitude: Number(poi.geocode_position_latitude),
                  longitude: Number(poi.geocode_position_longitude),
                }}
                pinColor="red"
              />
            </View>
          ))}
        </MapView>
        {showRelaunchResearchButton && (
          <View style={styles.relaunchSearchView}>
            <Button
              buttonStyle={styles.relaunchSearchButton}
              title={Labels.aroundMe.relaunchSearch}
              titleStyle={styles.relaunchSearchButtonText}
              rounded={true}
              action={() => {
                setShowRelaunchResearchButton(false);
                setTriggerSearchByGpsCoords(!triggerSearchByGpsCoords);
              }}
            />
          </View>
        )}
      </View>
      <CustomSnackBar
        visible={showSnackBar}
        duration={AroundMeConstants.SNACKBAR_DURATION}
        onDismiss={onSnackBarDismiss}
      >
        <CommonText>{snackBarMessage}</CommonText>
      </CustomSnackBar>
    </View>
  );
};

const styles = StyleSheet.create({
  callButton: {
    marginHorizontal: Margins.smallest,
  },
  fontButton: {
    fontSize: Sizes.xxs,
  },
  instruction: {
    color: Colors.commonText,
    fontSize: Sizes.xs,
    lineHeight: Sizes.mmd,
    paddingHorizontal: Paddings.smallest,
  },
  mainContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    height: "80%",
    width: "100%",
  },
  postalCodeInput: {
    backgroundColor: Colors.cardGrey,
    paddingHorizontal: Paddings.smaller,
  },
  postalCodeRow: {
    flexDirection: "row",
    paddingLeft: Margins.default,
    paddingVertical: Paddings.smallest,
  },
  relaunchSearchButton: {
    backgroundColor: "white",
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    marginHorizontal: Margins.smallest,
  },
  relaunchSearchButtonText: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xxs,
  },
  relaunchSearchView: {
    backgroundColor: "transparent",
    margin: Margins.smaller,
    position: "absolute",
    right: 0,
    top: 0,
  },
  title: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.bold,
    paddingHorizontal: Paddings.smallest,
    textTransform: "uppercase",
  },
  topContainer: {
    paddingHorizontal: Paddings.default,
    paddingTop: Paddings.default,
  },
});

export default TabAroundMeScreen;
