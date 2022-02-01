import type { RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { Poi } from "@socialgouv/nos1000jours-lib";
import { useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import type { LatLng, Region } from "react-native-maps";

import { AroundMeMap, AroundMePoiList } from "../../components";
import { BackButton, View } from "../../components/baseComponents";
import { Margins } from "../../styles";
import type { TabSearchParamList } from "../../types";

interface Props {
  route: RouteProp<
    {
      params: { region: Region; poisArray: Poi[]; userLocation?: LatLng };
    },
    "params"
  >;
  navigation: StackNavigationProp<TabSearchParamList>;
}

const AroundMeMapAndList: React.FC<Props> = ({ navigation, route }) => {
  const [region, setRegion] = useState<Region>(route.params.region);
  const [poisArray, setPoisArray] = useState<Poi[]>(route.params.poisArray);
  const [selectedPoiIndex, setSelectedPoiIndex] = useState(-1);
  const [currentUserLocation] = useState<LatLng | undefined>(
    route.params.userLocation
  );

  const [displayMap, setDisplayMap] = useState(true);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.flexStart}>
        <BackButton
          action={() => {
            navigation.goBack();
          }}
        />
      </View>
      {displayMap ? (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: { width: "40%" },
  flexStart: {
    alignItems: "flex-start",
    marginTop: Margins.smaller,
  },
  mainContainer: {
    flex: 1,
  },
});

export default AroundMeMapAndList;
