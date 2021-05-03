import { Colors, Labels } from "../constants";
import type {
  EpdsAnswer,
  EpdsQuestionAndAnswers,
  EpdsResultData,
  QuestionnaireEpdsFromDB
} from "../type";
import { EpdsIconResultEnum } from "../type";

export const getQuestionsAndAnswersFromData = (data: any) => {
  const fetchedData = (data as { questionnaireEpds: QuestionnaireEpdsFromDB[] })
    .questionnaireEpds;
  return convertToQuestionsAndAnswers(fetchedData);
};

const convertToQuestionsAndAnswers = (
  questionnaire: QuestionnaireEpdsFromDB[]
) => {
  return questionnaire.map((element) => {
    return {
      answers: [
        {
          id: 0,
          isChecked: false,
          label: element.reponse_1_libelle,
          points: element.reponse_1_points
        },
        {
          id: 1,
          isChecked: false,
          label: element.reponse_2_libelle,
          points: element.reponse_2_points
        },
        {
          id: 2,
          isChecked: false,
          label: element.reponse_3_libelle,
          points: element.reponse_3_points
        },
        {
          id: 3,
          isChecked: false,
          label: element.reponse_4_libelle,
          points: element.reponse_4_points
        }
      ],
      question: element.libelle
    };
  });
};

export const getUpdatedSurvey = (
  questionsAndAnswers: EpdsQuestionAndAnswers[],
  selectedQuestionIndex: number,
  selectedAnswer: EpdsAnswer
) => {
  return questionsAndAnswers.map((question, questionIndex) => {
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
};

export const getUpdatedScore = (
  questionsAndAnswers: EpdsQuestionAndAnswers[]
) => {
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

export const getCurrentQuestionPoints = (question: EpdsQuestionAndAnswers) => {
  return question.answers.find((answer) => answer.isChecked)?.points;
};

export const getResultLabelAndStyle = (result: number): EpdsResultData => {
  const labelsResultats = Labels.epdsSurvey.resultats;

  const greenColor = { color: Colors.secondaryGreenDark };
  const yellowColor = { color: Colors.primaryYellowDark };
  const redColor = { color: Colors.secondaryRedLight };

  if (result <= 9) {
    return {
      colorStyle: greenColor,
      icon: EpdsIconResultEnum.BIEN,
      resultLabels: labelsResultats.moinsDeNeuf
    };
  } else if (result <= 12) {
    return {
      colorStyle: yellowColor,
      icon: EpdsIconResultEnum.MOYEN,
      resultLabels: labelsResultats.entreDixEtDouze
    };
  } else {
    return {
      colorStyle: redColor,
      icon: EpdsIconResultEnum.PAS_BIEN,
      resultLabels: labelsResultats.plusDeTreize
    };
  }
};
