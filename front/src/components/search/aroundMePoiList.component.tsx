import type { Poi } from "@socialgouv/nos1000jours-lib";
import type { FC } from "react";
import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import type { Region } from "react-native-maps";

import { Labels } from "../../constants";
import { Colors, FontWeight, Margins, Sizes } from "../../styles";
import AroundMeMapHeader from "../aroundMe/aroundMeMapHeader.component";
import FetchPois from "../aroundMe/fetchPois.component";
import PoiList from "../aroundMe/poiList.component";
import { CommonText, Loader, View } from "../baseComponents";

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

  const handlePois = (pois: Poi[]) => {
    updatePoiArray(pois);
    setIsLoading(false);
  };

  const navigateToMap = (poiIndex: number) => {
    updateSelectedPoiIndex(poiIndex);
    displayMap();
  };

  return (
    <View style={styles.slidingUpPanelView}>
      <FetchPois
        triggerSearchByGpsCoords={triggerSearchByGpsCoords}
        region={region}
        setFetchedPois={handlePois}
      />
      <AroundMeMapHeader
        headerStyle={styles.headerButtonsMapView}
        displayMap={false}
        setDisplayMap={() => {
          displayMap();
        }}
        relaunchSearch={() => {
          setIsLoading(true);
          setTriggerSearchByGpsCoords(!triggerSearchByGpsCoords);
        }}
        showRelaunchResearchButton={false}
        setIsLoading={setIsLoading}
      />
      <View style={styles.swipeIndicator} />
      <CommonText style={styles.addressesListLabel}>
        {Labels.aroundMe.addressesListLabelStart} {poiArray.length}{" "}
        {Labels.aroundMe.addressesListLabelEnd}
      </CommonText>
      <PoiList poisArray={poiArray} onPoiPress={navigateToMap} />
      {isLoading && <Loader />}
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
  slidingUpPanelView: {
    borderTopEndRadius: Sizes.xxxl,
    borderTopStartRadius: Sizes.xxxl,
    height: "100%",
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
