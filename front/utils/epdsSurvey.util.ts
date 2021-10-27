import {
  Colors,
  EpdsConstants,
  Labels,
  StorageKeysConstants,
} from "../constants";
import type {
  BeContactedColors,
  EpdsAnswer,
  EpdsQuestionAndAnswers,
  EpdsResultIconAndStateOfMind,
  EpdsUpdatedSurvey,
  IntroductionText,
  QuestionnaireEpdsFromDB,
} from "../type";
import { getObjectValue, multiRemove, storeObjectValue } from "./storage.util";

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
      questionNumber: element.ordre,
    };
  });

export const getUpdatedSurvey = (
  questionsAndAnswers: EpdsQuestionAndAnswers[],
  selectedQuestionIndex: number,
  selectedAnswer: EpdsAnswer
): EpdsUpdatedSurvey => {
  let lastQuestionHasThreePointAnswer = false;
  const updatedSurvey = questionsAndAnswers.map((question, questionIndex) => {
    const questionIsCurrent = questionIndex === selectedQuestionIndex;
    const answers = questionIsCurrent
      ? question.answers.map((answer) => {
          if (answer.id === selectedAnswer.id) {
            lastQuestionHasThreePointAnswer =
              questionIndex === questionsAndAnswers.length - 1 &&
              answer.points === 3;
            question.isAnswered = !selectedAnswer.isChecked;
            return { ...answer, isChecked: !selectedAnswer.isChecked };
          } else {
            return { ...answer, isChecked: false };
          }
        })
      : question.answers;

    return { ...question, answers };
  });

  return { lastQuestionHasThreePointAnswer, updatedSurvey };
};

export const getUpdatedScore = (
  questionsAndAnswers: EpdsQuestionAndAnswers[]
): number => {
  let score = 0;
  questionsAndAnswers.forEach((question) => {
    const answeredQuestionPoints = question.answers.find(
      (answer) => answer.isChecked
    )?.points;
    if (answeredQuestionPoints) score += answeredQuestionPoints;
  });
  return score;
};

export const getCurrentQuestionPoints = (
  question: EpdsQuestionAndAnswers
): number | undefined =>
  question.answers.find((answer) => answer.isChecked)?.points;

export const getResultIconAndStateOfMind = (
  result: number,
  lastQuestionHasThreePointsAnswer: boolean
): EpdsResultIconAndStateOfMind => {
  const labelsStateOfMind = Labels.epdsSurveyLight.stateOfMind;

  if (
    result >= EpdsConstants.RESULT_BAD_VALUE ||
    lastQuestionHasThreePointsAnswer
  ) {
    return {
      color: Colors.secondaryRedLight,
      icon: EpdsConstants.ResultIconValueEnum.pasBien,
      stateOfMind: labelsStateOfMind.plusDeQuinze,
    };
  }

  if (result >= EpdsConstants.RESULT_WELL_VALUE) {
    return {
      color: Colors.primaryYellowDark,
      icon: EpdsConstants.ResultIconValueEnum.moyen,
      stateOfMind: labelsStateOfMind.entreDixEtQuartorze,
    };
  }

  return {
    color: Colors.primaryBlue,
    icon: EpdsConstants.ResultIconValueEnum.bien,
    stateOfMind: labelsStateOfMind.moinsDeNeuf,
  };
};

export const getPrimaryAndSecondaryBeContactedColors = (
  result: number,
  lastQuestionHasThreePointsAnswer: boolean
): BeContactedColors => {
  if (
    result >= EpdsConstants.RESULT_BAD_VALUE ||
    lastQuestionHasThreePointsAnswer
  ) {
    return {
      primaryColor: Colors.secondaryRedLight,
      secondaryColor: Colors.secondaryRedDark,
    };
  }

  return {
    primaryColor: Colors.primaryYellowDark,
    secondaryColor: Colors.primaryYellowLight,
  };
};

export const getResultIntroductionText = (
  result: number,
  lastQuestionHasThreePointsAnswer: boolean
): IntroductionText => {
  const introductionTexts = Labels.epdsSurveyLight.textesExplication;

  return result >= EpdsConstants.RESULT_WELL_VALUE ||
    lastQuestionHasThreePointsAnswer
    ? {
        boldText: introductionTexts.plusDeNeufBold,
        text: introductionTexts.plusDeNeuf,
      }
    : {
        text: introductionTexts.moinsDeNeuf,
      };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeEpdsStorageItems = async (): Promise<any> => {
  await multiRemove(StorageKeysConstants.epdsSurveyKeys);
};

export const incrementEpdsSurveyCounterAndGetNewValue =
  async (): Promise<number> => {
    const counterObject = await getObjectValue(
      StorageKeysConstants.epdsSurveyCounterKey
    );

    const surveyCounter = counterObject ? Number(counterObject) : 0;
    const newCounter = surveyCounter + 1;
    await storeObjectValue(
      StorageKeysConstants.epdsSurveyCounterKey,
      newCounter
    );

    return newCounter;
  };

export const getEachQuestionScore = (
  questionsAndAnswers: EpdsQuestionAndAnswers[]
): number[] => {
  const scores: number[] = [];
  questionsAndAnswers.forEach((question) => {
    const questionPoint = question.answers.find(
      (answer) => answer.isChecked
    )?.points;
    if (questionPoint !== undefined) scores.push(questionPoint);
  });
  return scores;
};
