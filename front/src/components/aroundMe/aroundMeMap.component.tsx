/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import type { Poi } from "@socialgouv/nos1000jours-lib";
import type { FC } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import type { LayoutChangeEvent } from "react-native";
import { Image, StyleSheet } from "react-native";
import type { LatLng, Region } from "react-native-maps";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

import {
  AroundMeConstants,
  Labels,
  StorageKeysConstants,
} from "../../constants";
import {
  PLATFORM_IS_IOS,
  SCREEN_HEIGHT,
} from "../../constants/platform.constants";
import { Colors, Margins } from "../../styles";
import {
  AroundMeUtils,
  KeyboardUtils,
  StorageUtils,
  TrackerUtils,
} from "../../utils";
import { CustomSnackbar, MapLoader, View } from "../baseComponents";
import TrackerHandler from "../tracker/trackerHandler.component";
import AddressDetails from "./addressDetails.component";
import AroundMeMapHeader from "./aroundMeMapHeader.component";
import CustomMapMarker from "./customMapMarker.component";
import FetchPois from "./fetchPois.component";

interface Props {
  region?: Region;
  coordinates?: LatLng;
  zoomOrAltitude: number;
  poiArray: Poi[];
  selectedPoiIndex: number;
  userLocation?: LatLng;
  updateRegion?: (region: Region) => void;
  resetCoordinates?: () => void;
  updatePoiArray: (poiArray: Poi[]) => void;
  updateSelectedPoiIndex: (selectedPoiIndex: number) => void;
  displayList?: () => void;
}

interface ExtendedPropsForSimpleMap extends Props {
  triggerMoveMapCoordinates?: boolean;
  showBottomPanel?: (showPanel: boolean) => void;
  isFromSimpleCarto?: boolean;
}

