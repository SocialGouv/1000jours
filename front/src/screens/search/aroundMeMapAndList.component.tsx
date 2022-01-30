/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { StackNavigationProp } from "@react-navigation/stack";
import type { Poi } from "@socialgouv/nos1000jours-lib";
import { useRef, useState } from "react";
import * as React from "react";
import { Image, StyleSheet } from "react-native";
import type { LatLng, Region } from "react-native-maps";
import type MapView from "react-native-maps";
import { Marker, PROVIDER_DEFAULT } from "react-native-maps";

import BulbIcon from "../../assets/images/carto/bulb.svg";
import {
  AddressDetails,
  AroundMeFilter,
  AroundMeMap,
  AroundMeMapHeader,
  AroundMePoiList,
  CustomMapMarker,
  FetchPois,
  SubmitNewFilter,
} from "../../components";
import {
  BackButton,
  CustomButton,
  CustomSnackbar,
  Icomoon,
  IcomoonIcons,
  Loader,
  View,
} from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
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
import type { TabSearchParamList } from "../../types";
import { KeyboardUtils, StorageUtils, TrackerUtils } from "../../utils";
import SharedCartoData from "../../utils/sharedCartoData.class";

interface Props {
  navigation: StackNavigationProp<TabSearchParamList>;
  // route: RouteProp<{ params: { updatePoiList: () => void } }, "params">;
}

const AroundMeMapAndList: React.FC<Props> = ({ navigation }) => {
  const mapRef = useRef<MapView>();

  // Data from SharedCartoData
  const [region, setRegion] = useState<Region>(
    SharedCartoData.region // AroundMeConstants.INITIAL_REGION
  );
  const [poisArray, setPoisArray] = useState<Poi[]>(
    SharedCartoData.fetchedPois
  );
  const [selectedPoiIndex, setSelectedPoiIndex] = useState(
    SharedCartoData.selectedPoiIndex
  );
  const [currentUserLocation] = useState<LatLng | null>(
    SharedCartoData.userLocation
  );

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

    SharedCartoData.fetchedPois = pois;
    setPoisArray(pois);
    setShowAddressDetails(false);

    setIsLoading(false);
  };

  const onRegionChangeComplete = (newRegion: Region) => {
    void StorageUtils.storeObjectValue(
      StorageKeysConstants.cartoSavedRegion,
      newRegion
    );
    setRegion(newRegion);
    SharedCartoData.region = newRegion;
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
        poisArray[poiIndex].position_latitude,
        poisArray[poiIndex].position_longitude
      );
    }

    setAddressDetails(poisArray[poiIndex]);
    setPoisArray(poisArray);
    setShowAddressDetails(true);
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

  return displayMap ? (
    <AroundMeMap
      region={region}
      poiArray={poisArray}
      selectedPoiIndex={selectedPoiIndex}
      userLocation={currentUserLocation}
      updateRegion={setRegion}
      updatePoiArray={setPoisArray}
      updateSelectedPoiIndex={setSelectedPoiIndex}
      displayList={() => {
        setDisplayMap(false);
      }}
    />
  ) : (
    <AroundMePoiList
      region={region}
      poiArray={poisArray}
      displayMap={() => {
        setDisplayMap(true);
      }}
      updatePoiArray={setPoisArray}
      updateSelectedPoiIndex={setSelectedPoiIndex}
    />
  );

  // return (
  //   <View>
  //     {/* <View style={styles.flexStart}>
  //       <BackButton
  //         action={() => {
  //           navigation.goBack();
  //         }}
  //       />
  //     </View> */}
  //     {displayMap ? (
  //       <AroundMeMap
  //         region={region}
  //         poiArray={poisArray}
  //         selectedPoiIndex={selectedPoiIndex}
  //         userLocation={currentUserLocation}
  //         updateRegion={setRegion}
  //         updatePoiArray={setPoisArray}
  //         updateSelectedPoiIndex={setSelectedPoiIndex}
  //         displayList={() => {
  //           setDisplayMap(false);
  //         }}
  //       />
  //     ) : (
  //       <AroundMePoiList
  //         region={region}
  //         poiArray={poisArray}
  //         displayMap={() => {
  //           setDisplayMap(true);
  //         }}
  //         updatePoiArray={setPoisArray}
  //         updateSelectedPoiIndex={setSelectedPoiIndex}
  //       />
  //     )}
  //   </View>
  // );
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
  flexStart: {
    alignItems: "flex-start",
    margin: Margins.smaller,
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

export default AroundMeMapAndList;
