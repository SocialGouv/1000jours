export type QuestionnaireEpdsFromDB = {
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
};

export type EpdsQuestionAndAnswers = {
  question: string;
  answers: EpdsAnswer[];
  isAnswered?: boolean;
}

export type EpdsAnswer = {
  id: number;
  label: string;
  points: number;
  isChecked: boolean;
}

export enum EpdsIconResultEnum {
  BIEN,
  MOYEN,
  PAS_BIEN,
};

export type EpdsResultData = {
  resultLabels: any,
  colorStyle: any,
  icon: EpdsIconResultEnum,
}