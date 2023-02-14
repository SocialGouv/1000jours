import _ from "lodash";

import { Labels } from "../constants";
import { TndAnswersValue } from "../constants/tndSurvey.constants";
import type { SurveyQuestionAndAnswers } from "../type";
import type {
  TndAnswer,
  TndAnswers,
  TndQuestionnaire,
  TndTest,
} from "../type/tndSurvey.types";

export const formatTndTest = (
  tndTest: TndQuestionnaire
): SurveyQuestionAndAnswers[] => {
  const formattedQuestions: SurveyQuestionAndAnswers[] = [];
  let counter = 0;
  for (const domain of tndTest.domaines) {
    for (const question of domain.questions) {
      formattedQuestions.push({
        answers: [
          {
            id: 0,
            isChecked: false,
            label: Labels.buttons.yes,
            points: 0,
            value: TndAnswersValue.yes,
          },
          {
            id: 1,
            isChecked: false,
            label: Labels.buttons.no,
            points: 0,
            value: TndAnswersValue.no,
          },
        ],
        isAnswered: false,
        question: question.nom,
        questionNumber: ++counter,
        title: domain.nom,
      });
    }
  }
  return formattedQuestions;
};

export const formatTndResponses = (
  tndTest: TndTest,
  tndQuestionsAndAnswers: SurveyQuestionAndAnswers[]
): TndAnswers => {
  const responses: TndAnswer[] = [];
  let nbAnswerNo = 0;
  let nbAnswerYes = 0;
  for (const item of tndQuestionsAndAnswers) {
    const answer = _.find(item.answers, { isChecked: true });
    if (answer) {
      if (answer.value === TndAnswersValue.no) nbAnswerNo++;
      if (answer.value === TndAnswersValue.yes) nbAnswerYes++;
      responses.push({
        question: item.question,
        questionNum: item.questionNumber,
        reponse: answer.label,
      });
    }
  }
  const tndAnswers: TndAnswers = {
    non: nbAnswerNo,
    oui: nbAnswerYes,
    reponses: responses,
    test: tndTest.nom,
  };
  return tndAnswers;
};
