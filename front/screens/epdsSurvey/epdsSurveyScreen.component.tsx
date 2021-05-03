import { useQuery } from "@apollo/client";
import type { StackNavigationProp } from "@react-navigation/stack";
import { FC, useEffect, useState } from "react";
import * as React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import { CommonText } from "../../components/StyledText";
import {
  Colors,
  DatabaseQueries,
  epdsGender,
  Labels,
  Paddings,
  Sizes
} from "../../constants";
import type { EpdsQuestionAndAnswers } from "../../type";
import type { RootStackParamList } from "../../types";
import { EpdsSurveyUtils, StorageUtils } from "../../utils";
import EpdsSurveyContent from "./epdsSurveyContent.component";
import EpdsGenderEntry from "./epdsGenderEntry.component";
import { View } from "../../components/Themed";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "onboarding"
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const EpdsSurveyScreen: FC<Props> = () => {
  const [genderIsEntered, setGenderIsEntered] = useState(false);

  useEffect(() => {
    async function getGenderFromStorage() {
      const genderValue = await StorageUtils.getStringValue(epdsGender);
      setGenderIsEntered(genderValue ? true : false);
    }
    getGenderFromStorage();
  }, []);

  const { loading, error, data } = useQuery(
    DatabaseQueries.QUESTIONNAIRE_EPDS,
    {
      fetchPolicy: "no-cache"
    }
  );

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <CommonText>{Labels.errorMsg}</CommonText>;

  const questionAndAnswers: EpdsQuestionAndAnswers[] = EpdsSurveyUtils.getQuestionsAndAnswersFromData(
    data
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
    paddingTop: Paddings.default
  },
  title: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: "bold",
    paddingBottom: Paddings.default,
    paddingHorizontal: Paddings.default
  }
});

export default EpdsSurveyScreen;
