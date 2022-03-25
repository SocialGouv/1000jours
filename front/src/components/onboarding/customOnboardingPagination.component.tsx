import _ from "lodash";
import type { FC } from "react";
import { useCallback } from "react";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { Labels } from "../../constants";
import { Colors, Margins, Sizes } from "../../styles";
import { CommonText } from "../baseComponents";

interface OnboardingPaginationProps {
  currentIndex: number;
  slidesNumber: number;
  scrollToIndex: (index: number) => void;
}

export const CustomPagination: FC<OnboardingPaginationProps> = ({
  currentIndex,
  slidesNumber,
  scrollToIndex,
}) => {
  const onPaginationPressed = useCallback(
    (index: number) => () => {
      scrollToIndex(index);
    },
    [scrollToIndex]
  );

  return (
    <View style={styles.rowView}>
      {_.range(slidesNumber).map((value) => (
        <TouchableWithoutFeedback
          key={value}
          onPress={onPaginationPressed(value)}
          accessibilityLabel={`${Labels.onboarding.screenNumber}${value + 1}`}
          style={{ minHeight: Sizes.minButton }}
        >
          <View
            style={[
              styles.defaultPaginationStyle,
              value === currentIndex
                ? styles.selectedIndex
                : styles.notSelectedIndex,
            ]}
          />
          {value === currentIndex && (
            <CommonText style={styles.textStyle}>{value + 1}</CommonText>
          )}
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  defaultPaginationStyle: {
    alignSelf: "center",
    borderRadius: Sizes.xxxl,
    height: Sizes.xxxs,
    marginHorizontal: Margins.smallest,
    width: Sizes.xxxxl,
  },
  notSelectedIndex: {
    backgroundColor: Colors.onBoardingSwiperFlatList.paginationDefault,
  },
  rowView: {
    alignSelf: "center",
    flexDirection: "row",
  },
  selectedIndex: {
    backgroundColor: Colors.onBoardingSwiperFlatList.paginationActive,
  },
  textStyle: {
    alignSelf: "center",
    color: Colors.onBoardingSwiperFlatList.paginationActive,
    fontSize: Sizes.md,
  },
});
