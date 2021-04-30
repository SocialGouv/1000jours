import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import {
  EpdsAnswer,
  EpdsQuestionAndAnswers,
  QuestionnaireEpdsFromDB,
  EpdsIconResultEnum
} from "../type";

export const convertToQuestionsAndAnswers = (
  questionnaire: QuestionnaireEpdsFromDB[]
) => {
  return questionnaire.map((element) => {
    return {
      question: element.libelle,
      answers: [
        {
          id: 0,
          label: element.reponse_1_libelle,
          points: element.reponse_1_points,
          isChecked: false
        },
        {
          id: 1,
          label: element.reponse_2_libelle,
          points: element.reponse_2_points,
          isChecked: false
        },
        {
          id: 2,
          label: element.reponse_3_libelle,
          points: element.reponse_3_points,
          isChecked: false
        },
        {
          id: 3,
          label: element.reponse_4_libelle,
          points: element.reponse_4_points,
          isChecked: false
        }
      ]
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
      score = score + answeredQuestionPoints;
    }
  });
  return score;
};

export const getCurrentQuestionPoints = (question: EpdsQuestionAndAnswers) => {
  return question.answers.find((answer) => answer.isChecked)?.points;
};

export const getResultLabelAndStyle = (result: number) => {
  const labelsResultats = Labels.epdsSurvey.resultats;

  const greenColor = { color: Colors.secondaryGreenDark };
  const yellowColor = { color: Colors.primaryYellowDark };
  const redColor = { color: Colors.secondaryRedLight };

  let label;
  let colorStyle;
  let icon: EpdsIconResultEnum;
  if (result <= 9) {
    label = labelsResultats.moinsDeNeuf;
    colorStyle = greenColor;
    icon = EpdsIconResultEnum.BIEN;
  } else if (result <= 12) {
    label = labelsResultats.entreDixEtDouze;
    colorStyle = yellowColor;
    icon = EpdsIconResultEnum.MOYEN;
  } else {
    label = labelsResultats.plusDeTreize;
    colorStyle = redColor;
    icon = EpdsIconResultEnum.PAS_BIEN;
  }

  const stateOfMind = label.stateOfMind;

  return { stateOfMind, label, colorStyle, icon };
};
