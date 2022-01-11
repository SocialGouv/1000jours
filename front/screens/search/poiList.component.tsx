/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { gql, useLazyQuery } from "@apollo/client";
import type { Poi } from "@socialgouv/nos1000jours-lib";
import { GET_POIS_BY_GPSCOORDS } from "@socialgouv/nos1000jours-lib";
import * as React from "react";
import { useEffect, useState } from "react";
import { NativeScrollEvent, Share } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  ScrollView,
  TouchableOpacity as TouchableOpacityAndroid,
} from "react-native-gesture-handler";
import type { Region } from "react-native-maps";
import { Card } from "react-native-paper";

import { Button, CommonText, Icomoon, IcomoonIcons } from "../../components";
import { View } from "../../components/Themed";
import {
  AroundMeConstants,
  Colors,
  FetchPoliciesConstants,
  FontWeight,
  Labels,
  Margins,
  Sizes,
} from "../../constants";
import { PLATFORM_IS_IOS } from "../../constants/platform.constants";
import { AroundMeUtils } from "../../utils";
import * as RootNavigation from "../../utils/rootNavigation.util";
import SharedCartoData from "../../utils/sharedCartoData.class";
import AddressDetails from "../aroundMe/addressDetails.component";
import AroundMeFilter from "../aroundMe/aroundMeFilter.component";

interface Props {
  region: Region;
}

const PoiList: React.FC<Props> = ({ region }) => {
  const [getPoisByGpsCoords] = useLazyQuery(gql(GET_POIS_BY_GPSCOORDS), {
    fetchPolicy: FetchPoliciesConstants.NO_CACHE,
    onCompleted: (data) => {
      const { searchPois } = data as {
        searchPois: Poi[];
      };
      SharedCartoData.fetchedPois = searchPois;
      setPoisArray(searchPois);
    },
  });

  const [poisArray, setPoisArray] = useState<Poi[]>([]);
  const [currentRegion, setCurrentRegion] = useState(region);
  const [currentEndIndex, setCurrentEndIndex] = useState(
    AroundMeConstants.PAGINATION_NUMBER_ADDRESSES_LIST
  );
  const [poisToDisplay, setPoisToDisplay] = useState<Poi[]>(
    poisArray.slice(0, currentEndIndex)
  );
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setCurrentEndIndex(AroundMeConstants.PAGINATION_NUMBER_ADDRESSES_LIST);
    setPoisToDisplay(
      poisArray.slice(0, AroundMeConstants.PAGINATION_NUMBER_ADDRESSES_LIST)
    );
  }, [poisArray]);

  useEffect(() => {
    void searchByGPSCoords();
  }, []);

  const searchByGPSCoords = async () => {
    const topLeftPoint = AroundMeUtils.getLatLngPoint(
      region,
      AroundMeConstants.LatLngPointType.topLeft
    );
    const bottomRightPoint = AroundMeUtils.getLatLngPoint(
      region,
      AroundMeConstants.LatLngPointType.bottomRight
    );

    const variables = {
      // etapes: savedFilters?.etapes ? savedFilters.etapes : [],
      lat1: topLeftPoint.latitude,
      lat2: bottomRightPoint.latitude,
      long1: topLeftPoint.longitude,
      long2: bottomRightPoint.longitude,
      // thematiques: savedFilters?.thematiques ? savedFilters.thematiques : [],
      // types: savedFilters?.types ? savedFilters.types : [],
    };
    await getPoisByGpsCoords({
      variables,
    });
  };

  const handleScroll = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const thresholdBottom = 20;

    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - thresholdBottom
    ) {
      const newEndIndex = currentEndIndex + currentEndIndex;
      setPoisToDisplay(
        poisToDisplay.concat(poisArray.slice(currentEndIndex, newEndIndex))
      );
      setCurrentEndIndex(newEndIndex);
    }
  };

  const renderCard = (poi: Poi) => {
    return (
      <Card style={styles.card}>
        <AddressDetails details={poi} />
      </Card>
    );
  };

  return (
    <View style={styles.slidingUpPanelView}>
      <View style={styles.swipeIndicator} />
      <CommonText style={styles.addressesListLabel}>
        {Labels.aroundMe.addressesListLabelStart} {poisArray.length}{" "}
        {Labels.aroundMe.addressesListLabelEnd}
      </CommonText>
      <View style={styles.filterView}>
        <Button
          buttonStyle={styles.relaunchSearchButton}
          title={Labels.listArticles.filters}
          titleStyle={styles.relaunchSearchButtonText}
          rounded={true}
          icon={
            <Icomoon
              name={IcomoonIcons.filtrer}
              size={Sizes.sm}
              color={Colors.primaryBlue}
            />
          }
          action={() => {
            setShowFilter(true);
          }}
        />
      </View>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          handleScroll(nativeEvent);
        }}
      >
        {poisToDisplay.map((poi, poiIndex) =>
          PLATFORM_IS_IOS ? (
            <TouchableOpacity
              key={poiIndex}
              onPress={() => {
                SharedCartoData.fetchedPois = poisToDisplay;
                SharedCartoData.region = currentRegion;
                SharedCartoData.selectedPoiIndex = poiIndex;
                RootNavigation.navigate("aroundMeMap", {
                  updatePoiList: () => {
                    setPoisArray(SharedCartoData.fetchedPois);
                    setCurrentRegion(SharedCartoData.region);
                  },
                });
              }}
            >
              {renderCard(poi)}
            </TouchableOpacity>
          ) : (
            <TouchableOpacityAndroid
              key={poiIndex}
              onPress={() => {
                SharedCartoData.fetchedPois = poisToDisplay;
                SharedCartoData.region = currentRegion;
                SharedCartoData.selectedPoiIndex = poiIndex;
                RootNavigation.navigate("aroundMeMap", {
                  updatePoiList: () => {
                    setPoisArray(SharedCartoData.fetchedPois);
                    setCurrentRegion(SharedCartoData.region);
                  },
                });
              }}
            >
              {renderCard(poi)}
            </TouchableOpacityAndroid>
          )
        )}
      </ScrollView>
      <AroundMeFilter
        visible={showFilter}
        hideModal={(filterWasSaved: boolean) => {
          setShowFilter(false);
          // if (filterWasSaved) {
          // if (PLATFORM_IS_ANDROID) setIsLoading(true);
          // setTriggerSearchByGpsCoords(!triggerSearchByGpsCoords);
          // }
        }}
      />
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
  card: {
    borderBottomColor: Colors.cardGrey,
    borderBottomWidth: 1,
    margin: Margins.smaller,
  },
  filterView: {
    backgroundColor: "transparent",
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

export default PoiList;
