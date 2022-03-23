import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
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

  const handleResults = useCallback((data: unknown) => {
    setQuestionAndAnswers(EpdsSurveyUtils.getQuestionsAndAnswersFromData(data));
  }, []);

  const goToEpdsSurvey = useCallback(() => {
    setGenderIsEntered(true);
  }, []);

  const onBoardingIsDone = useCallback(() => {
    setOnboardingIsDone(true);
  }, []);

  const getViewToDisplay = () => {
    if (!onboardingIsDone)
      return <EpdsOnboarding onBoardingIsDone={onBoardingIsDone} />;
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
        getFetchedData={handleResults}
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
