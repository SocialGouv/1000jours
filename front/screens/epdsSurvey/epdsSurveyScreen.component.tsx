import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { SecondaryText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import {
  Colors,
  DatabaseQueries,
  FontWeight,
  Labels,
  Paddings,
  Sizes,
  StorageKeysConstants,
} from "../../constants";
import type { DataFetchingType, EpdsQuestionAndAnswers } from "../../type";
import { DataFetchingUtils, EpdsSurveyUtils, StorageUtils } from "../../utils";
import EpdsGenderEntry from "./epdsGenderEntry.component";
import EpdsSurveyContent from "./epdsSurveyContent.component";

const EpdsSurveyScreen: FC = () => {
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
      <SecondaryText style={styles.title}>
        {Labels.epdsSurvey.title}
      </SecondaryText>
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
    fontSize: Sizes.md,
    fontWeight: FontWeight.bold,
    paddingHorizontal: Paddings.default,
    textTransform: "uppercase",
  },
});

export default EpdsSurveyScreen;
