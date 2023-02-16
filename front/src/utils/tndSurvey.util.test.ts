import { TndSurveyConstants } from "../constants";
import type { SurveyQuestionAndAnswers } from "../type";
import type { SurveyResult } from "../type/survey.types";
import type { TndAnswers, TndQuestionnaire } from "../type/tndSurvey.types";
import { TndSurveyUtils } from ".";

describe("Tracker Utils", () => {
  const tndQuestionnaire: TndQuestionnaire = {
    alerteNbDomaine: 2,
    alerteNbNon: 2,
    domaines: [
      {
        id: 1,
        nom: "domaine1",
        ordre: 1,
        questions: [
          {
            id: 1,
            image: undefined,
            nom: "questionA",
            ordre: 1,
          },
          {
            id: 2,
            image: undefined,
            nom: "questionB",
            ordre: 2,
          },
        ],
      },
      {
        id: 1,
        nom: "domaine2",
        ordre: 1,
        questions: [
          {
            id: 1,
            image: undefined,
            nom: "questionC",
            ordre: 1,
          },
          {
            id: 2,
            image: undefined,
            nom: "questionD",
            ordre: 2,
          },
        ],
      },
    ],
    id: 1,
    nom: "questionnaire1",
    ordre: 1,
  };

  const answersYesChecked = [
    { ...TndSurveyConstants.tndAnswerYes, isChecked: true },
    TndSurveyConstants.tndAnswerNo,
  ];
  const answersNoChecked = [
    TndSurveyConstants.tndAnswerYes,
    { ...TndSurveyConstants.tndAnswerNo, isChecked: true },
  ];

  const tndQuestionsAndAnswersWithWarning: SurveyQuestionAndAnswers[] = [
    {
      answers: answersYesChecked,
      domain: "domaine1",
      question: "questionA",
      questionNumber: 1,
    },
    {
      answers: answersNoChecked,
      domain: "domaine1",
      question: "questionB",
      questionNumber: 2,
    },
    {
      answers: answersYesChecked,
      domain: "domaine2",
      question: "questionC",
      questionNumber: 3,
    },
    {
      answers: answersNoChecked,
      domain: "domaine2",
      question: "questionD",
      questionNumber: 4,
    },
  ];

  const tndQuestionsAndAnswersWithoutWarning: SurveyQuestionAndAnswers[] = [
    {
      answers: answersNoChecked,
      domain: "domaine1",
      question: "questionA",
      questionNumber: 1,
    },
    {
      answers: answersNoChecked,
      domain: "domaine1",
      question: "questionB",
      questionNumber: 2,
    },
    {
      answers: answersYesChecked,
      domain: "domaine2",
      question: "questionC",
      questionNumber: 3,
    },
    {
      answers: answersYesChecked,
      domain: "domaine2",
      question: "questionD",
      questionNumber: 4,
    },
  ];

  describe("formatTndQuestionnaire", () => {
    it("should return an array of `SurveyQuestionAndAnswers`", () => {
      const answers = [
        TndSurveyConstants.tndAnswerYes,
        TndSurveyConstants.tndAnswerNo,
      ];
      const expected = [
        {
          answers: answers,
          domain: "domaine1",
          image: undefined,
          isAnswered: false,
          question: "questionA",
          questionNumber: 1,
        },
        {
          answers: answers,
          domain: "domaine1",
          image: undefined,
          isAnswered: false,
          question: "questionB",
          questionNumber: 2,
        },
        {
          answers: answers,
          domain: "domaine2",
          image: undefined,
          isAnswered: false,
          question: "questionC",
          questionNumber: 3,
        },
        {
          answers: answers,
          domain: "domaine2",
          image: undefined,
          isAnswered: false,
          question: "questionD",
          questionNumber: 4,
        },
      ];

      const result = TndSurveyUtils.formatTndQuestionnaire(tndQuestionnaire);
      expect(result).toEqual(expected);
    });
  });

  describe("formatTndResponses", () => {
    it("should return a `TndAnswers`", () => {
      const expected: TndAnswers = {
        domaineAvecReponseNon: 2,
        questionnaire: tndQuestionnaire.nom,
        reponseNon: 2,
        reponseOui: 2,
        reponses: [
          {
            question: "questionA",
            questionNum: 1,
            reponse: TndSurveyConstants.tndAnswerYes.label,
          },
          {
            question: "questionB",
            questionNum: 2,
            reponse: TndSurveyConstants.tndAnswerNo.label,
          },
          {
            question: "questionC",
            questionNum: 3,
            reponse: TndSurveyConstants.tndAnswerYes.label,
          },
          {
            question: "questionD",
            questionNum: 4,
            reponse: TndSurveyConstants.tndAnswerNo.label,
          },
        ],
        signesAlerte: true,
      };

      const result = TndSurveyUtils.formatTndResponses(
        tndQuestionnaire,
        tndQuestionsAndAnswersWithWarning
      );
      expect(result).toEqual(expected);
    });
  });

  describe("getSurveyResult", () => {
    it("should return a `SurveyResult` from an array of `SurveyQuestionAndAnswers`", () => {
      const expected: SurveyResult = {
        nbAnswerNo: 2,
        nbAnswerYes: 2,
        nbDomainsWithAnswerNo: 2,
      };

      const result = TndSurveyUtils.getSurveyResult(
        tndQuestionsAndAnswersWithWarning
      );
      expect(result).toEqual(expected);
    });
  });

  describe("hasWarningSigns", () => {
    it(`should return true when there are at least ${tndQuestionnaire.alerteNbNon} answers 'Non' in ${tndQuestionnaire.alerteNbDomaine} domains.`, () => {
      const result = TndSurveyUtils.hasWarningSigns(
        tndQuestionsAndAnswersWithWarning,
        tndQuestionnaire.alerteNbNon,
        tndQuestionnaire.alerteNbDomaine
      );
      expect(result).toBeTruthy();
    });

    it(`should return false when there are less than ${tndQuestionnaire.alerteNbNon} answers 'Non' in ${tndQuestionnaire.alerteNbDomaine} domains.`, () => {
      const result = TndSurveyUtils.hasWarningSigns(
        tndQuestionsAndAnswersWithoutWarning,
        tndQuestionnaire.alerteNbNon,
        tndQuestionnaire.alerteNbDomaine
      );
      expect(result).toBeFalsy();
    });
  });
});
