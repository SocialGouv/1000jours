import type { Dispatch, SetStateAction } from "react";
import * as React from "react";
import { useCallback, useRef } from "react";
import { Image, StyleSheet, View } from "react-native";

import { SCREEN_WIDTH } from "../../constants/platform.constants";
import { Margins, Sizes } from "../../styles";
import type { MoodboardItem } from "../../type";
import { MoodboardUtils } from "../../utils";
import { SecondaryText } from "../baseComponents";
import Carousel from "react-native-reanimated-carousel";

interface Props {
  setActiveIndex: Dispatch<SetStateAction<number>>;
  firstItemIndexToShow: number;
}

interface RenderItemProps {
  item: MoodboardItem;
  index: number;
}

const CAROUSEL_HEIGHT = Math.round(250);
const CAROUSEL_MAX_ITEM_TO_RENDER = 3;
const ITEM_WIDTH = Math.round(SCREEN_WIDTH);
const ICON_SIZE = Math.round(ITEM_WIDTH * 0.4);

const MoodItemsInCarousel: React.FC<Props> = ({
  setActiveIndex,
  firstItemIndexToShow,
}) => {
  const ref = useRef(null);

  const snapToItem = useCallback(
    (index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

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
      width={SCREEN_WIDTH}
      height={CAROUSEL_HEIGHT}
      windowSize={CAROUSEL_MAX_ITEM_TO_RENDER}
      defaultIndex={firstItemIndexToShow}
      onSnapToItem={snapToItem}
      loop={false}
      snapEnabled={true}
      pagingEnabled={true}
      style={styles.carouselContainer}
      mode="parallax"
    />
  //   <Carousel
  //   ref={ref}
  //   data={articles}
  //   defaultIndex={firstItemIndexToShow}
  //   renderItem={renderItem}
  //   onSnapToItem={snapToItem}
  //   windowSize={CAROUSEL_MAX_ITEM_TO_RENDER}
  //   width={SCREEN_WIDTH}
  //   mode="parallax"
  //   modeConfig={{
  //     parallaxScrollingOffset: CAROUSEL_PARALLAX_OFFSET,
  //     parallaxScrollingScale: CAROUSEL_PARALLAX_SCALE,
  //   }}
  //   pagingEnabled={true}
  //   snapEnabled={true}
  //   loop={false}
  //   panGestureHandlerProps={{
  //     activeOffsetX: [-Paddings.light, Paddings.light],
  //   }}
  // />
  );
};

const styles = StyleSheet.create({
  borderRadius: {
    borderRadius: Sizes.xxxs,
  },
  carouselContainer: {
    marginTop: Margins.light,
  },
  iconContainer: {
    flex: 5,
    justifyContent: "center",
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: CAROUSEL_HEIGHT,
    width: SCREEN_WIDTH,
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
