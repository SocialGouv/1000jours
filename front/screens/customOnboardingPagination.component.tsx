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
      <View key={value}>
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
      </View>
    ))}
  </View>
);

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
