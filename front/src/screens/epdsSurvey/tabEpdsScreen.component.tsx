import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";

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
import { useAccessibilityReader } from "../../hooks";
import { GraphQLQuery } from "../../services";
import type { EpdsQuestionAndAnswers } from "../../type";
import { EpdsSurveyUtils, StorageUtils, TrackerUtils } from "../../utils";

// TODO: refacto & clear
const EPDS_WIDGET_SOURCE = "1000j-application";

const TabEpdsScreen: FC = () => {
  const [isOnboardingDone, setIsOnboardingDone] = useState(false);
  const [isGenderEntered, setIsGenderEntered] = useState(false);
  const [questionAndAnswers, setQuestionAndAnswers] = useState<
    EpdsQuestionAndAnswers[]
  >([]);
  const isAccessibilityModeOn = useAccessibilityReader();

  useEffect(() => {
    const getGenderFromStorage = async () => {
      const genderValue = await StorageUtils.getStringValue(
        StorageKeysConstants.epdsGenderKey
      );
      setIsGenderEntered(Boolean(genderValue));
    };
    void getGenderFromStorage();
  }, []);

  const handleResults = useCallback((data: unknown) => {
    setQuestionAndAnswers(EpdsSurveyUtils.getQuestionsAndAnswersFromData(data));
  }, []);

  const goToEpdsSurvey = useCallback(() => {
    setIsGenderEntered(true);
  }, []);

  const onBoardingIsDone = useCallback(() => {
    setIsOnboardingDone(true);
  }, []);

  const getViewToDisplay = () => {
    // TODO: urilisation de la branche de dev du widget pour les tests
    // uri à utiliser `${process.env.EPDS_WIDGET_URL}/?source=${EPDS_WIDGET_SOURCE}`
    const url =
      "https://nos1000jours-blues-epds-widget-feat-modific-4nhlqn.dev.fabrique.social.gouv.fr/";

    return (
      <WebView
        source={{
          uri: `${url}/?source=${EPDS_WIDGET_SOURCE}`,
        }}
        style={{ height: "100%", width: "100%" }}
      />
    );
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
