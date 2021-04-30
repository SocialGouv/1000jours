import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import { ActivityIndicator } from "react-native";

import { CommonText } from "../../components/StyledText";
import Labels from "../../constants/Labels";
import type { RootStackParamList } from "../../types";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client";
import EpdsSurveyContent from "./epdsSurveyContent.component";
import { EpdsSurveyUtils } from "../../utils";
import { QuestionnaireEpdsFromDB, EpdsQuestionAndAnswers } from "../../type";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "onboarding"
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const EpdsSurveyScreen: FC<Props> = () => {
  const QUESTIONNAIRE_EPDS = gql`
    query QuestionsReponses {
      questionnaireEpds(sort: "ordre") {
        ordre
        libelle
        reponse_1_libelle
        reponse_1_points
        reponse_2_libelle
        reponse_2_points
        reponse_3_libelle
        reponse_3_points
        reponse_4_libelle
        reponse_4_points
      }
    }
  `;
  const { loading, error, data } = useQuery(QUESTIONNAIRE_EPDS, {
    fetchPolicy: "no-cache"
  });

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <CommonText>{Labels.errorMsg}</CommonText>;

  const fetchedData = (data as { questionnaireEpds: QuestionnaireEpdsFromDB[] })
       .questionnaireEpds;
  const questionAndAnswers: EpdsQuestionAndAnswers[] = EpdsSurveyUtils.convertToQuestionsAndAnswers(fetchedData);

  return (
    <EpdsSurveyContent epdsSurvey={questionAndAnswers}/>
  );
};

export default EpdsSurveyScreen;
