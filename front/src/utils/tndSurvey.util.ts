import _ from "lodash";

import { TndSurveyConstants } from "../constants";
import { TndAnswersValue } from "../constants/tndSurvey.constants";
import type { SurveyQuestionAndAnswers } from "../type";
import type { SurveyResult } from "../type/survey.types";
import type {
  TndAnswer,
  TndAnswers,
  TndQuestionnaire,
} from "../type/tndSurvey.types";

export const formatTndQuestionnaire = (
  tndQuestionnaire: TndQuestionnaire
): SurveyQuestionAndAnswers[] => {
  const formattedQuestions: SurveyQuestionAndAnswers[] = [];
  let counter = 0;
  for (const domain of tndQuestionnaire.domaines) {
    for (const question of domain.questions) {
      const answers = [
        Object.assign({}, TndSurveyConstants.tndAnswerYes),
        Object.assign({}, TndSurveyConstants.tndAnswerNo),
      ];
      formattedQuestions.push({
        answers: answers,
        domain: domain.nom,
        image: question.image,
        isAnswered: false,
        question: question.nom,
        questionNumber: ++counter,
      });
    }
  }
  return formattedQuestions;
};

export const formatTndResponses = (
  tndQuestionnaire: TndQuestionnaire,
  tndQuestionsAndAnswers: SurveyQuestionAndAnswers[]
): TndAnswers => {
  const responses: TndAnswer[] = [];
  for (const item of tndQuestionsAndAnswers) {
    const answer = _.find(item.answers, { isChecked: true });
    if (answer) {
      responses.push({
        question: item.question,
        questionNum: item.questionNumber,
        reponse: answer.label,
      });
    }
  }
  const surveyResult = getSurveyResult(tndQuestionsAndAnswers);
  const tndAnswers: TndAnswers = {
    domaineAvecReponseNon: surveyResult.nbDomainsWithAnswerNo,
    questionnaire: tndQuestionnaire.nom,
    reponseNon: surveyResult.nbAnswerNo,
    reponseOui: surveyResult.nbAnswerYes,
    reponses: responses,
    signesAlerte: hasWarningSigns(
      tndQuestionsAndAnswers,
      tndQuestionnaire.alerteNbNon,
      tndQuestionnaire.alerteNbDomaine
    ),
  };
  return tndAnswers;
};

export const getSurveyResult = (
  tndQuestionsAndAnswers: SurveyQuestionAndAnswers[]
): SurveyResult => {
  let nbAnswerYes = 0;
  let nbAnswerNo = 0;
  const domainsWithAnswerNo: string[] = [];
  for (const questionAndAnswer of tndQuestionsAndAnswers) {
    const answer = _.find(questionAndAnswer.answers, { isChecked: true });
    if (answer?.value === TndAnswersValue.no) {
      nbAnswerNo++;
      if (
        questionAndAnswer.domain &&
        !domainsWithAnswerNo.includes(questionAndAnswer.domain)
      )
        domainsWithAnswerNo.push(questionAndAnswer.domain);
    }
    if (answer?.value === TndAnswersValue.yes) nbAnswerYes++;
  }
  return {
    nbAnswerNo,
    nbAnswerYes,
    nbDomainsWithAnswerNo: domainsWithAnswerNo.length,
  };
};

export const hasWarningSigns = (
  tndQuestionsAndAnswers: SurveyQuestionAndAnswers[],
  alertNbNon: number,
  alertNbDomaine: number
): boolean => {
  const surveyResult = getSurveyResult(tndQuestionsAndAnswers);
  return (
    surveyResult.nbAnswerNo >= alertNbNon &&
    surveyResult.nbDomainsWithAnswerNo >= alertNbDomaine
  );
};
