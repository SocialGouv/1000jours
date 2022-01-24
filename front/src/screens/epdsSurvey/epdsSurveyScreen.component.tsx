import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import { DatabaseQueries, StorageKeysConstants } from "../../constants";
import type { DataFetchingType, EpdsQuestionAndAnswers } from "../../type";
import {
  DataFetchingUtils,
  EpdsSurveyUtils,
  StorageUtils,
  TrackerUtils,
} from "../../utils";
import EpdsGenderEntry from "./epdsGenderEntry.component";
import EpdsOnboarding from "./epdsOnboarding.component";
import EpdsSurveyContent from "./epdsSurveyContent.component";

const EpdsSurveyScreen: FC = () => {
  const { trackScreenView } = useMatomo();
  const [onboardingIsDone, setOnboardingIsDone] = useState(false);
  const [genderIsEntered, setGenderIsEntered] = useState(false);

  useEffect(() => {
    trackScreenView(TrackerUtils.TrackingEvent.EPDS);
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

  return <View style={styles.mainContainer}>{getViewToDisplay()}</View>;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default EpdsSurveyScreen;
