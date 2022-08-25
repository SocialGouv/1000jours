/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { StackNavigationProp } from "@react-navigation/stack";
import { format } from "date-fns";
import type { FC } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import type { LayoutChangeEvent } from "react-native";
import { ScrollView, StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";

import {
  MoodItemsForAccessibility,
  MoodItemsInCarousel,
  MoodsCalendar,
} from "../../components";
import {
  BackButton,
  CustomButton,
  TitleH1,
} from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import { Formats, Labels, StorageKeysConstants } from "../../constants";
import { IS_ON_EXPO_GO } from "../../constants/platform.constants";
import { useAccessibilityReader } from "../../hooks";
import { Colors, Paddings } from "../../styles";
import type { MoodStorageItem } from "../../type";
import type { RootStackParamList } from "../../types";
import { MoodboardUtils, TrackerUtils } from "../../utils";
import { getObjectValue } from "../../utils/storage.util";

const firstItemIndexToShow = 1;

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Moodboard: FC<Props> = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState<number>(firstItemIndexToShow);
  const [trackerAction, setTrackerAction] = useState<string>("");
  const [showCarouselChoice, setShowCarouselChoice] = useState(true);
  const [dismissAnimation, setDismissAnimation] = useState<unknown>(null);
  const isAccessibilityMode = useAccessibilityReader();
  const elementRef = useRef<Animatable.View & View>(null);

  const onViewLayout = useCallback((event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent;
    setDismissAnimation({
      0: { height: layout.height, opacity: 1 },
      1: { height: 0, opacity: 0 },
    });
  }, []);

  const hideCarouselChoice = useCallback(() => {
    // La fonction animate() n'est pas déclaré dans le fichier d.ts (react-native-animatable)
    if (elementRef.current?.animate) {
      void elementRef.current.animate(dismissAnimation).then(() => {
        setShowCarouselChoice(false);
      });
    }
  }, [dismissAnimation]);

  const checkTodayMood = useCallback(async () => {
    const moods: MoodStorageItem[] =
      (await getObjectValue(StorageKeysConstants.moodsByDate)) ?? [];
    const today = format(new Date(), Formats.dateISO);
    const todayMood = moods.filter((item) => item.date === today);
    setShowCarouselChoice(todayMood.length !== 1);
  }, []);

  useEffect(() => {
    void checkTodayMood();
  }, [checkTodayMood]);

  const goBack = useCallback(() => {
    setTrackerAction(Labels.buttons.cancel);
    navigation.goBack();
  }, [navigation]);

  const validate = useCallback(() => {
    void MoodboardUtils.saveMood(
      MoodboardUtils.MOODBOARD_ITEMS[activeIndex].title
    );
    setTrackerAction(`${MoodboardUtils.MOODBOARD_ITEMS[activeIndex].title}`);
    hideCarouselChoice();
  }, [activeIndex, hideCarouselChoice]);

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

      {showCarouselChoice ? (
        <Animatable.View
          ref={elementRef}
          onLayout={onViewLayout}
          useNativeDriver={!IS_ON_EXPO_GO}
        >
          {isAccessibilityMode ? (
            <MoodItemsForAccessibility
              setActiveIndex={setActiveIndex}
              firstItemIndexToShow={firstItemIndexToShow}
            />
          ) : (
            <MoodItemsInCarousel
              setActiveIndex={setActiveIndex}
              firstItemIndexToShow={firstItemIndexToShow}
            />
          )}

          <View style={styles.buttonContainer}>
            <CustomButton
              title={Labels.buttons.validate}
              rounded
              action={validate}
            />
          </View>
        </Animatable.View>
      ) : null}

      <MoodsCalendar />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "center",
    paddingTop: Paddings.largest,
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
  mainContainer: {
    backgroundColor: Colors.white,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: Paddings.smallest,
  },
});

export default Moodboard;
