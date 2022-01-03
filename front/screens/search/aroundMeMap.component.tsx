/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { Poi } from "@socialgouv/nos1000jours-lib";
import { useMatomo } from "matomo-tracker-react-native";
import { useEffect, useRef, useState } from "react";
import * as React from "react";
import { Image, StyleSheet } from "react-native";
import type { LatLng, Region } from "react-native-maps";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

import BulbIcon from "../../assets/images/carto/bulb.svg";
import {
  Button,
  CustomSnackbar,
  Icomoon,
  IcomoonIcons,
  Loader,
} from "../../components";
import { View } from "../../components/Themed";
import {
  AroundMeConstants,
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
  StorageKeysConstants,
} from "../../constants";
import {
  PLATFORM_IS_IOS,
  SCREEN_HEIGHT,
} from "../../constants/platform.constants";
import type { TabSearchParamList } from "../../types";
import { KeyboardUtils, StorageUtils, TrackerUtils } from "../../utils";
import AddressDetails from "../aroundMe/addressDetails.component";
import AroundMeFilter from "../aroundMe/aroundMeFilter.component";
import CustomMapMarker from "../aroundMe/customMapMarker.component";
import SubmitNewFilter from "../aroundMe/submitNewFilter.component";

interface Props {
  route: RouteProp<
    {
      params: { region: Region; fetchedPois: Poi[]; selectedPoiIndex: number };
    },
    "params"
  >;
  navigation: StackNavigationProp<TabSearchParamList>;
}

