import {
  Colors,
  EpdsConstants,
  Labels,
  StorageKeysConstants,
} from "../constants";
import type {
  EpdsAnswer,
  EpdsQuestionAndAnswers,
  EpdsResultData,
  QuestionnaireEpdsFromDB,
} from "../type";
import { StorageUtils } from ".";

export const getQuestionsAndAnswersFromData = (
  data: unknown
): EpdsQuestionAndAnswers[] => {
  const fetchedData = (data as { questionnaireEpds: QuestionnaireEpdsFromDB[] })
    .questionnaireEpds;
  return convertToQuestionsAndAnswers(fetchedData);
};

const convertToQuestionsAndAnswers = (
  questionnaire: QuestionnaireEpdsFromDB[]
) =>
  questionnaire.map((element) => {
    return {
      answers: [
        {
          id: 0,
          isChecked: false,
          label: element.reponse_1_libelle,
          points: element.reponse_1_points,
        },
        {
          id: 1,
          isChecked: false,
          label: element.reponse_2_libelle,
          points: element.reponse_2_points,
        },
        {
          id: 2,
          isChecked: false,
          label: element.reponse_3_libelle,
          points: element.reponse_3_points,
        },
        {
          id: 3,
          isChecked: false,
          label: element.reponse_4_libelle,
          points: element.reponse_4_points,
        },
      ],
      question: element.libelle,
    };
  });

export const getUpdatedSurvey = (
  questionsAndAnswers: EpdsQuestionAndAnswers[],
  selectedQuestionIndex: number,
  selectedAnswer: EpdsAnswer
): EpdsQuestionAndAnswers[] =>
  questionsAndAnswers.map((question, questionIndex) => {
    const questionIsCurrent = questionIndex === selectedQuestionIndex;
    const answers = questionIsCurrent
      ? question.answers.map((answer) => {
          if (answer.id === selectedAnswer.id) {
            question.isAnswered = true;
            return { ...answer, isChecked: !selectedAnswer.isChecked };
          } else {
            return { ...answer, isChecked: false };
          }
        })
      : question.answers;

    return { ...question, answers };
  });

export const getUpdatedScore = (
  questionsAndAnswers: EpdsQuestionAndAnswers[]
): number => {
  let score = 0;
  questionsAndAnswers.forEach((question) => {
    const answeredQuestionPoints = question.answers.find(
      (answer) => answer.isChecked
    )?.points;
    if (answeredQuestionPoints) {
      score += answeredQuestionPoints;
    }
  });
  return score;
};

export const getCurrentQuestionPoints = (
  question: EpdsQuestionAndAnswers
): number | undefined =>
  question.answers.find((answer) => answer.isChecked)?.points;

export const getResultLabelAndStyle = (result: number): EpdsResultData => {
  const labelsResultats = Labels.epdsSurvey.resultats;

  if (result <= EpdsConstants.RESULT_WELL_VALUE) {
    return {
      color: Colors.secondaryGreenDark,
      icon: EpdsConstants.ResultIconValueEnum.bien,
      resultLabels: labelsResultats.moinsDeNeuf,
    };
  } else if (result <= EpdsConstants.RESULT_NOTSOWELL_VALUE) {
    return {
      color: Colors.primaryYellowDark,
      icon: EpdsConstants.ResultIconValueEnum.moyen,
      resultLabels: labelsResultats.entreDixEtDouze,
    };
  } else {
    return {
      color: Colors.secondaryRedLight,
      icon: EpdsConstants.ResultIconValueEnum.pasBien,
      resultLabels: labelsResultats.plusDeTreize,
    };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeEpdsStorageItems = async (): Promise<any> => {
  return StorageUtils.multiRemove(StorageKeysConstants.epdsSurveyKeys);
};
