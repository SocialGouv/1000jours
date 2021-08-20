/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import { useState } from "react";
import type { ImageSourcePropType } from "react-native";
import { Image, StyleSheet, View } from "react-native";
import type { LatLng } from "react-native-maps";
import { Marker } from "react-native-maps";

import { AroundMeConstants, Margins } from "../../constants";

interface Props {
  coordinates: LatLng;
  poiIndex: number;
  poiCategorie: AroundMeConstants.PoiCategorieEnum;
  selectedPoiIndex: number;
  onMarkerClick: (markerIndex: number) => void;
  poiTotal: number;
  stopLoading: () => void;
}

const CustomMapMarker: React.FC<Props> = ({
  coordinates,
  poiIndex,
  poiCategorie,
  selectedPoiIndex,
  onMarkerClick,
  poiTotal,
  stopLoading,
}) => {
  const [trackView, setTrackView] = useState(true);

  const proNotSelectedIcon = require("../../assets/images/carto/icon_pro_not_selected.png");
  const proSelectedIcon = require("../../assets/images/carto/icon_pro_selected.png");
  const structureNotSelectedIcon = require("../../assets/images/carto/icon_structure_not_selected.png");
  const structureSelectedIcon = require("../../assets/images/carto/icon_structure_selected.png");

  const getPinIcon = (
    poiCategory: AroundMeConstants.PoiCategorieEnum,
    isSelected: boolean
  ): ImageSourcePropType => {
    const isStructure =
      poiCategory === AroundMeConstants.PoiCategorieEnum.structure;
    if (isSelected) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return isStructure ? structureSelectedIcon : proSelectedIcon;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return isStructure ? structureNotSelectedIcon : proNotSelectedIcon;
    }
  };

  return (
    <Marker
      tracksViewChanges={trackView}
      coordinate={coordinates}
      style={styles.markerView}
      key={poiIndex}
      onPress={() => {
        onMarkerClick(poiIndex);
      }}
    >
        <Image
          source={getPinIcon(poiCategorie, poiIndex === selectedPoiIndex)}
          style={
            poiIndex === selectedPoiIndex
              ? styles.googleMapMarkerSelected
              : styles.googleMapMarkerNotSelected
          }
          onLoadEnd={() => {
            const tempTrackView = poiIndex === selectedPoiIndex;
            setTrackView(tempTrackView);
            if (poiIndex === poiTotal) stopLoading();
          }}
        />
    </Marker>
  );
};

const styles = StyleSheet.create({
  googleMapMarkerNotSelected: {
    height: Margins.largest,
    resizeMode: "contain",
  },
  googleMapMarkerSelected: {
    height: Margins.evenMoreLargest,
    resizeMode: "contain",
  },
  markerView: {
    alignItems: "center",
    backgroundColor: "transparent",
    height: Margins.evenMoreLargest,
    justifyContent: "flex-end",
    width: Margins.evenMoreLargest,
  },
});

export default CustomMapMarker;
