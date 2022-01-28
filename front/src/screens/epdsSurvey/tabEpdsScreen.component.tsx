import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { View } from "../../components/baseComponents";
import EpdsGenderEntry from "../../components/epdsSurvey/epdsGenderEntry.component";
import EpdsOnboarding from "../../components/epdsSurvey/epdsOnboarding.component";
import EpdsSurveyContent from "../../components/epdsSurvey/epdsSurveyContent.component";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import { DatabaseQueries, StorageKeysConstants } from "../../constants";
import type { DataFetchingType, EpdsQuestionAndAnswers } from "../../type";
import {
  DataFetchingUtils,
  EpdsSurveyUtils,
  StorageUtils,
  TrackerUtils,
} from "../../utils";

const TabEpdsScreen: FC = () => {
  const [onboardingIsDone, setOnboardingIsDone] = useState(false);
  const [genderIsEntered, setGenderIsEntered] = useState(false);

  useEffect(() => {
    const getGenderFromStorage = async () => {
      const genderValue = await StorageUtils.getStringValue(
        StorageKeysConstants.epdsGenderKey
      );
      setGenderIsEntered(Boolean(genderValue));
    };
    void getGenderFromStorage();
  }, []);

  const fetchedData: DataFetchingType = DataFetchingUtils.fetchData(
    DatabaseQueries.QUESTIONNAIRE_EPDS
  );

  if (!fetchedData.isFetched && fetchedData.loadingOrErrorComponent) {
    return fetchedData.loadingOrErrorComponent;
  }

  const questionAndAnswers: EpdsQuestionAndAnswers[] =
    EpdsSurveyUtils.getQuestionsAndAnswersFromData(fetchedData.response);

  const goToEpdsSurvey = () => {
    setGenderIsEntered(true);
  };

  const getViewToDisplay = () => {
    if (!onboardingIsDone)
      return (
        <EpdsOnboarding
          onBoardingIsDone={() => {
            setOnboardingIsDone(true);
          }}
        />
      );
    else if (!genderIsEntered)
      return <EpdsGenderEntry goToEpdsSurvey={goToEpdsSurvey} />;
    else return <EpdsSurveyContent epdsSurvey={questionAndAnswers} />;
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

export default TabEpdsScreen;
