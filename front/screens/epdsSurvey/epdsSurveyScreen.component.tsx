import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import { DatabaseQueries, StorageKeysConstants } from "../../constants";
import type { DataFetchingType, EpdsQuestionAndAnswers } from "../../type";
import { DataFetchingUtils, EpdsSurveyUtils, StorageUtils } from "../../utils";
import EpdsGenderEntry from "./epdsGenderEntry.component";
import EpdsOnboarding from "./epdsOnboarding.component";
import EpdsSurveyContent from "./epdsSurveyContent.component";

const EpdsSurveyScreen: FC = () => {
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

  return (
    <View style={styles.mainContainer}>
      {onboardingIsDone ? (
        genderIsEntered ? (
          <EpdsSurveyContent epdsSurvey={questionAndAnswers} />
        ) : (
          <EpdsGenderEntry goToEpdsSurvey={goToEpdsSurvey} />
        )
      ) : (
        <EpdsOnboarding
          onBoardingIsDone={() => {
            setOnboardingIsDone(true);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default EpdsSurveyScreen;