const AroundMeMap: FC<ExtendedPropsForSimpleMap> = ({
  region,
  coordinates,
  zoomOrAltitude,
  poiArray,
  selectedPoiIndex,
  userLocation,
  updateRegion,
  resetCoordinates,
  updatePoiArray,
  updateSelectedPoiIndex,
  displayList,
  triggerMoveMapCoordinates,
  showBottomPanel,
  isFromSimpleCarto,
}) => {
  const mapRef = useRef<MapView>();
  const [currentRegion, setCurrentRegion] = useState<Region | undefined>();

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
  const [
    triggerSearchAfterRegionChangeComplete,
    setTriggerSearchAfterRegionChangeComplete,
  ] = useState(false);
  const [heightOfMapView, setHeightOfMapView] = useState(0);
  const [widthOfMapView, setWidthOfMapView] = useState(0);

  useEffect(() => {
    if (
      (isFromSimpleCarto &&
        coordinates &&
        triggerMoveMapCoordinates != undefined) ||
      coordinates
    ) {
      setIsLoading(false);
      setShowAddressDetails(false);
      setTriggerSearchAfterRegionChangeComplete(true);
      moveMapToCoordinates(coordinates.latitude, coordinates.longitude);

      // Une fois qu'on a placé la carto la première fois après la Recherche, on reset les coordinates car ils ne seront plus utilisés
      // et cela évite de redéclencher ce useEffect
      if (resetCoordinates) resetCoordinates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates, triggerMoveMapCoordinates]);

  useEffect(() => {
    if (selectedPoiIndex !== -1) {
      setTimeout(() => {
        setTriggerSearchAfterRegionChangeComplete(false);
        moveMapToCoordinates(
          poiArray[selectedPoiIndex].position_latitude,
          poiArray[selectedPoiIndex].position_longitude
        );
        setAddressDetails(poiArray[selectedPoiIndex]);
        setShowAddressDetails(true);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPoiIndex]);

  const locationIcon = "../../assets/images/carto/current_location.png";
  const currentUserLocationIcon = require(locationIcon);

  const setMapViewRef = useCallback((ref: MapView) => {
    mapRef.current = ref;
  }, []);

  const handleFetchedPois = useCallback(
    (pois: Poi[]) => {
      if (pois.length === 0) {
        showSnackBarWithMessage(Labels.aroundMe.noAddressFound);
      }

      setShowDisplayListButton(pois.length > 0);
      updatePoiArray(pois);
      setShowAddressDetails(false);
      setIsLoading(false);
      if (showBottomPanel) showBottomPanel(true);
    },
    [showBottomPanel, updatePoiArray]
  );

  const chooseFilterMessage = useCallback(() => {
    setTimeout(
      () => {
        setIsLoading(false);
      },
      PLATFORM_IS_IOS ? 500 : 0
    );
    showSnackBarWithMessage(Labels.aroundMe.chooseFilter);
  }, []);

  const onViewMapLayout = useCallback((event: LayoutChangeEvent) => {
    setHeightOfMapView(Math.round(event.nativeEvent.layout.height));
    setWidthOfMapView(Math.round(event.nativeEvent.layout.width));
  }, []);

  const onRegionChangeComplete = useCallback(
    (newRegion: Region) => {
      void StorageUtils.storeObjectValue(
        StorageKeysConstants.cartoSavedCoordinates,
        { latitude: newRegion.latitude, longitude: newRegion.longitude }
      );
      setCurrentRegion(newRegion);
      if (updateRegion) updateRegion(newRegion);

      if (triggerSearchAfterRegionChangeComplete) {
        setTriggerSearchAfterRegionChangeComplete(false);

        setIsLoading(true);
        AroundMeUtils.triggerFunctionAfterTimeout(() => {
          setTriggerSearchByGpsCoords(!triggerSearchByGpsCoords);
        });
      }
      setShowSnackBar(false);
      setShowRelaunchResearchButton(true);
    },
    [
      triggerSearchAfterRegionChangeComplete,
      triggerSearchByGpsCoords,
      updateRegion,
    ]
  );

  const showSnackBarWithMessage = (message: string) => {
    setSnackBarMessage(message);
    setShowSnackBar(true);
  };

  const onSnackBarDismiss = useCallback(() => {
    setShowSnackBar(false);
  }, []);

  const moveMapToCoordinates = useCallback(
    (latitude: number, longitude: number) => {
      const markerCoordinates: LatLng = {
        latitude,
        longitude,
      };
      mapRef.current?.animateCamera(
        {
          /* iOS utilise le paramètre altitude
        et Android le paramètre zoom */
          altitude: zoomOrAltitude,
          center: markerCoordinates,
          zoom: zoomOrAltitude,
        },
        { duration: AroundMeConstants.ANIMATE_CAMERA_DURATION }
      );
    },
    [zoomOrAltitude]
  );

  const onMarkerClick = useCallback(
    (poiIndex: number) => {
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
    },
    [moveMapToCoordinates, poiArray, updateSelectedPoiIndex]
  );

  const onDisplayMap = useCallback(() => {
    if (displayList) displayList();
  }, [displayList]);

  const onRelaunchSearch = useCallback(() => {
    KeyboardUtils.dismissKeyboard();
    setShowRelaunchResearchButton(false);
    setShowAddressDetails(false);
    updateSelectedPoiIndex(-1);
    if (showBottomPanel) showBottomPanel(false);
    if (currentRegion) {
      setIsLoading(true);
      setTriggerSearchByGpsCoords(!triggerSearchByGpsCoords);
    }
  }, [
    currentRegion,
    showBottomPanel,
    triggerSearchByGpsCoords,
    updateSelectedPoiIndex,
  ]);

  const onHideDetails = useCallback(() => {
    updateSelectedPoiIndex(-1);
    setShowAddressDetails(false);
  }, [updateSelectedPoiIndex]);

  const onMapLoaderTouchEnd = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <TrackerHandler
        screenName={TrackerUtils.TrackingEvent.CARTO}
        actionName={trackerAction}
      />
      <View style={styles.fetchPois}>
        <FetchPois
          triggerSearchByGpsCoords={triggerSearchByGpsCoords}
          region={currentRegion}
          setFetchedPois={handleFetchedPois}
          chooseFilterMessage={chooseFilterMessage}
        />
      </View>
      <View style={styles.map} onLayout={onViewMapLayout}>
        <MapView
          minZoomLevel={AroundMeConstants.MAPVIEW_MIN_ZOOM_LEVEL}
          ref={setMapViewRef}
          provider={PROVIDER_DEFAULT}
          style={
            PLATFORM_IS_IOS
              ? { height: heightOfMapView, width: widthOfMapView }
              : styles.map
          }
          initialRegion={region}
          region={currentRegion}
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
          setDisplayMap={onDisplayMap}
          relaunchSearch={onRelaunchSearch}
          showRelaunchResearchButton={showRelaunchResearchButton}
          setIsLoading={setIsLoading}
          showDisplayListButton={showDisplayListButton}
          hideDisplayListButton={isFromSimpleCarto}
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
            poiArray.length > 1 && isFromSimpleCarto
              ? styles.addressDetailsBigMarginBottom
              : styles.addressDetailsSmallMarginBottom,
          ]}
        >
          <AddressDetails
            details={addressDetails}
            isClickedMarker={true}
            hideDetails={onHideDetails}
          />
        </View>
      )}
      {isLoading && <MapLoader onTouchEnd={onMapLoaderTouchEnd} />}
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
  addressDetailsBigMarginBottom: {
    marginBottom: SCREEN_HEIGHT / 9,
  },
  addressDetailsSmallMarginBottom: {
    marginBottom: Margins.smaller,
  },
  currentLocationMarker: {
    height: Margins.default,
    width: Margins.default,
  },
  fetchPois: {
    flex: 0,
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
