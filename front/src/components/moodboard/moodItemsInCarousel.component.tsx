import type { Dispatch, SetStateAction } from "react";
import * as React from "react";
import { useCallback, useRef } from "react";
import { Image, StyleSheet, View } from "react-native";
import Carousel from "react-native-snap-carousel";

import { SCREEN_WIDTH } from "../../constants/platform.constants";
import { Margins, Sizes } from "../../styles";
import type { MoodboardItem } from "../../type";
import { MoodboardUtils } from "../../utils";
import { SecondaryText } from "../baseComponents";

interface Props {
  setActiveIndex: Dispatch<SetStateAction<number>>;
  firstItemIndexToShow: number;
}

interface RenderItemProps {
  item: MoodboardItem;
  index: number;
}

const ITEM_WIDTH = Math.round(SCREEN_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(
  (ITEM_WIDTH * 3) / MoodboardUtils.MOODBOARD_ITEMS.length
);
const ICON_SIZE = Math.round(ITEM_WIDTH * 0.5);

const MoodItemsInCarousel: React.FC<Props> = ({
  setActiveIndex,
  firstItemIndexToShow,
}) => {
  const ref = useRef(null);

  const snapToItem = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const renderItem = useCallback(({ item }: RenderItemProps) => {
    return (
      <View style={styles.itemContainer}>
        <View
          style={[
            styles.itemViewContainer,
            styles.borderRadius,
            { borderColor: item.color },
          ]}
        >
          <View style={styles.iconContainer}>
            <Image
              style={{ height: ICON_SIZE, width: ICON_SIZE }}
              source={item.icon}
            />
          </View>
          <View
            style={[
              styles.itemViewLabelContainer,
              {
                backgroundColor: item.color,
              },
            ]}
          >
            <SecondaryText style={styles.itemLabel}>{item.title}</SecondaryText>
          </View>
        </View>
      </View>
    );
  }, []);

  return (
    <Carousel
      ref={ref}
      data={MoodboardUtils.MOODBOARD_ITEMS}
      renderItem={renderItem}
      sliderWidth={SCREEN_WIDTH}
      itemWidth={ITEM_WIDTH}
      containerCustomStyle={styles.carouselContainer}
      inactiveSlideShift={0}
      onSnapToItem={snapToItem}
      useScrollView={true}
      firstItem={firstItemIndexToShow}
    />
  );
};

const styles = StyleSheet.create({
  borderRadius: {
    borderRadius: Sizes.xxxs,
  },
  carouselContainer: {
    marginTop: Margins.largest,
  },
  iconContainer: {
    flex: 5,
    justifyContent: "center",
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: ITEM_HEIGHT,
    width: ITEM_WIDTH,
  },
  itemLabel: {
    color: "white",
    fontSize: Sizes.lg,
  },
  itemViewContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "90%",
  },
  itemViewLabelContainer: {
    alignItems: "center",
    borderBottomLeftRadius: Sizes.xxxxs,
    borderBottomRightRadius: Sizes.xxxxs,
    flex: 2,
    justifyContent: "center",
    width: "100%",
  },
});

export default MoodItemsInCarousel;
