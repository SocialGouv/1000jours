import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { ActivityIndicator } from "react-native";

import { CommonText } from "../../components/StyledText";
import Labels from "../../constants/Labels";
import type { QuestionnaireEpdsFromDB, RootStackParamList } from "../../types";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client";
import EpdsSurveyContent from "./epdsSurveyContent.component";
import { EpdsSurveyUtils } from "../../utils";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "onboarding"
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

export interface QuestionAndAnswers {
  question: string;
  answers: Answer[];
  isAnswered?: boolean;
}

export interface Answer {
  id: number;
  label: string;
  points: number;
  isChecked: boolean;
}

const EpdsSurveyScreen: FC<Props> = ({ navigation }) => {
  const QUESTIONNAIRE_EPDS = gql`
    query QuestionsReponses {
      questionnaireEpds {
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
  const tempQuestionsAndAnswers: QuestionAndAnswers[] =
      fetchedData && EpdsSurveyUtils.convertToQuestionsAndAnswers(fetchedData);

  return (
    <EpdsSurveyContent questionAndAnswers={tempQuestionsAndAnswers}/>
  );
};

export default EpdsSurveyScreen;
