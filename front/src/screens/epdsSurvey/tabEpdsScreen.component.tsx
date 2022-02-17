import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import {
  EpdsGenderEntry,
  EpdsOnboarding,
  EpdsSurveyContent,
} from "../../components";
import { View } from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import {
  EpdsDbQueries,
  FetchPoliciesConstants,
  StorageKeysConstants,
} from "../../constants";
import { GraphQLQuery } from "../../services";
import type { EpdsQuestionAndAnswers } from "../../type";
import { EpdsSurveyUtils, StorageUtils, TrackerUtils } from "../../utils";

const TabEpdsScreen: FC = () => {
  const [onboardingIsDone, setOnboardingIsDone] = useState(false);
  const [genderIsEntered, setGenderIsEntered] = useState(false);
  const [questionAndAnswers, setQuestionAndAnswers] = useState<
    EpdsQuestionAndAnswers[]
  >([]);

  useEffect(() => {
    const getGenderFromStorage = async () => {
      const genderValue = await StorageUtils.getStringValue(
        StorageKeysConstants.epdsGenderKey
      );
      setGenderIsEntered(Boolean(genderValue));
    };
    void getGenderFromStorage();
  }, []);

  const handleResults = (data: unknown) => {
    setQuestionAndAnswers(EpdsSurveyUtils.getQuestionsAndAnswersFromData(data));
  };

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
      <GraphQLQuery
        query={EpdsDbQueries.EPDS_SURVEY}
        fetchPolicy={FetchPoliciesConstants.NO_CACHE}
        updateFetchedData={handleResults}
      />
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
