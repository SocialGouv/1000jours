/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import type { NativeScrollEvent } from "react-native";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import {
  ScrollView,
  TouchableOpacity as TouchableOpacityAndroid,
} from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import BottomSheet from "reanimated-bottom-sheet";

import { CommonText } from "../../components";
import { View } from "../../components/Themed";
import {
  AroundMeConstants,
  Colors,
  FontWeight,
  Labels,
  Margins,
  Sizes,
} from "../../constants";
import { PLATFORM_IS_IOS } from "../../constants/platform.constants";
import type { CartographiePoisFromDB } from "../../type";
import AddressDetails from "./addressDetails.component";

interface Props {
  poisArray: CartographiePoisFromDB[];
  centerOnMarker: (markerIndex: number) => void;
}

const SlidingUpPanelAddressesList: React.FC<Props> = ({
  poisArray,
  centerOnMarker,
}) => {
  const sheetRef = useRef<BottomSheet>(null);
  const [currentPanelSnapPoint, setCurrentPanelSnapPoint] = useState(2);
  const [currentEndIndex, setCurrentEndIndex] = useState(
    AroundMeConstants.PAGINATION_NUMBER_ADDRESSES_LIST
  );
  const [poisToDisplay, setPoisToDisplay] = useState<CartographiePoisFromDB[]>(
    poisArray.slice(0, currentEndIndex)
  );

  useEffect(() => {
    setCurrentEndIndex(AroundMeConstants.PAGINATION_NUMBER_ADDRESSES_LIST);
    setPoisToDisplay(
      poisArray.slice(0, AroundMeConstants.PAGINATION_NUMBER_ADDRESSES_LIST)
    );
  }, [poisArray]);

  const height = Dimensions.get("window").height;

  const handleScroll = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const thresholdBottom = 20;

    if (contentOffset.y === 0) {
      const nextSnapPoint = currentPanelSnapPoint - 1;
      sheetRef.current?.snapTo(nextSnapPoint);
      setCurrentPanelSnapPoint(nextSnapPoint === 0 ? 2 : nextSnapPoint);
    } else if (
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

  const renderCard = (poi: CartographiePoisFromDB) => {
    return (
      <Card style={styles.card}>
        <AddressDetails details={poi} />
      </Card>
    );
  };

  const renderContent = () => {
    return (
      <View style={styles.slidingUpPanelView}>
        <View style={styles.swipeIndicator} />
        <CommonText style={styles.addressesListLabel}>
          {Labels.aroundMe.addressesListLabelStart} {poisArray.length}{" "}
          {Labels.aroundMe.addressesListLabelEnd}
        </CommonText>
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
                  centerOnMarker(poiIndex);
                  sheetRef.current?.snapTo(0);
                }}
              >
                {renderCard(poi)}
              </TouchableOpacity>
            ) : (
              <TouchableOpacityAndroid
                key={poiIndex}
                onPress={() => {
                  centerOnMarker(poiIndex);
                  sheetRef.current?.snapTo(0);
                }}
              >
                {renderCard(poi)}
              </TouchableOpacityAndroid>
            )
          )}
        </ScrollView>
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
  card: {
    borderBottomColor: Colors.cardGrey,
    borderBottomWidth: 1,
    margin: Margins.smaller,
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
