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
import SharedCartoData from "../../utils/sharedCartoData.class";

interface Props {
  navigation: StackNavigationProp<TabSearchParamList>;
  // route: RouteProp<{ params: { updatePoiList: () => void } }, "params">;
}

const AroundMeMapAndList: React.FC<Props> = ({ navigation }) => {
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
