/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { Labels } from "../constants";

export enum EpdsGender {
  male = "Male",
  female = "Female",
  unknown = "Unknown",
}

export const EpdsGenders = [
  { label: Labels.epdsSurvey.genderEntry.choices.male, value: EpdsGender.male },
  {
    label: Labels.epdsSurvey.genderEntry.choices.female,
    value: EpdsGender.female,
  },
  {
    label: Labels.epdsSurvey.genderEntry.choices.noInformation,
    value: EpdsGender.unknown,
  },
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
  bien = "bien",
  moyen = "moyen",
  pasBien = "pasBien",
}

export interface EpdsResultData {
  resultLabels: any;
  colorStyle: any;
  icon: EpdsIconResultEnum;
}
