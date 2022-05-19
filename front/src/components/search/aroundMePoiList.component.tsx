import type { Poi } from "@socialgouv/nos1000jours-lib";
import type { FC } from "react";
import { useCallback, useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import type { Region } from "react-native-maps";

import { AroundMeConstants, Labels } from "../../constants";
import { PLATFORM_IS_IOS } from "../../constants/platform.constants";
import { Colors, FontWeight, Margins, Sizes } from "../../styles";
import AroundMeMapHeader from "../aroundMe/aroundMeMapHeader.component";
import FetchPois from "../aroundMe/fetchPois.component";
import PoiList from "../aroundMe/poiList.component";
import { CommonText, CustomSnackbar, MapLoader, View } from "../baseComponents";

interface Props {
  region: Region;
  poiArray: Poi[];
  displayMap: () => void;
  updatePoiArray: (poiArray: Poi[]) => void;
  updateSelectedPoiIndex: (selectedPoiIndex: number) => void;
}

const AroundMePoiList: FC<Props> = ({
  region,
  poiArray,
  displayMap,
  updatePoiArray,
  updateSelectedPoiIndex,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [triggerSearchByGpsCoords, setTriggerSearchByGpsCoords] =
    useState(false);

  // Snackbar
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handlePois = useCallback(
    (pois: Poi[]) => {
      updatePoiArray(pois);
      setIsLoading(false);
    },
    [updatePoiArray]
  );

  const onChooseFilterMessage = useCallback(() => {
    setTimeout(
      () => {
        setIsLoading(false);
      },
      PLATFORM_IS_IOS ? 500 : 0
    );
    showSnackBarWithMessage(Labels.aroundMe.chooseFilter);
  }, []);

  const navigateToMap = useCallback(
    (poiIndex: number) => {
      updateSelectedPoiIndex(poiIndex);
      displayMap();
    },
    [displayMap, updateSelectedPoiIndex]
  );

  const showSnackBarWithMessage = (message: string) => {
    setSnackBarMessage(message);
    setShowSnackBar(true);
  };

  const onSnackBarDismiss = useCallback(() => {
    setShowSnackBar(false);
  }, []);

  const onRelaunchSearchButtonPressed = useCallback(() => {
    setIsLoading(true);
    updateSelectedPoiIndex(-1);
    setTriggerSearchByGpsCoords(!triggerSearchByGpsCoords);
  }, [triggerSearchByGpsCoords, updateSelectedPoiIndex]);

  return (
    <View style={styles.flex1}>
      <FetchPois
        triggerSearchByGpsCoords={triggerSearchByGpsCoords}
        region={region}
        setFetchedPois={handlePois}
        chooseFilterMessage={onChooseFilterMessage}
      />
      <AroundMeMapHeader
        headerStyle={styles.headerButtonsMapView}
        displayMap={false}
        setDisplayMap={displayMap}
        relaunchSearch={onRelaunchSearchButtonPressed}
        showRelaunchResearchButton={false}
        setIsLoading={setIsLoading}
      />
      <CommonText style={styles.addressesListLabel}>
        {Labels.aroundMe.addressesListLabelStart} {poiArray.length}{" "}
        {Labels.aroundMe.addressesListLabelEnd}
      </CommonText>
      <View style={styles.flex1}>
        <PoiList poisArray={poiArray} onPoiPress={navigateToMap} /> 
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
      {isLoading && <MapLoader />}
    </View>
  );
};

const styles = StyleSheet.create({
  addressesListLabel: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.bold,
    marginHorizontal: Margins.default,
    marginVertical: Margins.smaller,
  },
  filterView: {
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: Margins.smaller,
  },
  headerButtonsMapView: {
    flexDirection: "row",
    margin: Margins.smaller,
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
  slidingUpPanelScrollView: {
    marginHorizontal: Margins.default,
  },
  flex1: {
    flex: 1,
  },
  swipeIndicator: {
    alignSelf: "center",
    backgroundColor: Colors.navigation,
    borderRadius: Sizes.xs,
    height: Sizes.xxxxxxs,
    marginBottom: Margins.smaller,
    marginTop: Margins.default,
    width: Sizes.xxxl,
  },
});

export default AroundMePoiList;
