import type { Poi } from "@socialgouv/nos1000jours-lib";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  ScrollView,
  TouchableOpacity as TouchableOpacityAndroid,
} from "react-native-gesture-handler";
import { Card } from "react-native-paper";

import { AroundMeConstants } from "../../constants";
import { PLATFORM_IS_IOS } from "../../constants/platform.constants";
import { Colors, Margins } from "../../styles";
import AddressDetails from "./addressDetails.component";

interface Props {
  poisArray: Poi[];
  onPoiPress: (poiIndex: number) => void;
  handlePanel?: () => void;
}

const PoiList: FC<Props> = ({ poisArray, onPoiPress, handlePanel }) => {
  const [currentEndIndex, setCurrentEndIndex] = useState(
    AroundMeConstants.PAGINATION_NUMBER_ADDRESSES_LIST
  );
  const [poisToDisplay, setPoisToDisplay] = useState<Poi[]>(
    poisArray.slice(0, currentEndIndex)
  );

  useEffect(() => {
    setCurrentEndIndex(AroundMeConstants.PAGINATION_NUMBER_ADDRESSES_LIST);
    setPoisToDisplay(
      poisArray.slice(0, AroundMeConstants.PAGINATION_NUMBER_ADDRESSES_LIST)
    );
  }, [poisArray]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { layoutMeasurement, contentOffset, contentSize } =
        event.nativeEvent;
      const thresholdBottom = 20;

      if (contentOffset.y === 0 && handlePanel) handlePanel();

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
    },
    [currentEndIndex, handlePanel, poisArray, poisToDisplay]
  );

  const onPoiPressed = useCallback(
    (poiIndex: number) => () => {
      onPoiPress(poiIndex);
    },
    [onPoiPress]
  );
  const renderCard = (poi: Poi) => (
    <Card style={styles.card}>
      <AddressDetails details={poi} />
    </Card>
  );

  return (
    <ScrollView onScroll={handleScroll} scrollEventThrottle={0}>
      {poisToDisplay.map((poi, poiIndex) =>
        PLATFORM_IS_IOS ? (
          <TouchableOpacity key={poiIndex} onPress={onPoiPressed(poiIndex)}>
            {renderCard(poi)}
          </TouchableOpacity>
        ) : (
          <TouchableOpacityAndroid
            key={poiIndex}
            onPress={onPoiPressed(poiIndex)}
          >
            {renderCard(poi)}
          </TouchableOpacityAndroid>
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderBottomColor: Colors.cardGrey,
    borderBottomWidth: 1,
    margin: Margins.smaller,
  },
});

export default PoiList;
