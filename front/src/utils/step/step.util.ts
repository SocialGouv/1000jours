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

export const checkErrorOnProfile = (
  userSituation: UserSituation | undefined,
  childBirthday: string | null | undefined
): string | null => {
  const information = getUserInformation(userSituation, childBirthday);
  if (!information.conception && !information.projet) {
    if (!information.date) return Labels.profile.dateIsRequired;

    const date = new Date(information.date);
    const now = new Date();
    if (information.grossesse) return getPregnancyErrorMessageOrNull(now, date);
    if (information.enfant || information.enfants)
      return getErrorMessageForChildOrNull(now, date);
  }
  return null;
};

export const getCheckedUserSituationOrUndefined = (
  userSituations: UserSituation[] | null
): UserSituation | undefined => _.find(userSituations, { isChecked: true });

export const getCurrentStepIdOrNull = (
  checkedUserSituation: UserSituation | undefined,
  childBirthday: string | null | undefined
): number | null => {
  const information = getUserInformation(checkedUserSituation, childBirthday);
  if (
    (information.grossesse || information.enfant || information.enfants) &&
    information.date
  ) {
    const date = new Date(information.date);
    return currentStepId(date);
  }
  if (information.projet) return StepId.projet;
  if (information.conception) return StepId.conception;

  return null;
};

export const nbOfUnreadArticlesInCurrentStep = async (): Promise<number> => {
  const articleIdsInCurrentStep = await getArticleIdsInCurrentStep();

  if (articleIdsInCurrentStep && articleIdsInCurrentStep.length > 0) {
    const readArticleIds = await getReadArticleIds();

    const nbOfReadArticlesInCurrentStep = getNbOfReadArticlesInCurrentStep(
      articleIdsInCurrentStep,
      readArticleIds
    );
    const nbOfArticlesInCurrentStep = articleIdsInCurrentStep.length;

    return nbOfArticlesInCurrentStep - nbOfReadArticlesInCurrentStep;
  }
  return -1;
};

const getNbOfReadArticlesInCurrentStep = (
  articleIdsInCurrentStep: string[],
  readArticleIds: string[] | undefined
): number =>
  readArticleIds?.filter((id: string) => articleIdsInCurrentStep.includes(id))
    .length ?? 0;

const getArticleIdsInCurrentStep = async (): Promise<string[] | undefined> =>
  (await getObjectValue(StorageKeysConstants.currentStepArticleIds)) as
    | string[]
    | undefined;

const getReadArticleIds = async (): Promise<string[] | undefined> =>
  (await getObjectValue(StorageKeysConstants.articlesRead)) as
    | string[]
    | undefined;

const getUserInformation = (
  checkedUserSituation: UserSituation | undefined,
  childBirthday: string | null | undefined
): UserInfos => {
  const userInformation: UserInfos = _.cloneDeep(DEFAULT_USER_INFOS);
  if (checkedUserSituation) {
    const id = checkedUserSituation.id as keyof typeof UserInfo;
    userInformation[id] = checkedUserSituation.isChecked;
  }
  if (childBirthday && childBirthday.length > 0)
    userInformation.date = childBirthday;

  return userInformation;
};

const getPregnancyErrorMessageOrNull = (
  now: Date,
  date: Date
): string | null => {
  if (isBefore(now, startOfPregnancy(date)))
    return Labels.profile.dateTooFarInFuture;
  if (isBefore(date, now)) return Labels.profile.dateCannotBeInThePast;
  return null;
};

const getErrorMessageForChildOrNull = (
  now: Date,
  date: Date
): string | null => {
  if (isBefore(now, date)) return Labels.profile.dateCannotBeInTheFuture;
  if (isAfter(now, addYears(date, 2))) return Labels.profile.childTooOld;
  return null;
};

const currentStepId = (date: Date): number => {
  const now = new Date();
  const secondTrimester = addWeeks(
    startOfPregnancy(date),
    GROSSESSE_TRIMESTRE_2_SEMAINES_SA
  );

  // During pregnancy
  if (isBefore(now, date))
    return isBefore(now, secondTrimester)
      ? StepId.grossesseDebut
      : StepId.grossesseSuiteFin;
  // After giving birth
  if (isAfter(now, addYears(date, 1))) return StepId.enfant1An2Ans;
  if (isAfter(now, addMonths(date, 3))) return StepId.enfant4Mois1An;

  return StepId.enfant3PremiersMois;
};

const startOfPregnancy = (date: Date): Date =>
  subWeeks(date, GROSSESSE_TOTAL_SEMAINES_SA);
