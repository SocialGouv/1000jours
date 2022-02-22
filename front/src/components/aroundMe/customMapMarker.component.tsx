/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import type { ImageSourcePropType } from "react-native";
import { Image, StyleSheet } from "react-native";
import type { LatLng } from "react-native-maps";
import { Marker } from "react-native-maps";

import { AroundMeConstants } from "../../constants";
import { Margins } from "../../styles";

interface Props {
  coordinates: LatLng;
  poiIndex: number;
  poiCategorie: AroundMeConstants.PoiCategorieEnum;
  selectedPoiIndex: number;
  onMarkerClick: (markerIndex: number) => void;
}

const CustomMapMarker: React.FC<Props> = ({
  coordinates,
  poiIndex,
  poiCategorie,
  selectedPoiIndex,
  onMarkerClick,
}) => {
  const proNotSelectedIcon: ImageSourcePropType = require("../../assets/images/carto/icon_pro_not_selected.png");
  const proSelectedIcon: ImageSourcePropType = require("../../assets/images/carto/icon_pro_selected.png");
  const structureNotSelectedIcon: ImageSourcePropType = require("../../assets/images/carto/icon_structure_not_selected.png");
  const structureSelectedIcon: ImageSourcePropType = require("../../assets/images/carto/icon_structure_selected.png");

  const [trackView, setTrackView] = useState(false);
  const [image, setImage] = useState<ImageSourcePropType>(proNotSelectedIcon);

  useEffect(() => {
    setTrackView(true);
    setImage(getPinIcon(poiCategorie, poiIndex === selectedPoiIndex));
    const timeout = setTimeout(() => {
      setTrackView(false);
    }, 200);
    return () => {
      clearInterval(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);

  const onMarkerPress = useCallback(
    (index: number) => () => {
      onMarkerClick(index);
    },
    [onMarkerClick]
  );

  const getPinIcon = (
    poiCategory: AroundMeConstants.PoiCategorieEnum,
    isSelected: boolean
  ): ImageSourcePropType => {
    const isStructure =
      poiCategory === AroundMeConstants.PoiCategorieEnum.structure;
    if (isSelected) {
      return isStructure ? structureSelectedIcon : proSelectedIcon;
    } else {
      return isStructure ? structureNotSelectedIcon : proNotSelectedIcon;
    }
  };

  return (
    <Marker
      tracksViewChanges={trackView}
      coordinate={coordinates}
      style={styles.markerView}
      key={poiIndex}
      onPress={onMarkerPress(poiIndex)}
    >
      <Image
        source={image}
        style={
          poiIndex === selectedPoiIndex
            ? styles.googleMapMarkerSelected
            : styles.googleMapMarkerNotSelected
        }
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
