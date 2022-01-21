import { range } from "lodash";
import type { FC } from "react";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { CommonText } from "../components";
import { Colors, Labels, Margins, Sizes } from "../constants";

interface OnboardingPaginationProps {
  currentIndex: number;
  slidesNumber: number;
  scrollToIndex: (index: number) => void;
}

export const CustomPagination: FC<OnboardingPaginationProps> = ({
  currentIndex,
  slidesNumber,
  scrollToIndex,
}) => (
  <View style={styles.rowView}>
    {range(slidesNumber).map((value) => (
      <TouchableWithoutFeedback
        key={value}
        onPress={() => {
          scrollToIndex(value);
        }}
        accessibilityLabel={`${Labels.onboarding.screenNumber}${value + 1}`}
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
