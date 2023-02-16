import type { Visuel } from "../types";

export interface SurveyQuestionAndAnswers {
  questionNumber: number;
  question: string;
  answers: SurveyAnswer[];
  isAnswered?: boolean;
  domain?: string;
  image?: Visuel;
}

export interface SurveyAnswer {
  id: number;
  label: string;
  points: number;
  isChecked: boolean;
  value?: string;
}

export interface SurveyResult {
  nbAnswerNo: number;
  nbAnswerYes: number;
  nbDomainsWithAnswerNo: number;
}
