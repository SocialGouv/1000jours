import {
  addMonths,
  addWeeks,
  addYears,
  isAfter,
  isBefore,
  subWeeks,
} from "date-fns";
import _ from "lodash";

import { Labels, StorageKeysConstants } from "../../constants";
import type { UserInfo } from "../../constants/profile.constants";
import {
  DEFAULT_USER_INFOS,
  GROSSESSE_TOTAL_SEMAINES_SA,
  GROSSESSE_TRIMESTRE_2_SEMAINES_SA,
  StepId,
} from "../../constants/profile.constants";
import type { UserInfos, UserSituation } from "../../types";
import { getObjectValue } from "./../storage.util";

const getUserInformation = (
  userSituations: UserSituation[] | null,
  childBirthday: string | null | undefined
): UserInfos => {
  const userInformation: UserInfos = _.cloneDeep(DEFAULT_USER_INFOS);
  if (userSituations && userSituations.length > 0) {
    userSituations.map((userSituation) => {
      const id = userSituation.id as keyof typeof UserInfo;
      userInformation[id] = userSituation.isChecked;
    });
  }
  if (childBirthday && childBirthday.length > 0)
    userInformation.date = childBirthday;

  return userInformation;
};

const getErrorMessageForPregnancy = (date: Date): string | null => {
  const now = new Date();
  const startOfPregnancy = subWeeks(date, GROSSESSE_TOTAL_SEMAINES_SA);

  return isBefore(now, startOfPregnancy)
    ? Labels.profile.dateTooFarInFuture
    : isBefore(date, now)
    ? Labels.profile.dateCannotBeInThePast
    : null;
};

const getErrorMessageForChild = (date: Date): string | null => {
  const now = new Date();

  return isBefore(now, date)
    ? Labels.profile.dateCannotBeInTheFuture
    : isAfter(now, addYears(date, 2))
    ? Labels.profile.childTooOld
    : null;
};

export const getErrorMessageOnProfile = (
  userSituations: UserSituation[],
  childBirthday: string | null | undefined
): string | null => {
  const userInformation = getUserInformation(userSituations, childBirthday);
  let errorMessage = null;
  if (
    userInformation.grossesse ||
    userInformation.enfant ||
    userInformation.enfants
  ) {
    if (!userInformation.date) {
      errorMessage = Labels.profile.dateIsRequired;
    } else {
      const date = new Date(userInformation.date);
      if (userInformation.grossesse) {
        errorMessage = getErrorMessageForPregnancy(date);
      } else if (userInformation.enfant || userInformation.enfants) {
        errorMessage = getErrorMessageForChild(date);
      }
    }
  }
  return errorMessage;
};

const getCurrentStep = (date: Date): number => {
  const now = new Date();
  const startOfPregnancy = subWeeks(date, GROSSESSE_TOTAL_SEMAINES_SA);
  const secondTrimester = addWeeks(
    startOfPregnancy,
    GROSSESSE_TRIMESTRE_2_SEMAINES_SA
  );

  // Période de grossesse
  if (isBefore(now, date)) {
    return isBefore(now, secondTrimester)
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
  const userInformation = getUserInformation(userSituations, childBirthday);
  if (
    (userInformation.grossesse ||
      userInformation.enfant ||
      userInformation.enfants) &&
    userInformation.date
  ) {
    const date = new Date(userInformation.date);
    id = getCurrentStep(date);
  } else if (userInformation.projet) {
    id = StepId.projet;
  }
  if (userInformation.conception) {
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
