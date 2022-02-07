/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Poi } from "@socialgouv/nos1000jours-lib";
import * as React from "react";
import { useRef, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";

import { Labels } from "../../constants";
import { Colors, FontWeight, Margins, Sizes } from "../../styles";
import { CommonText, View } from "../baseComponents";
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

  const handlePanel = () => {
    const nextSnapPoint = currentPanelSnapPointIndex - 1;
    sheetRef.current?.snapTo(nextSnapPoint);
    setCurrentPanelSnapPointIndex(nextSnapPoint === 0 ? 2 : nextSnapPoint);
  };

  const goToMarkerAndMinimizeSlider = (poiIndex: number) => {
    centerOnMarker(poiIndex);
    sheetRef.current?.snapTo(0);
  };

  const renderContent = () => {
    return (
      <View style={styles.slidingUpPanelView}>
        <View style={styles.swipeIndicator} />
        <CommonText style={styles.addressesListLabel}>
          {Labels.aroundMe.addressesListLabelStart} {poisArray.length}{" "}
          {Labels.aroundMe.addressesListLabelEnd}
        </CommonText>
        <PoiList
          poisArray={poisArray}
          onPoiPress={goToMarkerAndMinimizeSlider}
          handlePanel={handlePanel}
        />
      </View>
    );
  };

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[height / 9.5, height / 2.5, height - 170]}
      borderRadius={10}
      renderContent={renderContent}
    />
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

export default SlidingUpPanelAddressesList;
