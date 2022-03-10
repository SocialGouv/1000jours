/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { StackNavigationProp } from "@react-navigation/stack";
import { format } from "date-fns";
import type { FC } from "react";
import { useCallback, useRef, useState } from "react";
import * as React from "react";
import type { ImageSourcePropType } from "react-native";
import { Image, ScrollView, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

import { MoodboardAssets } from "../../components/assets";
import {
  BackButton,
  CustomButton,
  SecondaryText,
  TitleH1,
  View,
} from "../../components/baseComponents";
import MoodsCalendar from "../../components/moodboard/moodsCalendar.component";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import { Formats, Labels, StorageKeysConstants } from "../../constants";
import { SCREEN_WIDTH } from "../../constants/platform.constants";
import { Colors, Margins, Paddings, Sizes } from "../../styles";
import type { RootStackParamList } from "../../types";
import { StorageUtils, TrackerUtils } from "../../utils";

interface MoodboardItem {
  title: string;
  color: string;
  icon: ImageSourcePropType;
}
interface RenderItemProps {
  item: MoodboardItem;
  index: number;
}
export interface MoodStorageItem {
  title: string;
  date: string;
}

export const MOODBOARD_ITEMS = [
  {
    color: Colors.mood.veryGood,
    icon: MoodboardAssets.IconVeryGood,
    title: Labels.moodboard.mood.veryGood,
  },
  {
    color: Colors.mood.good,
    icon: MoodboardAssets.IconGood,
    title: Labels.moodboard.mood.good,
  },
  {
    color: Colors.mood.medium,
    icon: MoodboardAssets.IconMedium,
    title: Labels.moodboard.mood.medium,
  },
  {
    color: Colors.mood.bad,
    icon: MoodboardAssets.IconBad,
    title: Labels.moodboard.mood.bad,
  },
];

const ITEM_WIDTH = Math.round(SCREEN_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / MOODBOARD_ITEMS.length);
const ICON_SIZE = Math.round(ITEM_WIDTH * 0.5);
const firstItemIndexToShow = 1;

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Moodboard: FC<Props> = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState<number>(firstItemIndexToShow);
  const [trackerAction, setTrackerAction] = useState<string>("");
  const ref = useRef(null);

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

  const snapToItem = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const goBack = useCallback(() => {
    setTrackerAction(Labels.buttons.cancel);
    navigation.goBack();
  }, [navigation]);

  const validate = useCallback(() => {
    void saveMood(MOODBOARD_ITEMS[activeIndex].title);
    setTrackerAction(MOODBOARD_ITEMS[activeIndex].title);
    navigation.goBack();
  }, [activeIndex, navigation]);

  return (
    <ScrollView style={styles.mainContainer}>
      <TrackerHandler
        screenName={TrackerUtils.TrackingEvent.MOODBOARD}
        actionName={trackerAction}
      />
      <View style={styles.header}>
        <View style={styles.flexStart}>
          <BackButton action={goBack} />
        </View>
        <TitleH1
          animated={false}
          title={Labels.moodboard.title}
          description={Labels.moodboard.description}
        />
      </View>
      <View style={styles.questionContainer}>
        <SecondaryText style={styles.question}>
          {Labels.moodboard.howDoYouFeelToday}
        </SecondaryText>
      </View>
      <Carousel
        ref={ref}
        data={MOODBOARD_ITEMS}
        renderItem={renderItem}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={ITEM_WIDTH}
        containerCustomStyle={styles.carouselContainer}
        inactiveSlideShift={0}
        onSnapToItem={snapToItem}
        useScrollView={true}
        firstItem={firstItemIndexToShow}
      />

      <View style={styles.buttonContainer}>
        <CustomButton
          title={Labels.buttons.validate}
          rounded={true}
          action={validate}
        />
      </View>

      <MoodsCalendar />
    </ScrollView>
  );
};

export const saveMood = async (mood: string): Promise<void> => {
  const oldMoods: MoodStorageItem[] =
    (await StorageUtils.getObjectValue(StorageKeysConstants.moodsByDate)) ?? [];

  oldMoods.push({
    date: format(new Date(), Formats.dateISO),
    title: mood,
  });

  void StorageUtils.storeObjectValue(
    StorageKeysConstants.moodsByDate,
    oldMoods
  );
};

const styles = StyleSheet.create({
  borderRadius: {
    borderRadius: Sizes.xxxs,
  },
  buttonContainer: {
    alignSelf: "center",
    paddingTop: Paddings.largest,
  },
  carouselContainer: {
    marginTop: Margins.largest,
  },
  flexStart: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  header: {
    padding: Paddings.default,
    paddingTop: Paddings.largest,
  },
  iconContainer: {
    flex: 5,
    justifyContent: "center",
  },
  itemContainer: {
    alignItems: "center",
    height: ITEM_HEIGHT,
    justifyContent: "center",
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
  mainContainer: {
    backgroundColor: Colors.white,
  },
  question: {
    color: Colors.primaryBlue,
    fontSize: Sizes.md,
    paddingHorizontal: Paddings.default,
    textAlign: "center",
  },
  questionContainer: {
    alignContent: "center",
    alignItems: "center",
    paddingVertical: Paddings.smallest,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: Paddings.smallest,
  },
});

export default Moodboard;
