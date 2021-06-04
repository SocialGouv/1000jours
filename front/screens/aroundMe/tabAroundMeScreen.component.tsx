import { useRef, useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import type { Region } from "react-native-maps";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { Card } from "react-native-paper";
import SlidingUpPanel from "rn-sliding-up-panel";

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
import AddressDetails from "./addressDetails.component";
import SearchByPostalCode from "./searchByPostalCode.component";

const TabAroundMeScreen: React.FC = () => {
  const mapRef = useRef<MapView>();
  const slidingUpPanelRef = useRef<SlidingUpPanel>();
  const [postalCodeInput, setPostalCodeInput] = useState("");
  const [postalCodeInvalid, setPostalCodeInvalid] = useState(false);
  const [region, setRegion] = useState<Region>(
    AroundMeConstants.INITIAL_REGION
  );
  const [
    moveToRegionBecauseOfPCResearch,
    setMoveToRegionBecauseOfPCResearch,
  ] = useState(false);
  const [
    moveToRegionBecauseOfMarkerClick,
    setMoveToRegionBecauseOfMarkerClick,
  ] = useState(false);
  // Variable utilisée pour trigger le useEffect lors du clic sur le bouton Rechercher
  const [triggerSearchByPostalCode, setTriggerSearchByPostalCode] = useState(
    false
  );
  // Variable utilisée pour trigger le useEffect lors du relancement de la Recherche
  const [triggerSearchByGpsCoords, setTriggerSearchByGpsCoords] = useState(
    false
  );
  const [poisArrayOnMap, setPoisArrayOnMap] = useState<
    CartographiePoisFromDB[]
  >([]);
  const [poisArrayInList, setPoisArrayInList] = useState<
    CartographiePoisFromDB[]
  >([]);
  const [displayAddressDetails, setDisplayAddressDetails] = useState(false);
  const [
    addressDetails,
    setAddressDetails,
  ] = useState<CartographiePoisFromDB>();
  const [showRelaunchResearchButton, setShowRelaunchResearchButton] = useState(
    true
  );
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const setMapViewRef = (ref: MapView) => {
    mapRef.current = ref;
  };

  const setSlidingUpPanelRef = (ref: SlidingUpPanel) => {
    slidingUpPanelRef.current = ref;
  };

  const handleFetchedPois = (pois: CartographiePoisFromDB[]) => {
    if (pois.length === 0) {
      showSnackBarWithMessage(Labels.aroundMe.noAddressFound);
    }
    setPoisArrayInList(pois);
    setPoisArrayOnMap(
      pois.slice(0, AroundMeConstants.NUMBER_MAX_MARKERS_ON_MAP)
    );
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

    /* Lorsqu'on clique sur un marqueur, le moveToRegionBecauseOfMarkerClick est mis à true
    et donc on ne cache pas directement le AddressDetails s'il a été affiché */
    if (moveToRegionBecauseOfMarkerClick) {
      setMoveToRegionBecauseOfMarkerClick(false);
    } else {
      setDisplayAddressDetails(false);
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

  const onMarkerClick = (markerIndex: number) => {
    setAddressDetails(poisArrayOnMap[markerIndex]);
    setDisplayAddressDetails(true);
    setMoveToRegionBecauseOfMarkerClick(true);
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
          setDisplayAddressDetails(false);
          setRegion(newRegion);
          mapRef.current?.animateToRegion(newRegion);
        }}
        triggerSearchByPostalCode={() => {
          setMoveToRegionBecauseOfPCResearch(true);
          setTriggerSearchByPostalCode(!triggerSearchByPostalCode);
        }}
        showSnackBarWithMessage={showSnackBarWithMessage}
      />
      <View style={styles.map}>
        <MapView
          ref={setMapViewRef}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={onRegionChangeComplete}
        >
          {poisArrayOnMap.map((poi, poiIndex) => (
            <View key={poiIndex}>
              <Marker
                coordinate={{
                  latitude: Number(poi.geocode_position_latitude),
                  longitude: Number(poi.geocode_position_longitude),
                }}
                pinColor="red"
                onPress={() => {
                  onMarkerClick(poiIndex);
                }}
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
                slidingUpPanelRef.current?.show();
                setShowRelaunchResearchButton(false);
                setDisplayAddressDetails(false);
                setTriggerSearchByGpsCoords(!triggerSearchByGpsCoords);
              }}
            />
          </View>
        )}
        <SlidingUpPanel
          ref={setSlidingUpPanelRef}
          // animatedValue={new Animated.Value(60)}
        >
          <View style={styles.slidingUpPanelView}>
            <View style={styles.swipeIndicator} />
            <CommonText>Test</CommonText>
            {poisArrayInList.map((poi, poiIndex) => (
              <View key={poiIndex}>
                <Card style={styles.card}>
                  <AddressDetails details={poi} />
                </Card>
              </View>
            ))}
          </View>
        </SlidingUpPanel>
      </View>
      {displayAddressDetails && addressDetails && (
        <View style={styles.addressDetails}>
          <AddressDetails details={addressDetails} />
        </View>
      )}
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
  addressDetails: {
    bottom: 0,
    left: 0,
    marginHorizontal: Margins.default,
    marginVertical: Margins.smaller,
    position: "absolute",
    right: 0,
  },
  card: {
    backgroundColor: Colors.cardGrey,
    borderWidth: 1,
    margin: Margins.smallest,
  },
  columnView: {
    flexDirection: "column",
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
  slidingUpPanelView: {
    borderTopEndRadius: Sizes.xxxl,
    borderTopStartRadius: Sizes.xxxl,
  },
  swipeIndicator: {
    alignSelf: "center",
    backgroundColor: Colors.navigation,
    borderRadius: Sizes.xs,
    height: Sizes.xxxxxxs,
    marginBottom: Margins.default,
    marginTop: Margins.larger,
    width: Sizes.xxxl,
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
