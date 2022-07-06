import {
  addMonths,
  addWeeks,
  addYears,
  isAfter,
  isBefore,
  subWeeks,
} from "date-fns";

import { StorageKeysConstants } from "../constants";
import type { UserInfos, UserSituation } from "../types";
import { getObjectValue } from "./storage.util";

const ETAPE_PROJET = 1;
const ETAPE_CONCEPTION = 2;
const ETAPE_GROSSESSE_DEBUT = 3;
const ETAPE_GROSSESSE_SUITE_FIN = 4;
// à voir si l'accouchement est calculé
// const ETAPE_ACCOUCHEMENT = 5;
const ETAPE_ENFANT_3_PREMIERS_MOIS = 6;
const ETAPE_ENFANT_4_MOIS_1_AN = 7;
const ETAPE_ENFANT_1_AN_2_ANS = 8;

const GROSSESSE_TRIMESTRE_2_SEMAINES_SA = 16;
const GROSSESSE_TOTAL_SEMAINES_SA = 41;

export enum UserInfo {
  projet = "projet",
  conception = "conception",
  grossesse = "grossesse",
  enfant = "enfant",
  enfants = "enfants",
}

const defaultUserInfos: UserInfos = {
  conception: false,
  date: null,
  enfant: false,
  enfants: false,
  grossesse: false,
  projet: false,
};

const getUserInfos = (
  userSituations: UserSituation[] | null,
  childBirthday: string | null | undefined
): UserInfos => {
  const infos: UserInfos = defaultUserInfos;
  if (userSituations && userSituations.length > 0) {
    userSituations.map((userSituation) => {
      const id = userSituation.id as keyof typeof UserInfo;
      infos[id] = userSituation.isChecked;
    });
  }
  if (childBirthday && childBirthday.length > 0) infos.date = childBirthday;

  return infos;
};

const checkErrorForGrossesse = (date: Date): string | null => {
  let errorMessage = null;
  const now = new Date();
  const grossesseDebut = subWeeks(date, GROSSESSE_TOTAL_SEMAINES_SA);
  if (isBefore(now, grossesseDebut)) {
    errorMessage =
      "La date que vous avez renseignée est trop éloignée dans le futur";
  } else if (isBefore(date, now)) {
    errorMessage =
      "La date que vous avez renseignée ne peut pas être dans le passé";
  }
  return errorMessage;
};

const checkErrorForEnfant = (date: Date): string | null => {
  let errorMessage = null;
  const now = new Date();
  if (isBefore(now, date)) {
    errorMessage =
      "La date que vous avez renseignée ne peut pas être dans le futur";
  } else if (isAfter(now, addYears(date, 2))) {
    errorMessage =
      "Selon la date que vous avez renseignée, l'enfant est âgé de deux ans ou plus";
  }
  return errorMessage;
};

export const checkErrorOnProfile = (
  userSituations: UserSituation[],
  childBirthday: string
): string | null => {
  const infos = getUserInfos(userSituations, childBirthday);
  let errorMessage = null;
  if (infos.grossesse || infos.enfant || infos.enfants) {
    if (!infos.date) {
      errorMessage = "Date manquante";
    } else {
      const date = new Date(infos.date);
      if (infos.grossesse) {
        errorMessage = checkErrorForGrossesse(date);
      } else if (infos.enfant || infos.enfants) {
        errorMessage = checkErrorForEnfant(date);
      }
    }
  }
  return errorMessage;
};

export const calcCurrentStep = (date: Date): number => {
  const now = new Date();
  const grossesseDebut = subWeeks(date, GROSSESSE_TOTAL_SEMAINES_SA);
  const trimestre2 = addWeeks(
    grossesseDebut,
    GROSSESSE_TRIMESTRE_2_SEMAINES_SA
  );

  // Période de grossesse
  if (isBefore(now, date)) {
    return isBefore(now, trimestre2)
      ? ETAPE_GROSSESSE_DEBUT
      : ETAPE_GROSSESSE_SUITE_FIN;
  }
  // Période après l'accouchement
  if (isAfter(now, addYears(date, 1))) {
    return ETAPE_ENFANT_1_AN_2_ANS;
  }
  if (isAfter(now, addMonths(date, 3))) {
    return ETAPE_ENFANT_4_MOIS_1_AN;
  }
  return ETAPE_ENFANT_3_PREMIERS_MOIS;
};

export const getCurrentStepId = (
  userSituations: UserSituation[] | null,
  childBirthday: string | null | undefined
): number | null => {
  let id = null;
  const infos = getUserInfos(userSituations, childBirthday);
  if ((infos.grossesse || infos.enfant || infos.enfants) && infos.date) {
    const date = new Date(infos.date);
    id = calcCurrentStep(date);
  } else if (infos.projet) {
    id = ETAPE_PROJET;
  }
  if (infos.conception) {
    id = ETAPE_CONCEPTION;
  }
  return id;
};

export const countCurrentStepArticlesRead = async (): Promise<number> => {
  const articlesOfCurrentStep = (await getObjectValue(
    StorageKeysConstants.currentStepArticleIds
  )) as string[] | undefined;

  if (articlesOfCurrentStep && articlesOfCurrentStep.length > 0) {
    const articlesRead =
      ((await getObjectValue(StorageKeysConstants.articlesRead)) as
        | string[]
        | undefined) ?? [];

    const currentStepArticlesRead = articlesRead.filter((id: string) => {
      return articlesOfCurrentStep.includes(id);
    });

    if (currentStepArticlesRead.length > 0) {
      return articlesOfCurrentStep.length - articlesRead.length;
    } else {
      return articlesOfCurrentStep.length;
    }
  }
  return -1;
};
