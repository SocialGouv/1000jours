import { range } from "lodash";
import type { FC } from "react";
import * as React from "react";
import { StyleSheet, View } from "react-native";

import { CommonText } from "../components";
import { Colors, Margins, Sizes } from "../constants";

interface OnboardingPaginationProps {
  currentIndex: number;
  slidesNumber: number;
}

export const CustomPagination: FC<OnboardingPaginationProps> = ({
  currentIndex,
  slidesNumber,
}) => (
  <View importantForAccessibility="no-hide-descendants" style={styles.rowView}>
    {range(slidesNumber).map((value) => (
      <View key={value} style={styles.paginationElement}>
        <View
          style={[
            styles.defaultPaginationStyle,
            value === currentIndex
              ? styles.selectedIndex
              : styles.notSelectedIndex,
          ]}
        />
        <CommonText style={styles.textStyle}>{value}</CommonText>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  defaultPaginationStyle: {
    borderRadius: Sizes.xxxl,
    height: Sizes.xs,
  },
  notSelectedIndex: {
    backgroundColor: Colors.onBoardingSwiperFlatList.paginationDefault,
  },
  paginationElement: {
    marginHorizontal: Margins.smallest,
  },
  rowView: {
    alignSelf: "center",
    flexDirection: "row",
  },
  selectedIndex: {
    backgroundColor: Colors.onBoardingSwiperFlatList.paginationActive,
  },
  textStyle: {
    fontSize: Sizes.md,
    marginHorizontal: Margins.largest,
  },
});
