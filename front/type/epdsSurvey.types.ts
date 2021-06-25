/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { EpdsConstants, Labels } from "../constants";

export interface EpdsGenderType {
  id: number;
  element: { label: string; value: EpdsConstants.EpdsGender };
  isChecked: boolean;
}

export const EpdsGenders = [
  {
    label: Labels.epdsSurvey.genderEntry.choices.male,
    value: EpdsConstants.EpdsGender.masculin,
  },
  {
    label: Labels.epdsSurvey.genderEntry.choices.female,
    value: EpdsConstants.EpdsGender.feminin,
  },
  // {
  //   label: Labels.epdsSurvey.genderEntry.choices.nonBinary,
  //   value: EpdsConstants.EpdsGender.nonBinaire,
  // },
  {
    label: Labels.epdsSurvey.genderEntry.choices.noInformation,
    value: EpdsConstants.EpdsGender.inconnu,
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
  questionNumber: number;
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

export interface EpdsResultData {
  resultLabels: any;
  color: string;
  icon: EpdsConstants.ResultIconValueEnum;
}

export interface EpdsResultSimpleInformation {
  title?: string;
  description?: string;
  pdfUrl?: string;
}

export interface EpdsResultContactInformation {
  contactName: string;
  openingTime: string;
  phoneNumber: string;
  thematic: string;
}

export type EpdsResultInformationType =
  | EpdsResultContactInformation
  | EpdsResultSimpleInformation;
