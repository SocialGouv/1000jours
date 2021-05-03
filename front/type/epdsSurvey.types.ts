import { Labels } from "../constants";

export enum EpdsGender {
  MALE = "Male",
  FEMALE = "Female",
  UNKNOWN = "Unknown"
}

export const EpdsGenders = [
  { value: EpdsGender.MALE, label: Labels.epdsSurvey.genderEntry.choices.male },
  { value: EpdsGender.FEMALE, label: Labels.epdsSurvey.genderEntry.choices.female },
  { value: EpdsGender.UNKNOWN, label: Labels.epdsSurvey.genderEntry.choices.noInformation },
];

export interface QuestionnaireEpdsFromDB {
  id: number;
  locale: string;
  ordre: number;
  libelle: string;
  reponse_1_libelle: string;
  reponse_1_points: number;
  reponse_2_libelle: string;
  reponse_2_points: number;
  reponse_3_libelle: string;
  reponse_3_points: number;
  reponse_4_libelle: string;
  reponse_4_points: number;
}

export interface EpdsQuestionAndAnswers {
  question: string;
  answers: EpdsAnswer[];
  isAnswered?: boolean;
}

export interface EpdsAnswer {
  id: number;
  label: string;
  points: number;
  isChecked: boolean;
}

export enum EpdsIconResultEnum {
  BIEN,
  MOYEN,
  PAS_BIEN
}

export interface EpdsResultData {
  resultLabels: any;
  colorStyle: any;
  icon: EpdsIconResultEnum;
}
