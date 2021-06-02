import { useRef, useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import type { Region } from "react-native-maps";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

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
import SearchByPostalCode from "./searchByPostalCode.component";

const TabAroundMeScreen: React.FC = () => {
  const mapRef = useRef<MapView>();
  const [postalCodeInput, setPostalCodeInput] = useState("");
  const [postalCodeInvalid, setPostalCodeInvalid] = useState(false);
  const [region, setRegion] = useState<Region>(
    AroundMeConstants.INITIAL_REGION
  );
  const [
    moveToRegionBecauseOfPCResearch,
    setMoveToRegionBecauseOfPCResearch,
  ] = useState(false);
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
    /* Lorsqu'on lance une recherche par CP, le moveToRegionBecauseOfPCResearch est mis à true
    et donc on ne cache pas directement la snackBar si elle a été affichée (en cas d'erreur) */
    if (moveToRegionBecauseOfPCResearch) {
      setMoveToRegionBecauseOfPCResearch(false);
    } else {
      setShowSnackBar(false);
    }
    setPostalCodeInvalid(false);
    setShowRelaunchResearchButton(true);
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
      <SearchByPostalCode
        postalCodeInput={postalCodeInput}
        setPostalCodeInput={setPostalCodeInput}
        postalCodeInvalid={postalCodeInvalid}
        setPostalCodeInvalid={setPostalCodeInvalid}
        hideSnackBar={() => {
          setShowSnackBar(false);
        }}
        setAndGoToNewRegion={(newRegion: Region) => {
          setRegion(newRegion);
          mapRef.current?.animateToRegion(newRegion);
        }}
        triggerSearchByPostalCode={() => {
          setMoveToRegionBecauseOfPCResearch(true);
          setTriggerSearchByPostalCode(!triggerSearchByPostalCode);
        }}
        showSnackBarWithMessage={showSnackBarWithMessage}
      />
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
