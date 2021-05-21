import { useRef, useState } from "react";
import * as React from "react";
import { Keyboard, StyleSheet, TextInput } from "react-native";
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
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../constants";

const TabAroundMeScreen: React.FC = () => {
  const mapRef = useRef<MapView>();
  const [postalCodeInput, setPostalCodeInput] = useState("");
  const [latLng, setLatLng] = useState<LatLng>(
    AroundMeConstants.COORDINATE_PARIS
  );
  const [region, setRegion] = useState<Region>(
    AroundMeConstants.INITIAL_REGION
  );
  const [showSnackBar, setShowSnackBar] = useState(false);

  function setMapViewRef(ref: MapView) {
    mapRef.current = ref;
  }

  const onRegionChange = (newRegion: Region) => {
    console.log(newRegion);
    setRegion(newRegion);
  };

  const searchByPostalCode = () => {
    Keyboard.dismiss();
    fetch(AroundMeConstants.getApiUrlWithParam(postalCodeInput))
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .then(async (response) => response.json())
      .then((json) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (json.features[0]?.geometry.coordinates) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const coordinates: string[] = json.features[0].geometry.coordinates;
          console.log(coordinates);
          const newRegion = {
            latitude: Number(coordinates[1]) - 0.035684, // C'est un petit correctif pour que la carte soit centrée sur la recherche, peut-être que je le
            latitudeDelta: AroundMeConstants.DEFAULT_LATITUDE_DELTA,
            longitude: Number(coordinates[0]),
            longitudeDelta: AroundMeConstants.DEFAULT_LONGITUDE_DELTA,
          };
          setRegion(newRegion);
          mapRef.current?.animateToRegion(newRegion);
        } else {
          setShowSnackBar(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
          action={searchByPostalCode}
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
          <Marker coordinate={latLng} pinColor="red" />
        </MapView>
      </View>
      <CustomSnackBar visible={showSnackBar} onDismiss={onSnackBarDismiss}>
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
    height: "110%",
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
