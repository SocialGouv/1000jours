/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { Poi } from "@socialgouv/nos1000jours-lib";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import * as React from "react";
import type { LayoutChangeEvent } from "react-native";
import { Image, StyleSheet } from "react-native";
import type { LatLng, Region } from "react-native-maps";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

import BulbIcon from "../../assets/images/carto/bulb.svg";
import {
  AddressDetails,
  AroundMeFilter,
  CustomMapMarker,
  FetchPoisCoords,
  SearchByPostalCode,
  SlidingUpPanelAddressesList,
  SubmitNewFilter,
  TrackerHandler,
} from "../../components";
import {
  CustomButton,
  CustomSnackbar,
  Icomoon,
  IcomoonIcons,
  Loader,
  TitleH1,
  View,
} from "../../components/baseComponents";
import {
  AroundMeConstants,
  Labels,
  StorageKeysConstants,
} from "../../constants";
import {
  PLATFORM_IS_ANDROID,
  PLATFORM_IS_IOS,
  SCREEN_HEIGHT,
} from "../../constants/platform.constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import { KeyboardUtils, StorageUtils, TrackerUtils } from "../../utils";

const TabAroundMeScreen: FC = () => {
  const mapRef = useRef<MapView>();
  const [postalCodeInput, setPostalCodeInput] = useState("");
  const [postalCodeInvalid, setPostalCodeInvalid] = useState(false);
  const [region, setRegion] = useState<Region>(
    AroundMeConstants.INITIAL_REGION
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
  const [poisArray, setPoisArray] = useState<Poi[]>([]);
  const [selectedPoiIndex, setSelectedPoiIndex] = useState(-1);
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const [addressDetails, setAddressDetails] = useState<Poi>();
  const [showRelaunchResearchButton, setShowRelaunchResearchButton] =
    useState(true);
  const [showAddressesList, setShowAddressesList] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showSubmitNewFilterModal, setShowSubmitNewFilterModal] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mapWasOnlyTouched, setMapWasOnlyTouched] = useState(false);
  const [currentUserLocation, setCurrentUserLocation] = useState<LatLng | null>(
    null
  );
  const [searchIsReady, setSearchIsReady] = useState(false);
  const [locationPermissionIsGranted, setLocationPermissionIsGranted] =
    useState(false);
  const [heightOfMapView, setHeightOfMapView] = useState(0);
  const [widthOfMapView, setWidthOfMapView] = useState(0);

  const [trackerAction, setTrackerAction] = useState("");

  const currentUserLocatioIcon = require("../../assets/images/carto/current_location.png");

  useEffect(() => {
    const checkIfSavedRegion = async () => {
      const savedRegion: Region | undefined = await StorageUtils.getObjectValue(
        StorageKeysConstants.cartoSavedRegion
      );
      if (!savedRegion) return;
      mapRef.current?.animateToRegion(savedRegion);
      setMoveToRegionBecauseOfPCResearch(true);
    };
    void checkIfSavedRegion();
  }, []);

  const setMapViewRef = (ref: MapView) => {
    mapRef.current = ref;
  };

  const handleFetchedPois = async (pois: Poi[]) => {
    const isFirstLaunch = await StorageUtils.getObjectValue(
      StorageKeysConstants.cartoIsFirstLaunch
    );

    if (
      isFirstLaunch &&
      pois.length >= AroundMeConstants.MAX_NUMBER_POI_WITHOUT_FILTER
    ) {
      setShowFilter(true);
    } else {
      if (pois.length === 0) {
        showSnackBarWithMessage(Labels.aroundMe.noAddressFound);
      }

      setPoisArray(pois);
      setShowAddressesList(true);
      setShowAddressDetails(false);
    }

    setIsLoading(false);
    void StorageUtils.storeObjectValue(
      StorageKeysConstants.cartoIsFirstLaunch,
      false
    );
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
      setIsLoading(true);
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
      setShowAddressesList(true);
    }
    setPostalCodeInvalid(false);
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
    setTrackerAction(TrackerUtils.TrackingEvent.CARTO_CLICK_POI);
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
      <TrackerHandler
        screenName={TrackerUtils.TrackingEvent.CARTO}
        actionName={trackerAction}
      />
      <View style={{ flex: 0 }}>
        <FetchPoisCoords
          triggerSearchByGpsCoords={triggerSearchByGpsCoords}
          postalCode={postalCodeInput}
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
          searchIsReady={searchIsReady}
          setIsLoading={setIsLoading}
          locationPermissionIsGranted={locationPermissionIsGranted}
        />
        <View style={styles.topContainer}>
          <TitleH1
            title={Labels.aroundMe.title}
            description={Labels.aroundMe.instruction}
            animated={false}
          />
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
            setShowAddressDetails(false);
            setRegion(newRegion);
            mapRef.current?.animateToRegion(newRegion);
            setMoveToRegionBecauseOfPCResearch(true);
            setSelectedPoiIndex(-1);
          }}
          showSnackBarWithMessage={showSnackBarWithMessage}
          setIsLoading={setIsLoading}
          updateUserLocation={async (newRegion: Region | undefined) => {
            if (newRegion) {
              setSelectedPoiIndex(-1);
              setCurrentUserLocation({
                latitude: newRegion.latitude,
                longitude: newRegion.longitude,
              });
              setRegion(newRegion);
              mapRef.current?.animateToRegion(newRegion);
            } else {
              const savedRegion: Region | undefined =
                await StorageUtils.getObjectValue(
                  StorageKeysConstants.cartoSavedRegion
                );
              moveMapToCoordinates(
                savedRegion?.latitude ??
                  AroundMeConstants.COORDINATE_PARIS.latitude,
                savedRegion?.longitude ??
                  AroundMeConstants.COORDINATE_PARIS.longitude
              );
            }
            setMoveToRegionBecauseOfPCResearch(true);
          }}
          setSearchIsReady={setSearchIsReady}
          setLocationPermissionIsGranted={setLocationPermissionIsGranted}
        />
      </View>
      <View
        style={{ flex: 1 }}
        onLayout={(event: LayoutChangeEvent) => {
          setHeightOfMapView(Math.round(event.nativeEvent.layout.height));
          setWidthOfMapView(Math.round(event.nativeEvent.layout.width));
        }}
      >
        <MapView
          minZoomLevel={AroundMeConstants.MAPVIEW_MIN_ZOOM_LEVEL}
          ref={setMapViewRef}
          provider={PROVIDER_DEFAULT}
          style={{ height: heightOfMapView, width: widthOfMapView }}
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
          <CustomButton
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
          <CustomButton
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
            <CustomButton
              buttonStyle={styles.relaunchSearchButton}
              title={Labels.aroundMe.relaunchSearch}
              titleStyle={styles.relaunchSearchButtonText}
              rounded={true}
              action={() => {
                KeyboardUtils.dismissKeyboard();
                setIsLoading(true);
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
            poisArray.length > 1
              ? styles.addressDetailsBigMarginBottom
              : styles.addressDetailsSmallMarginBottom,
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
      {showAddressesList &&
        poisArray.length > 1 && ( // Si la liste des POI n'a qu'un élément, aucune utilité d'afficher le panel puisqu'il y a la cartouche avec les détails
          <SlidingUpPanelAddressesList
            poisArray={poisArray}
            centerOnMarker={(poiIndex: number) => {
              setSelectedPoiIndex(poiIndex);
              moveMapToCoordinates(
                poisArray[poiIndex].position_latitude,
                poisArray[poiIndex].position_longitude
              );
              setAddressDetails(poisArray[poiIndex]);
              setShowAddressDetails(true);
            }}
          />
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
    paddingTop: Paddings.default,
  },
});

export default TabAroundMeScreen;
