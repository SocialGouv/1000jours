import type { SurveyAnswer } from "../type";
import Labels from "./Labels";

export enum TndAnswersValue {
  yes = "YES",
  no = "NO",
}

export const tndAnswerYes: SurveyAnswer = {
  id: 1,
  isChecked: false,
  label: Labels.buttons.yes,
  points: 0,
  value: TndAnswersValue.yes,
};

export const tndAnswerNo: SurveyAnswer = {
  id: 2,
  isChecked: false,
  label: Labels.buttons.no,
  points: 0,
  value: TndAnswersValue.no,
};
