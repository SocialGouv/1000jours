/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { Poi } from "@socialgouv/nos1000jours-lib";
import { useRef, useState } from "react";
import * as React from "react";
import { Image, StyleSheet } from "react-native";
import type { LatLng, Region } from "react-native-maps";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

import BulbIcon from "../../assets/images/carto/bulb.svg";
import {
  AroundMeConstants,
  Labels,
  StorageKeysConstants,
} from "../../constants";
import {
  PLATFORM_IS_ANDROID,
  PLATFORM_IS_IOS,
} from "../../constants/platform.constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import { KeyboardUtils, StorageUtils, TrackerUtils } from "../../utils";
import {
  AddressDetails,
  AroundMeFilter,
  CustomMapMarker,
  FetchPois,
  SubmitNewFilter,
} from "..";
import {
  CustomButton,
  CustomSnackbar,
  Icomoon,
  IcomoonIcons,
  Loader,
  View,
} from "../baseComponents";
import TrackerHandler from "../tracker/trackerHandler.component";

interface Props {
  region: Region;
  poiArray: Poi[];
  selectedPoiIndex: number;
  userLocation: LatLng | null;
  updateRegion: (region: Region) => void;
  updatePoiArray: (poiArray: Poi[]) => void;
  updateSelectedPoiIndex: (selectedPoiIndex: number) => void;
}

const AroundMeMap: React.FC<Props> = ({
  region,
  poiArray,
  selectedPoiIndex,
  userLocation,
  updateRegion,
  updatePoiArray,
  updateSelectedPoiIndex,
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

  // Filter and "submit new filter" modals
  const [showFilter, setShowFilter] = useState(false);
  const [showSubmitNewFilterModal, setShowSubmitNewFilterModal] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [trackerAction, setTrackerAction] = useState("");
  const [displayMap, setDisplayMap] = useState(true);
  const [triggerSearchByGpsCoords, setTriggerSearchByGpsCoords] =
    useState(false);

  const currentUserLocatioIcon = require("../../assets/images/carto/current_location.png");

  const setMapViewRef = (ref: MapView) => {
    mapRef.current = ref;
  };

  const handleFetchedPois = (pois: Poi[]) => {
    if (pois.length === 0) {
      showSnackBarWithMessage(Labels.aroundMe.noAddressFound);
    }

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
      { duration: 500 }
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
                onMarkerClick={(index: number) => {
                  onMarkerClick(index);
                }}
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
                source={currentUserLocatioIcon}
                style={styles.currentLocationMarker}
              />
            </Marker>
          )}
        </MapView>
        <View style={styles.headerButtonsView}>
          <CustomButton
            buttonStyle={styles.headerButton}
            title={Labels.listArticles.filters}
            titleStyle={styles.headerButtonTitle}
            rounded={true}
            icon={
              <Icomoon
                name={IcomoonIcons.filtrer}
                size={Sizes.sm}
                color={Colors.primaryBlue}
              />
            }
            action={() => {
              setShowFilter(true);
            }}
          />
          <CustomButton
            buttonStyle={styles.submitNewFilterButton}
            title=""
            rounded={true}
            icon={<BulbIcon />}
            action={() => {
              setShowSubmitNewFilterModal(true);
            }}
          />
          <View style={styles.headerButtonsRightPartView}>
            <CustomButton
              buttonStyle={styles.headerButton}
              title={Labels.aroundMe.displayListButton}
              titleStyle={styles.headerButtonTitle}
              rounded={true}
              action={() => {
                setDisplayMap(!displayMap);
              }}
            />
            {showRelaunchResearchButton && (
              <CustomButton
                buttonStyle={[styles.headerButton, styles.buttonMarginTop]}
                title={Labels.aroundMe.relaunchSearch}
                titleStyle={styles.headerButtonTitle}
                rounded={true}
                action={() => {
                  KeyboardUtils.dismissKeyboard();
                  setIsLoading(true);
                  setShowRelaunchResearchButton(false);
                  setShowAddressDetails(false);
                  updateSelectedPoiIndex(-1);
                  setTriggerSearchByGpsCoords(!triggerSearchByGpsCoords);
                }}
              />
            )}
          </View>
        </View>
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
      <AroundMeFilter
        visible={showFilter}
        hideModal={(filterWasSaved: boolean) => {
          setShowFilter(false);
          if (filterWasSaved) {
            if (PLATFORM_IS_ANDROID) setIsLoading(true);
            setTriggerSearchByGpsCoords(!triggerSearchByGpsCoords);
          }
        }}
      />
      <SubmitNewFilter
        visible={showSubmitNewFilterModal}
        hideModal={() => {
          setShowSubmitNewFilterModal(false);
        }}
      />
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
  addressesListLabel: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.bold,
    marginHorizontal: Margins.default,
    marginVertical: Margins.smaller,
  },
  backButton: { width: "40%" },
  buttonFlexEnd: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  buttonMarginTop: {
    marginTop: Margins.smaller,
  },
  card: {
    backgroundColor: Colors.cardGrey,
    borderWidth: 1,
    margin: Margins.smaller,
  },
  columnView: {
    flexDirection: "column",
  },
  currentLocationMarker: {
    height: Margins.default,
    width: Margins.default,
  },
  fontButton: {
    fontSize: Sizes.xxs,
  },
  googleMapMarkerNotSelected: {
    height: Margins.largest,
    resizeMode: "contain",
  },
  googleMapMarkerSelected: {
    height: Margins.evenMoreLargest,
    resizeMode: "contain",
  },
  headerButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    marginHorizontal: Margins.smallest,
  },
  headerButtonTitle: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xxs,
  },
  headerButtonsInListView: {
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: Margins.smaller,
  },
  headerButtonsRightPartView: {
    alignItems: "flex-end",
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    position: "absolute",
    right: 0,
  },
  headerButtonsView: {
    backgroundColor: "transparent",
    flexDirection: "row",
    height: "15%",
    left: 0,
    margin: Margins.smaller,
    position: "absolute",
    right: 0,
    top: 0,
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
  markerView: {
    alignItems: "center",
    backgroundColor: "transparent",
    height: Margins.evenMoreLargest,
    justifyContent: "flex-end",
    width: Margins.evenMoreLargest,
  },
  submitNewFilterButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
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
  },
});

export default AroundMeMap;
