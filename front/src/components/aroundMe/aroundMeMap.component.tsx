/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import type { Poi } from "@socialgouv/nos1000jours-lib";
import { useEffect, useRef, useState } from "react";
import * as React from "react";
import { Image, StyleSheet } from "react-native";
import type { LatLng, Region } from "react-native-maps";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

import {
  AroundMeConstants,
  Labels,
  StorageKeysConstants,
} from "../../constants";
import { PLATFORM_IS_IOS } from "../../constants/platform.constants";
import { Colors, Margins } from "../../styles";
import { KeyboardUtils, StorageUtils, TrackerUtils } from "../../utils";
import { CustomSnackbar, Loader, View } from "../baseComponents";
import TrackerHandler from "../tracker/trackerHandler.component";
import AddressDetails from "./addressDetails.component";
import AroundMeMapHeader from "./aroundMeMapHeader.component";
import CustomMapMarker from "./customMapMarker.component";
import FetchPois from "./fetchPois.component";

interface Props {
  region: Region;
  poiArray: Poi[];
  selectedPoiIndex: number;
  userLocation?: LatLng;
  updateRegion: (region: Region) => void;
  updatePoiArray: (poiArray: Poi[]) => void;
  updateSelectedPoiIndex: (selectedPoiIndex: number) => void;
  displayList: () => void;
}

