/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Poi } from "@socialgouv/nos1000jours-lib";
import type { FC } from "react";
import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import type { Region } from "react-native-maps";

import { Labels } from "../../constants";
import { Colors, FontWeight, Margins, Sizes } from "../../styles";
import * as RootNavigation from "../../utils/rootNavigation.util";
import SharedCartoData from "../../utils/sharedCartoData.class";
import AroundMeFilter from "../aroundMe/aroundMeFilter.component";
import FetchPois from "../aroundMe/fetchPois.component";
import PoiList from "../aroundMe/poiList.component";
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

const AroundMePoiList: FC<Props> = ({ region }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [poisArray, setPoisArray] = useState<Poi[]>([]);
  const [currentRegion, setCurrentRegion] = useState(region);
  const [showFilter, setShowFilter] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const handlePois = (pois: Poi[]) => {
    setPoisArray(pois);
    setIsLoading(false);
  };

  const navigateToMap = (poiIndex: number) => {
    SharedCartoData.fetchedPois = poisArray;
    SharedCartoData.region = currentRegion;
    SharedCartoData.selectedPoiIndex = poiIndex;

    // TODO Warning à cause du fait qu'on passe une fonction en paramètre, à modifier pendant le refactoring de la navigation
    // void RootNavigation.navigate("aroundMeMapAndList", {
    //   updatePoiList: () => {
    //     setPoisArray(SharedCartoData.fetchedPois);
    //     setCurrentRegion(SharedCartoData.region);
    //   },
    // });
  };

  return (
    <View style={styles.slidingUpPanelView}>
      <FetchPois
        triggerSearchByGpsCoords={trigger}
        region={region}
        setFetchedPois={handlePois}
        launchFetchAtInit
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
      <PoiList poisArray={poisArray} onPoiPress={navigateToMap} />
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
    marginVertical: Margins.smaller
  },
  filterView: {
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: Margins.smaller
  },
  relaunchSearchButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    marginHorizontal: Margins.smallest
  },
  relaunchSearchButtonText: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xxs
  },
  slidingUpPanelScrollView: {
    marginHorizontal: Margins.default
  },
  slidingUpPanelView: {
    borderTopEndRadius: Sizes.xxxl,
    borderTopStartRadius: Sizes.xxxl,
    height: "100%"
  },
  swipeIndicator: {
    alignSelf: "center",
    backgroundColor: Colors.navigation,
    borderRadius: Sizes.xs,
    height: Sizes.xxxxxxs,
    marginBottom: Margins.smaller,
    marginTop: Margins.default,
    width: Sizes.xxxl
  }
});

export default AroundMePoiList;
