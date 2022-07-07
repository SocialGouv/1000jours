import {
  addMonths,
  addWeeks,
  addYears,
  isAfter,
  isBefore,
  subWeeks,
} from "date-fns";
import _ from "lodash";

import { Labels, StorageKeysConstants } from "../constants";
import type { UserInfo } from "../constants/profile.constants";
import {
  DEFAULT_USER_INFOS,
  GROSSESSE_TOTAL_SEMAINES_SA,
  GROSSESSE_TRIMESTRE_2_SEMAINES_SA,
  StepId,
} from "../constants/profile.constants";
import type { UserInfos, UserSituation } from "../types";
import { getObjectValue } from "./storage.util";

const getUserInfos = (
  userSituations: UserSituation[] | null,
  childBirthday: string | null | undefined
): UserInfos => {
  const infos: UserInfos = _.cloneDeep(DEFAULT_USER_INFOS);
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
    errorMessage = Labels.profile.dateTooFarInFuture;
  } else if (isBefore(date, now)) {
    errorMessage = Labels.profile.dateCannotBeInThePast;
  }
  return errorMessage;
};

const checkErrorForEnfant = (date: Date): string | null => {
  let errorMessage = null;
  const now = new Date();
  if (isBefore(now, date)) {
    errorMessage = Labels.profile.dateCannotBeInTheFuture;
  } else if (isAfter(now, addYears(date, 2))) {
    errorMessage = Labels.profile.childTooOld;
  }
  return errorMessage;
};

export const checkErrorOnProfile = (
  userSituations: UserSituation[],
  childBirthday: string | null | undefined
): string | null => {
  const infos = getUserInfos(userSituations, childBirthday);
  let errorMessage = null;
  if (infos.grossesse || infos.enfant || infos.enfants) {
    if (!infos.date) {
      errorMessage = Labels.profile.dateIsRequired;
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

const calcCurrentStep = (date: Date): number => {
  const now = new Date();
  const grossesseDebut = subWeeks(date, GROSSESSE_TOTAL_SEMAINES_SA);
  const trimestre2 = addWeeks(
    grossesseDebut,
    GROSSESSE_TRIMESTRE_2_SEMAINES_SA
  );

  // Période de grossesse
  if (isBefore(now, date)) {
    return isBefore(now, trimestre2)
      ? StepId.grossesseDebut
      : StepId.grossesseSuiteFin;
  }
  // Période après l'accouchement
  if (isAfter(now, addYears(date, 1))) {
    return StepId.enfant1An2Ans;
  }
  if (isAfter(now, addMonths(date, 3))) {
    return StepId.enfant4Mois1An;
  }
  return StepId.enfant3PremiersMois;
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
    id = StepId.projet;
  }
  if (infos.conception) {
    id = StepId.conception;
  }
  return id;
};

export const countCurrentStepArticlesNotRead = async (): Promise<number> => {
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

    const nbArticlesOfCurrentStep = articlesOfCurrentStep.length;
    const nbCurrentStepArticlesRead = currentStepArticlesRead.length;
    return nbCurrentStepArticlesRead > 0
      ? nbArticlesOfCurrentStep - nbCurrentStepArticlesRead
      : nbArticlesOfCurrentStep;
  }
  return -1;
};
