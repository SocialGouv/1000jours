import { useLazyQuery } from "@apollo/client";
import { useRef, useState } from "react";
import * as React from "react";
import { ActivityIndicator, StyleSheet, TextInput } from "react-native";
import type { LatLng, Region } from "react-native-maps";
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
import { AroundMeUtils, KeyboardUtils } from "../utils";

const TabAroundMeScreen: React.FC = () => {
  const mapRef = useRef<MapView>();
  const [postalCodeInput, setPostalCodeInput] = useState("");
  const [region, setRegion] = useState<Region>(
    AroundMeConstants.INITIAL_REGION
  );
  const [markersArray, setMarkersArray] = useState<LatLng[]>([
    AroundMeConstants.COORDINATE_PARIS,
  ]);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const setMapViewRef = (ref: MapView) => {
    mapRef.current = ref;
  };

  const onRegionChange = (newRegion: Region) => {
    setRegion(newRegion);
  };

  const onSearchByPostalCodeButtonClick = async () => {
    KeyboardUtils.dismissKeyboard();
    setShowSnackBar(false);
    await searchByPostalCodeAndGoToNewRegion();
  };

  // const getPoisByPostalCode = () => {
  const [getPoisByPostalCode, { loading, data }] = useLazyQuery(
    DatabaseQueries.AROUNDME_POIS_BY_POSTALCODE
  );

  // if (loading) return <ActivityIndicator size="large" />;
  console.log(data);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  // };
  // await addReponseQuery({
  //   variables: { compteur: newCounter, genre: genderValue, score: result },
  // });

  const searchByPostalCodeAndGoToNewRegion = async () => {
    const regionData = await AroundMeUtils.searchRegionByPostalCode(
      postalCodeInput
    );

    if (regionData.regionIsFetched && regionData.newRegion) {
      const newRegion = regionData.newRegion;
      const newLatLngs = [
        AroundMeUtils.getLatLngPoint(
          newRegion,
          AroundMeConstants.LatLngPointType.center
        ),
        AroundMeUtils.getLatLngPoint(
          newRegion,
          AroundMeConstants.LatLngPointType.topLeft
        ),
        AroundMeUtils.getLatLngPoint(
          newRegion,
          AroundMeConstants.LatLngPointType.bottomRight
        ),
      ];
      setMarkersArray(newLatLngs);
      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion);
      getPoisByPostalCode({
        variables: { postalCode: postalCodeInput },
      });
    } else {
      setShowSnackBar(true);
    }
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
          {markersArray.map((marker, markerIndex) => (
            <View key={markerIndex}>
              <Marker coordinate={marker} pinColor="red" />
            </View>
          ))}
        </MapView>
      </View>
      <CustomSnackBar
        visible={showSnackBar}
        duration={AroundMeConstants.SNACKBAR_DURATION}
        onDismiss={onSnackBarDismiss}
      >
        <CommonText>{Labels.aroundMe.postalCodeNotFound}</CommonText>
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
