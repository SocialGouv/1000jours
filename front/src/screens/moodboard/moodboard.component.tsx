/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import { useCallback, useState } from "react";
import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { MoodItemsInCarousel, MoodsCalendar } from "../../components";
import {
  BackButton,
  CustomButton,
  SecondaryText,
  TitleH1,
  View,
} from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import { Labels } from "../../constants";
import { Colors, Paddings, Sizes } from "../../styles";
import type { RootStackParamList } from "../../types";
import { MoodboardUtils, TrackerUtils } from "../../utils";

const firstItemIndexToShow = 1;

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Moodboard: FC<Props> = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState<number>(firstItemIndexToShow);
  const [trackerAction, setTrackerAction] = useState<string>("");

  const goBack = useCallback(() => {
    setTrackerAction(Labels.buttons.cancel);
    navigation.goBack();
  }, [navigation]);

  const validate = useCallback(() => {
    void MoodboardUtils.saveMood(
      MoodboardUtils.MOODBOARD_ITEMS[activeIndex].title
    );
    setTrackerAction(`${MoodboardUtils.MOODBOARD_ITEMS[activeIndex].title}`);
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

      <MoodItemsInCarousel
        setActiveIndex={setActiveIndex}
        firstItemIndexToShow={firstItemIndexToShow}
      />

      <View style={styles.buttonContainer}>
        <CustomButton
          title={Labels.buttons.validate}
          rounded
          action={validate}
        />
      </View>

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
