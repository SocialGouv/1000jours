import { useMatomo } from "matomo-tracker-react-native";
import { useEffect, useRef, useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import type { Region } from "react-native-maps";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

import {
  Button,
  CustomSnackbar,
  Icomoon,
  IcomoonIcons,
  Loader,
  TitleH1,
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
  StorageKeysConstants,
} from "../../constants";
import {
  PLATFORM_IS_IOS,
  SCREEN_HEIGHT,
} from "../../constants/platform.constants";
import type { CartographiePoisFromDB } from "../../type";
import { KeyboardUtils, StorageUtils, TrackerUtils } from "../../utils";
import AddressDetails from "./addressDetails.component";
import AroundMeFilter from "./aroundMeFilter.component";
import SearchByPostalCode from "./searchByPostalCode.component";
import SlidingUpPanelAddressesList from "./slidingUpPanelAddressesList.component";

const TabAroundMeScreen: React.FC = () => {
  const { trackScreenView } = useMatomo();
  trackScreenView(TrackerUtils.TrackingEvent.CARTO);
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
  const [poisArray, setPoisArray] = useState<CartographiePoisFromDB[]>([]);
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const [addressDetails, setAddressDetails] =
    useState<CartographiePoisFromDB>();
  const [showRelaunchResearchButton, setShowRelaunchResearchButton] =
    useState(true);
  const [showAddressesList, setShowAddressesList] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleFetchedPois = (pois: CartographiePoisFromDB[]) => {
    if (pois.length === 0) {
      showSnackBarWithMessage(Labels.aroundMe.noAddressFound);
    }
    setPoisArray(pois);
    setShowAddressesList(true);
    setShowAddressDetails(false);
    setIsLoading(false);
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
  };

  const showSnackBarWithMessage = (message: string) => {
    setSnackBarMessage(message);
    setShowSnackBar(true);
  };

  const onSnackBarDismiss = () => {
    setShowSnackBar(false);
  };

  const onMarkerClick = (markerIndex: number) => {
    setAddressDetails(poisArray[markerIndex]);
    setShowAddressDetails(true);
    setMoveToRegionBecauseOfMarkerClick(true);
  };

  return (
    <View style={styles.mainContainer}>
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
        }}
        showSnackBarWithMessage={showSnackBarWithMessage}
        setIsLoading={setIsLoading}
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
          {poisArray.map((poi, poiIndex) => (
            <View key={poiIndex}>
              <Marker
                coordinate={{
                  latitude: Number(poi.position_latitude),
                  longitude: Number(poi.position_longitude),
                }}
                pinColor="red"
                onPress={() => {
                  onMarkerClick(poiIndex);
                }}
              />
            </View>
          ))}
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
                setIsLoading(true);
                setShowRelaunchResearchButton(false);
                setShowAddressDetails(false);
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
        <View style={styles.addressDetails}>
          <AddressDetails
            details={addressDetails}
            isClickedMarker={true}
            hideDetails={() => {
              setShowAddressDetails(false);
            }}
          />
        </View>
      )}
      {showAddressesList &&
        poisArray.length > 1 && ( // Si la liste des POI n'a qu'un élément, aucune utilité d'afficher le panel puisqu'il y a la cartouche avec les détails
          <SlidingUpPanelAddressesList poisArray={poisArray} />
        )}
      <AroundMeFilter
        visible={showFilter}
        showModal={() => {
          setShowFilter(true);
        }}
        hideModal={(filterWasSaved: boolean) => {
          setShowFilter(false);
          if (filterWasSaved) {
            setIsLoading(true);
            setTriggerSearchByGpsCoords(!triggerSearchByGpsCoords);
          }
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
    marginBottom: SCREEN_HEIGHT / 9,
    marginHorizontal: Margins.smaller,
    position: "absolute",
    right: 0,
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
  filterView: {
    backgroundColor: "transparent",
    left: 0,
    margin: Margins.smaller,
    position: "absolute",
    top: 0,
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