const AroundMeMap: React.FC<Props> = ({ route, navigation }) => {
  const { trackScreenView } = useMatomo();
  const mapRef = useRef<MapView>();
  const [region, setRegion] = useState<Region>(
    route.params.region // AroundMeConstants.INITIAL_REGION
  );
  const [moveToRegionBecauseOfPCResearch, setMoveToRegionBecauseOfPCResearch] =
    useState(false);
  const [
    moveToRegionBecauseOfMarkerClick,
    setMoveToRegionBecauseOfMarkerClick,
  ] = useState(false);
  // Variable utilisée pour trigger le useEffect lors du relancement de la Recherche
  const [triggerSearchByGpsCoords, setTriggerSearchByGpsCoords] =
    useState(false);
  const [poisArray, setPoisArray] = useState<Poi[]>(route.params.fetchedPois);
  const [selectedPoiIndex, setSelectedPoiIndex] = useState(
    route.params.selectedPoiIndex
  );
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const [addressDetails, setAddressDetails] = useState<Poi>();
  const [showRelaunchResearchButton, setShowRelaunchResearchButton] =
    useState(true);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showSubmitNewFilterModal, setShowSubmitNewFilterModal] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mapWasOnlyTouched, setMapWasOnlyTouched] = useState(false);
  const [currentUserLocation, setCurrentUserLocation] = useState<LatLng | null>(
    null
  );

  const currentUserLocatioIcon = require("../../assets/images/carto/current_location.png");

  useEffect(() => {
    trackScreenView(TrackerUtils.TrackingEvent.CARTO);
    // const checkIfSavedRegion = async () => {
    //   const savedRegion: Region | undefined = await StorageUtils.getObjectValue(
    //     StorageKeysConstants.cartoSavedRegion
    //   );
    //   if (!savedRegion) return;
    //   mapRef.current?.animateToRegion(savedRegion);
    //   setMoveToRegionBecauseOfPCResearch(true);
    // };
    // void checkIfSavedRegion();
    setTimeout(() => {
      moveMapToCoordinates(
        poisArray[selectedPoiIndex].position_latitude,
        poisArray[selectedPoiIndex].position_longitude
      );
      setAddressDetails(poisArray[selectedPoiIndex]);
      setShowAddressDetails(true);
    }, 1000);
  }, []);

  const setMapViewRef = (ref: MapView) => {
    mapRef.current = ref;
  };

  const onRegionChangeComplete = (newRegion: Region) => {
    void StorageUtils.storeObjectValue(
      StorageKeysConstants.cartoSavedRegion,
      newRegion
    );
    setRegion(newRegion);
    /* Lorsqu'on lance une recherche par CP, le moveToRegionBecauseOfPCResearch est mis à true
    et donc on ne cache pas directement la snackBar si elle a été affichée (en cas d'erreur) */
    if (moveToRegionBecauseOfPCResearch) {
      // setIsLoading(true);
      setMoveToRegionBecauseOfPCResearch(false);
      /* sur iOS, cette fonction est appelée juste avant que la carte ait terminé de se déplacer,
      du coup on se retrouve avec des mauvaises adresses qui ne s'affichent pas sur la bonne zone,
      donc on est obligé de mettre un petit timeout */
      setTimeout(
        () => {
          setTriggerSearchByGpsCoords(!triggerSearchByGpsCoords);
        },
        PLATFORM_IS_IOS ? 1000 : 0
      );
    } else {
      setShowSnackBar(false);
    }

    /* Lorsqu'on clique sur un marqueur, le moveToRegionBecauseOfMarkerClick est mis à true
    et donc on ne cache pas directement le AddressDetails s'il a été affiché */
    if (moveToRegionBecauseOfMarkerClick) {
      setMoveToRegionBecauseOfMarkerClick(false);
    } else {
      // setShowAddressesList(true);
    }
    // setPostalCodeInvalid(false);
    setShowRelaunchResearchButton(true);
    setMapWasOnlyTouched(true);
  };

  const showSnackBarWithMessage = (message: string) => {
    setSnackBarMessage(message);
    setShowSnackBar(true);
  };

  const onSnackBarDismiss = () => {
    setShowSnackBar(false);
  };

  const onMarkerClick = (poiIndex: number) => {
    trackScreenView(TrackerUtils.TrackingEvent.CARTO_CLICK_POI);
    if (PLATFORM_IS_IOS) {
      moveMapToCoordinates(
        poisArray[poiIndex].position_latitude,
        poisArray[poiIndex].position_longitude
      );
    }

    setAddressDetails(poisArray[poiIndex]);
    setPoisArray(poisArray);
    setShowAddressDetails(true);
    setMoveToRegionBecauseOfMarkerClick(true);
    setSelectedPoiIndex(poiIndex);
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
      <View style={styles.topContainer}>
        <Button
          buttonStyle={styles.backButton}
          title={Labels.buttons.back}
          rounded={false}
          icon={
            <Icomoon
              name={IcomoonIcons.retour}
              size={14}
              color={Colors.primaryBlue}
            />
          }
          action={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={styles.map}>
        <MapView
          minZoomLevel={AroundMeConstants.MAPVIEW_MIN_ZOOM_LEVEL}
          ref={setMapViewRef}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          initialRegion={region}
          onRegionChange={() => {
            setMapWasOnlyTouched(false);
          }}
          onRegionChangeComplete={onRegionChangeComplete}
          onTouchEndCapture={() => {
            if (mapWasOnlyTouched) {
              setSelectedPoiIndex(-1);
              setShowAddressDetails(false);
            }
          }}
        >
          {poisArray.map((poi, poiIndex) => (
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
          {currentUserLocation && (
            <Marker
              coordinate={{
                latitude: currentUserLocation.latitude,
                longitude: currentUserLocation.longitude,
              }}
            >
              <Image
                source={currentUserLocatioIcon}
                style={styles.currentLocationMarker}
              />
            </Marker>
          )}
        </MapView>
        <View style={styles.filterView}>
          <Button
            buttonStyle={styles.relaunchSearchButton}
            title={Labels.listArticles.filters}
            titleStyle={styles.relaunchSearchButtonText}
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
          <Button
            buttonStyle={styles.submitNewFilterButton}
            title=""
            rounded={true}
            icon={<BulbIcon />}
            action={() => {
              setShowSubmitNewFilterModal(true);
            }}
          />
        </View>
        {showRelaunchResearchButton && (
          <View style={styles.relaunchSearchView}>
            <Button
              buttonStyle={styles.relaunchSearchButton}
              title={Labels.aroundMe.relaunchSearch}
              titleStyle={styles.relaunchSearchButtonText}
              rounded={true}
              action={() => {
                KeyboardUtils.dismissKeyboard();
                // setIsLoading(true);
                setShowRelaunchResearchButton(false);
                setShowAddressDetails(false);
                setSelectedPoiIndex(-1);
                setTriggerSearchByGpsCoords(!triggerSearchByGpsCoords);
              }}
            />
          </View>
        )}
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
              setSelectedPoiIndex(-1);
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
            // if (PLATFORM_IS_ANDROID) setIsLoading(true);
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
  addressDetailsBigMarginBottom: {
    marginBottom: SCREEN_HEIGHT / 9,
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
  filterView: {
    backgroundColor: "transparent",
    flexDirection: "row",
    left: 0,
    margin: Margins.smaller,
    position: "absolute",
    top: 0,
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
  relaunchSearchButton: {
    backgroundColor: Colors.white,
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
