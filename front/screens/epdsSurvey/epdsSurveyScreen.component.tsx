import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import {
  Colors,
  DatabaseQueries,
  epdsGenderKey,
  FontWeight,
  Labels,
  Paddings,
  Sizes,
} from "../../constants";
import type { DataFetchingType, EpdsQuestionAndAnswers } from "../../type";
import { DataFetchingUtils, EpdsSurveyUtils, StorageUtils } from "../../utils";
import { EpdsGenderEntry, EpdsSurveyContent } from "..";

const EpdsSurveyScreen: FC = () => {
  const [genderIsEntered, setGenderIsEntered] = useState(false);

  useEffect(() => {
    const getGenderFromStorage = async () => {
      const genderValue = await StorageUtils.getStringValue(epdsGenderKey);
      setGenderIsEntered(genderValue ? true : false);
    };
    void getGenderFromStorage();
  }, []);

  const fetchedData: DataFetchingType = DataFetchingUtils.fetchData(
    DatabaseQueries.QUESTIONNAIRE_EPDS
  );

  if (!fetchedData.isFetched && fetchedData.loadingOrErrorComponent) {
    return fetchedData.loadingOrErrorComponent;
  }

  const questionAndAnswers: EpdsQuestionAndAnswers[] = EpdsSurveyUtils.getQuestionsAndAnswersFromData(
    fetchedData.response
  );

  const goToEpdsSurvey = () => {
    setGenderIsEntered(true);
  };

  return (
    <View style={styles.mainContainer}>
      <CommonText style={styles.title}>{Labels.epdsSurvey.title}</CommonText>
      {genderIsEntered ? (
        <EpdsSurveyContent epdsSurvey={questionAndAnswers} />
      ) : (
        <EpdsGenderEntry goToEpdsSurvey={goToEpdsSurvey} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Paddings.default,
  },
  title: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.bold,
    paddingHorizontal: Paddings.default,
  },
});

export default EpdsSurveyScreen;
