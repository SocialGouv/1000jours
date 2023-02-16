/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */

import type { Visuel } from "../types";

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
  alerteNbNon: number;
  alerteNbDomaine: number;
  isChecked?: boolean;
}

export interface TndQuestion {
  title: string;
  question: string;
  isAnswered?: boolean;
}

export interface TndAnswers {
  questionnaire: string;
  reponseNon: number;
  reponseOui: number;
  domaineAvecReponseNon: number;
  signesAlerte: boolean;
  reponses: TndAnswer[];
}

export interface TndAnswer {
  questionNum: number;
  question: string;
  reponse: string;
}
