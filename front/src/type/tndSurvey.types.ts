/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */

import type { Visuel } from "../types";

export interface TndTest {
  id: number;
  nom: string;
  ordre: number;
  isChecked?: boolean;
}

export interface TndQuestionnaireQuestion {
  id: number;
  nom: string;
  ordre: number;
  image?: Visuel;
}

export interface TndQuestionnaireDomaine {
  id: number;
  nom: string;
  ordre: number;
  questions: TndQuestionnaireQuestion[];
}

export interface TndQuestionnaire {
  id: number;
  nom: string;
  domaines: TndQuestionnaireDomaine[];
  ordre: number;
  alertNbNon: number;
  alertNbDomaine: number;
}

export interface TndQuestion {
  title: string;
  question: string;
  isAnswered?: boolean;
}

export interface TndAnswers {
  test: string;
  non: number;
  oui: number;
  reponses: TndAnswer[];
}

export interface TndAnswer {
  questionNum: number;
  question: string;
  reponse: string;
}