const AroundMeMap: React.FC<Props> = ({
  region,
  poiArray,
  selectedPoiIndex,
  userLocation,
  updateRegion,
  updatePoiArray,
  updateSelectedPoiIndex,
  displayList,
}) => {
  const mapRef = useRef<MapView>();

  // Popup for address details
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const [addressDetails, setAddressDetails] = useState<Poi>();
  const [showRelaunchResearchButton, setShowRelaunchResearchButton] =
    useState(true);

  // Snackbar
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [trackerAction, setTrackerAction] = useState("");
  const [triggerSearchByGpsCoords, setTriggerSearchByGpsCoords] =
    useState(false);

  const [showDisplayListButton, setShowDisplayListButton] = useState(true);

  useEffect(() => {
    if (selectedPoiIndex !== -1) {
      setTimeout(() => {
        moveMapToCoordinates(
          poiArray[selectedPoiIndex].position_latitude,
          poiArray[selectedPoiIndex].position_longitude
        );
        setAddressDetails(poiArray[selectedPoiIndex]);
        setShowAddressDetails(true);
      }, 500);
    }
  }, [selectedPoiIndex]);

  const locationIcon = "../../assets/images/carto/current_location.png";
  const currentUserLocationIcon = require(locationIcon);

  const setMapViewRef = (ref: MapView) => {
    mapRef.current = ref;
  };

  const handleFetchedPois = (pois: Poi[]) => {
    if (pois.length === 0) {
      showSnackBarWithMessage(Labels.aroundMe.noAddressFound);
    }

    setShowDisplayListButton(pois.length > 0);
    updatePoiArray(pois);
    setShowAddressDetails(false);
    setIsLoading(false);
  };

  const onRegionChangeComplete = (newRegion: Region) => {
    void StorageUtils.storeObjectValue(
      StorageKeysConstants.cartoSavedRegion,
      newRegion
    );
    updateRegion(newRegion);
    setShowSnackBar(false);
    setShowRelaunchResearchButton(true);
  };

  const showSnackBarWithMessage = (message: string) => {
    setSnackBarMessage(message);
    setShowSnackBar(true);
  };

  const onSnackBarDismiss = () => {
    setShowSnackBar(false);
  };

  const onMarkerClick = (poiIndex: number) => {
    setTrackerAction(TrackerUtils.TrackingEvent.CARTO_CLICK_POI);
    if (PLATFORM_IS_IOS) {
      moveMapToCoordinates(
        poiArray[poiIndex].position_latitude,
        poiArray[poiIndex].position_longitude
      );
    }

    setAddressDetails(poiArray[poiIndex]);
    setShowAddressDetails(true);
    updateSelectedPoiIndex(poiIndex);
  };

  const moveMapToCoordinates = (latitude: number, longitude: number) => {
    const markerCoordinates: LatLng = {
      latitude,
      longitude,
    };
    mapRef.current?.animateCamera(
      { center: markerCoordinates },
      { duration: AroundMeConstants.ANIMATE_CAMERA_DURATION }
    );
  };

  return (
    <View style={styles.mainContainer}>
      <TrackerHandler
        screenName={TrackerUtils.TrackingEvent.CARTO}
        actionName={trackerAction}
      />
      <FetchPois
        triggerSearchByGpsCoords={triggerSearchByGpsCoords}
        region={region}
        setFetchedPois={handleFetchedPois}
        chooseFilterMessage={() => {
          setTimeout(
            () => {
              setIsLoading(false);
            },
            PLATFORM_IS_IOS ? 500 : 0
          );
          showSnackBarWithMessage(Labels.aroundMe.chooseFilter);
        }}
      />
      <View style={styles.map}>
        <MapView
          minZoomLevel={AroundMeConstants.MAPVIEW_MIN_ZOOM_LEVEL}
          ref={setMapViewRef}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={onRegionChangeComplete}
        >
          {poiArray.map((poi, poiIndex) => (
            <View key={poiIndex}>
              <CustomMapMarker
                coordinates={{
                  latitude: Number(poi.position_latitude),
                  longitude: Number(poi.position_longitude),
                }}
                poiIndex={poiIndex}
                poiCategorie={poi.categorie}
                selectedPoiIndex={selectedPoiIndex}
                onMarkerClick={onMarkerClick}
              />
            </View>
          ))}
          {userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
            >
              <Image
                source={currentUserLocationIcon}
                style={styles.currentLocationMarker}
              />
            </Marker>
          )}
        </MapView>
        <AroundMeMapHeader
          headerStyle={styles.headerButtonsMapView}
          displayMap
          setDisplayMap={() => {
            displayList();
          }}
          relaunchSearch={() => {
            KeyboardUtils.dismissKeyboard();
            setIsLoading(true);
            setShowRelaunchResearchButton(false);
            setShowAddressDetails(false);
            updateSelectedPoiIndex(-1);
            setTriggerSearchByGpsCoords(!triggerSearchByGpsCoords);
          }}
          showRelaunchResearchButton={showRelaunchResearchButton}
          setIsLoading={setIsLoading}
          showDisplayListButton={showDisplayListButton}
        />
        <CustomSnackbar
          duration={AroundMeConstants.SNACKBAR_DURATION}
          visible={showSnackBar}
          isOnTop={true}
          backgroundColor={Colors.aroundMeSnackbar.background}
          onDismiss={onSnackBarDismiss}
          textColor={Colors.aroundMeSnackbar.text}
          text={snackBarMessage}
        />
      </View>
      {showAddressDetails && addressDetails && (
        <View
          style={[
            styles.addressDetails,
            styles.addressDetailsSmallMarginBottom,
          ]}
        >
          <AddressDetails
            details={addressDetails}
            isClickedMarker={true}
            hideDetails={() => {
              updateSelectedPoiIndex(-1);
              setShowAddressDetails(false);
            }}
          />
        </View>
      )}
      {isLoading && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  addressDetails: {
    bottom: 0,
    left: 0,
    marginHorizontal: Margins.smaller,
    position: "absolute",
    right: 0,
  },
  addressDetailsSmallMarginBottom: {
    marginBottom: Margins.smaller,
  },
  currentLocationMarker: {
    height: Margins.default,
    width: Margins.default,
  },
  headerButtonsMapView: {
    backgroundColor: "transparent",
    flexDirection: "row",
    height: "15%",
    left: 0,
    margin: Margins.smaller,
    position: "absolute",
    right: 0,
    top: 0,
  },
  mainContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default AroundMeMap;