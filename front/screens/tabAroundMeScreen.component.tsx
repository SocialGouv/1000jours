import { useLazyQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import * as React from "react";
import { StyleSheet, TextInput } from "react-native";
import type { Region } from "react-native-maps";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

import {
  Button,
  CommonText,
  CustomSnackBar,
  SecondaryText,
} from "../components";
import { View } from "../components/Themed";
import {
  AroundMeConstants,
  Colors,
  DatabaseQueries,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../constants";
import type { CartographiePoisFromDB } from "../type";
import { AroundMeUtils, KeyboardUtils } from "../utils";

const TabAroundMeScreen: React.FC = () => {
  const mapRef = useRef<MapView>();
  const [postalCodeInput, setPostalCodeInput] = useState("");
  const [getPoisByPostalCode, { data }] = useLazyQuery(
    DatabaseQueries.AROUNDME_POIS_BY_POSTALCODE
  );
  const [region, setRegion] = useState<Region>(
    AroundMeConstants.INITIAL_REGION
  );
  const [poisArray, setPoisArray] = useState<CartographiePoisFromDB[]>([]);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  // Variable utilisée pour trigger le useEffect lors du clic sur le bouton Rechercher
  const [triggerSearchByPostalCode, setTriggerSearchByPostalCode] = useState(
    false
  );

  const setMapViewRef = (ref: MapView) => {
    mapRef.current = ref;
  };

  useEffect(() => {
    if (postalCodeInput.length !== AroundMeConstants.POSTAL_CODE_MAX_LENGTH) {
      return;
    }
    getPoisByPostalCode({
      variables: { codePostal: postalCodeInput },
    });
    if (!data) return;
    const fetchedData = (data as {
      cartographiePois: CartographiePoisFromDB[];
    }).cartographiePois;
    if (fetchedData.length === 0) {
      showSnackBarWithMessage(Labels.aroundMe.noAddressFound);
    }
    setPoisArray(
      fetchedData.slice(0, AroundMeConstants.NUMBER_MAX_MARKERS_ON_MAP)
    );
  }, [postalCodeInput, triggerSearchByPostalCode]);

  const onRegionChange = (newRegion: Region) => {
    setRegion(newRegion);
  };

  const onSearchByPostalCodeButtonClick = async () => {
    KeyboardUtils.dismissKeyboard();
    setShowSnackBar(false);
    await searchByPostalCodeAndGoToNewRegion();
  };

  const searchByPostalCodeAndGoToNewRegion = async () => {
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
      <View style={styles.topContainer}>
        <SecondaryText style={styles.title}>
          {Labels.aroundMe.title}
        </SecondaryText>
        <SecondaryText style={styles.instruction}>
          {Labels.aroundMe.instruction}
        </SecondaryText>
      </View>
      <View style={styles.postalCodeView}>
        <TextInput
          style={styles.postalCodeInput}
          onChangeText={setPostalCodeInput}
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
      <View style={styles.mapContainer}>
        <MapView
          ref={setMapViewRef}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          initialRegion={region}
          onRegionChange={onRegionChange}
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
  postalCodeView: {
    flexDirection: "row",
    paddingLeft: Margins.default,
    paddingVertical: Paddings.smallest,
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
