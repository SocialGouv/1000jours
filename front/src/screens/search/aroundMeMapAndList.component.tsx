import type { RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { Poi } from "@socialgouv/nos1000jours-lib";
import { useCallback, useState } from "react";
import * as React from "react";
import { AccessibilityInfo, StyleSheet } from "react-native";
import type { LatLng, Region } from "react-native-maps";

import { AroundMeMap, AroundMePoiList } from "../../components";
import { BackButton, View } from "../../components/baseComponents";
import { Margins } from "../../styles";
import type { TabSearchParamList } from "../../types";

interface Props {
  route: RouteProp<
    {
      params: {
        coordinates: LatLng;
        displayUserLocation: boolean;
        zoomOrAltitude: number;
      };
    },
    "params"
  >;
  navigation: StackNavigationProp<TabSearchParamList>;
}

const AroundMeMapAndList: React.FC<Props> = ({ navigation, route }) => {
  // La Region sera définie grâce au AroundMeMap pour s'adapter à la taille de l'écran
  const [region, setRegion] = useState<Region | undefined>();
  const [coordinates, setCoordinates] = useState<LatLng | undefined>(
    route.params.coordinates
  );
  const [poisArray, setPoisArray] = useState<Poi[]>([]);
  const [selectedPoiIndex, setSelectedPoiIndex] = useState(-1);
  const [displayMap, setDisplayMap] = useState(true);
  const [userLocation] = useState(
    route.params.displayUserLocation ? coordinates : undefined
  );

  const onBackButtonPressed = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onResetCoordinates = useCallback(() => {
    setCoordinates(undefined);
  }, []);

  const updateDisplayMap = useCallback(
    (display: boolean) => () => {
      setDisplayMap(display);
    },
    []
  );

  const updatePoiArray = useCallback((newPoiArray: Poi[]) => {
    setPoisArray(newPoiArray);

    // Si le lecteur d'écran est activé, on affiche la liste des POI une fois que la première recherche a été faite
    const goToListIfScreenReaderIsEnabled = async () => {
      const isScreenReaderEnabled =
        await AccessibilityInfo.isScreenReaderEnabled();
      if (isScreenReaderEnabled) {
        setDisplayMap(false);
      }
    };
    setTimeout(() => {
      void goToListIfScreenReaderIsEnabled();
    }, 500);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.flexStart}>
        <BackButton action={onBackButtonPressed} />
      </View>
      {displayMap ? (
        <AroundMeMap
          region={region}
          coordinates={coordinates}
          zoomOrAltitude={route.params.zoomOrAltitude}
          poiArray={poisArray}
          selectedPoiIndex={selectedPoiIndex}
          userLocation={userLocation}
          updateRegion={setRegion}
          resetCoordinates={onResetCoordinates}
          updatePoiArray={updatePoiArray}
          updateSelectedPoiIndex={setSelectedPoiIndex}
          displayList={updateDisplayMap(false)}
        />
      ) : (
        region && (
          <AroundMePoiList
            region={region}
            poiArray={poisArray}
            displayMap={updateDisplayMap(true)}
            updatePoiArray={setPoisArray}
            updateSelectedPoiIndex={setSelectedPoiIndex}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: { width: "40%" },
  flexStart: {
    alignItems: "flex-start",
    marginLeft: Margins.default,
    marginTop: Margins.smaller,
  },
  mainContainer: {
    flex: 1,
  },
});

export default AroundMeMapAndList;
