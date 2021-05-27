import { useRef, useState } from "react";
import * as React from "react";
import { StyleSheet, TextInput } from "react-native";
import type { LatLng, Region } from "react-native-maps";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

import {
  Button,
  CommonText,
  CustomSnackBar,
  SecondaryText,
  View,
} from "../../components";
import {
  AroundMeConstants,
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../constants";
import type { AddressDetailsType } from "../../type";
import { AroundMeUtils, KeyboardUtils } from "../../utils";
import AddressDetails from "./addressDetails.component";

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
  const [displayAddressDetails, setDisplayAddressDetails] = useState(false);
  const [addressDetails, setAddressDetails] = useState<AddressDetailsType>();

  const setMapViewRef = (ref: MapView) => {
    mapRef.current = ref;
  };

  const onRegionChange = (newRegion: Region) => {
    setRegion(newRegion);
  };

  const onSearchByPostalCodeButtonClick = async () => {
    KeyboardUtils.dismissKeyboard();
    setShowSnackBar(false);
    setDisplayAddressDetails(false);
    await searchByPostalCodeAndGoToNewRegion();
  };

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
    } else {
      setShowSnackBar(true);
    }
  };

  const onSnackBarDismiss = () => {
    setShowSnackBar(false);
  };

  const onMarkerClick = (markerIndex: number) => {
    const details: AddressDetailsType = {
      accessibilityInfo: "Accessibilité simple",
      emailAddress: "professionnel@email.com",
      phoneNumber: "01 23 45 67 89",
      postalAddress: "25 rue du Sergent Bauchat, 75012 Paris",
      professionalName: `Professionnel n°${markerIndex}`,
      website: "www.professionnel.com",
    };
    setAddressDetails(details);
    setDisplayAddressDetails(true);
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
      <View style={styles.map}>
        <MapView
          onTouchEnd={() => {
            setDisplayAddressDetails(false);
          }}
          ref={setMapViewRef}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          initialRegion={region}
          onRegionChange={onRegionChange}
        >
          {markersArray.map((marker, markerIndex) => (
            <View key={markerIndex}>
              <Marker
                coordinate={marker}
                pinColor="red"
                onPress={() => {
                  onMarkerClick(markerIndex);
                }}
              ></Marker>
            </View>
          ))}
        </MapView>
      </View>
      {displayAddressDetails && addressDetails && (
        <AddressDetails details={addressDetails} />
      )}
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
  addressDetails: {
    bottom: 0,
    left: 0,
    marginHorizontal: Margins.default,
    marginVertical: Margins.smaller,
    position: "absolute",
    right: 0,
  },
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
    flex: 1,
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
