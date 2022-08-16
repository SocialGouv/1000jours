import type { Poi } from "@socialgouv/nos1000jours-lib";
import type { FC } from "react";
import { useCallback, useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import type { Region } from "react-native-maps";

import { Margins } from "../../styles";
import AroundMeMapHeader from "../aroundMe/aroundMeMapHeader.component";
import AroundMePoiResultInformation from "../aroundMe/aroundMePoiResultInformation.component";
import FetchPois from "../aroundMe/fetchPois.component";
import PoiList from "../aroundMe/poiList.component";
import { MapLoader, View } from "../baseComponents";

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

  const handlePois = useCallback(
    (pois: Poi[]) => {
      updatePoiArray(pois);
      setIsLoading(false);
    },
    [updatePoiArray]
  );

  const navigateToMap = useCallback(
    (poiIndex: number) => {
      updateSelectedPoiIndex(poiIndex);
      displayMap();
    },
    [displayMap, updateSelectedPoiIndex]
  );

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
      />
      <AroundMeMapHeader
        headerStyle={styles.headerButtonsMapView}
        displayMap={false}
        setDisplayMap={displayMap}
        relaunchSearch={onRelaunchSearchButtonPressed}
        showRelaunchResearchButton={false}
        setIsLoading={setIsLoading}
      />
      <AroundMePoiResultInformation numberOfPoisFound={poiArray.length} />
      <View style={styles.flex1}>
        <PoiList poisArray={poiArray} onPoiPress={navigateToMap} />
      </View>
      {isLoading && <MapLoader />}
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  headerButtonsMapView: {
    flexDirection: "row",
    margin: Margins.smaller,
  },
});

export default AroundMePoiList;
