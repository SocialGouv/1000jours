/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import BottomSheet from "@gorhom/bottom-sheet";
import type { Poi } from "@socialgouv/nos1000jours-lib";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

import { Margins, Sizes } from "../../styles";
import { View } from "../baseComponents";
import AroundMePoiResultInformation from "./aroundMePoiResultInformation.component";
import PoiList from "./poiList.component";

interface Props {
  poisArray: Poi[];
  centerOnMarker: (markerIndex: number) => void;
}

const SlidingUpPanelAddressesList: React.FC<Props> = ({
  poisArray,
  centerOnMarker,
}) => {
  const sheetRef = useRef<BottomSheet>(null);
  // 2 est le nombre d'éléments dans le tableau de snapPoints de la BottomSheet view (voir ligne 131)
  const [currentPanelSnapPointIndex, setCurrentPanelSnapPointIndex] =
    useState(2);
  const height = Dimensions.get("window").height;

  const handlePanel = useCallback(() => {
    const nextSnapPoint = currentPanelSnapPointIndex - 1;
    sheetRef.current?.snapToIndex(nextSnapPoint);
    setCurrentPanelSnapPointIndex(nextSnapPoint === 0 ? 2 : nextSnapPoint);
  }, [currentPanelSnapPointIndex]);

  const goToMarkerAndMinimizeSlider = useCallback(
    (poiIndex: number) => {
      centerOnMarker(poiIndex);
      sheetRef.current?.snapToIndex(0);
    },
    [centerOnMarker]
  );

  const renderContent = useCallback(() => {
    return (
      <View style={styles.slidingUpPanelView}>
        <AroundMePoiResultInformation numberOfPoisFound={poisArray.length} />
        <PoiList
          poisArray={poisArray}
          onPoiPress={goToMarkerAndMinimizeSlider}
          handlePanel={handlePanel}
        />
      </View>
    );
  }, [goToMarkerAndMinimizeSlider, handlePanel, poisArray]);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[height / 9.5, height / 2.5, height - 170]}
    >
      {renderContent}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  slidingUpPanelScrollView: {
    marginHorizontal: Margins.default,
  },
  slidingUpPanelView: {
    borderTopEndRadius: Sizes.xxxl,
    borderTopStartRadius: Sizes.xxxl,
    height: "100%",
  },
});

export default SlidingUpPanelAddressesList;
