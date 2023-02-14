import type { FC } from "react";
import { useCallback, useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import {
  TndOnboarding,
  TndSurveyContent,
  TndTestSelection,
} from "../../components";
import { View } from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import { useAccessibilityReader } from "../../hooks";
import type { TndTest } from "../../type/tndSurvey.types";
import { TrackerUtils } from "../../utils";

const TndSurveyScreen: FC = () => {
  const [isOnboardingDone, setIsOnboardingDone] = useState(false);
  const [selectedTndTest, setSelectedTndTest] = useState<TndTest | undefined>(
    undefined
  );
  const isAccessibilityModeOn = useAccessibilityReader();

  const goToSurvey = useCallback((tndTest: TndTest) => {
    setSelectedTndTest(tndTest);
  }, []);

  const onBoardingIsDone = useCallback(() => {
    setIsOnboardingDone(true);
  }, []);

  const getViewToDisplay = () => {
    if (!isOnboardingDone)
      return <TndOnboarding onBoardingIsDone={onBoardingIsDone} />;
    if (!selectedTndTest) return <TndTestSelection goToSurvey={goToSurvey} />;
    return (
      <TndSurveyContent
        tndTest={selectedTndTest}
        setSelectedTndTest={setSelectedTndTest}
        isAccessibilityModeOn={isAccessibilityModeOn}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <TrackerHandler screenName={TrackerUtils.TrackingEvent.EPDS} />
      {getViewToDisplay()}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default TndSurveyScreen;
