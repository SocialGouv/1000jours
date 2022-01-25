/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Poi } from "@socialgouv/nos1000jours-lib";
import * as React from "react";
import { useEffect, useState } from "react";
import type { NativeScrollEvent } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  ScrollView,
  TouchableOpacity as TouchableOpacityAndroid,
} from "react-native-gesture-handler";
import type { Region } from "react-native-maps";
import { Card } from "react-native-paper";

import { AroundMeConstants, Labels } from "../../constants";
import { PLATFORM_IS_IOS } from "../../constants/platform.constants";
import { Colors, FontWeight, Margins, Sizes } from "../../styles";
import * as RootNavigation from "../../utils/rootNavigation.util";
import SharedCartoData from "../../utils/sharedCartoData.class";
import AddressDetails from "../aroundMe/addressDetails.component";
import AroundMeFilter from "../aroundMe/aroundMeFilter.component";
import FetchPois from "../aroundMe/fetchPois.component";
import {
  CommonText,
  CustomButton,
  Icomoon,
  IcomoonIcons,
  Loader,
  View,
} from "../baseComponents";

interface Props {
  region: Region;
}

const PoiList: React.FC<Props> = ({ region }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [poisArray, setPoisArray] = useState<Poi[]>([]);
  const [currentRegion, setCurrentRegion] = useState(region);
  const [currentEndIndex, setCurrentEndIndex] = useState(
    AroundMeConstants.PAGINATION_NUMBER_ADDRESSES_LIST
  );
  const [poisToDisplay, setPoisToDisplay] = useState<Poi[]>(
    poisArray.slice(0, currentEndIndex)
  );
  const [showFilter, setShowFilter] = useState(false);

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    setCurrentEndIndex(AroundMeConstants.PAGINATION_NUMBER_ADDRESSES_LIST);
    setPoisToDisplay(
      poisArray.slice(0, AroundMeConstants.PAGINATION_NUMBER_ADDRESSES_LIST)
    );
  }, [poisArray]);

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

  const renderCard = (poi: Poi) => (
    <Card style={styles.card}>
      <AddressDetails details={poi} />
    </Card>
  );

  const handlePois = (pois: Poi[]) => {
    setPoisArray(pois);
    setIsLoading(false);
  };
  return (
    <View style={styles.slidingUpPanelView}>
      <FetchPois
        triggerSearchByGpsCoords={trigger}
        region={region}
        setFetchedPois={handlePois}
      />
      <View style={styles.swipeIndicator} />
      <CommonText style={styles.addressesListLabel}>
        {Labels.aroundMe.addressesListLabelStart} {poisArray.length}{" "}
        {Labels.aroundMe.addressesListLabelEnd}
      </CommonText>
      <View style={styles.filterView}>
        <CustomButton
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
                void RootNavigation.navigate("aroundMeMap", {
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
                void RootNavigation.navigate("aroundMeMap", {
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
          if (filterWasSaved) {
            setIsLoading(true);
            setTrigger(!trigger);
          }
        }}
      />
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
