import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDays, addWeeks, subDays, subMonths, subYears } from "date-fns";
import _ from "lodash";

import { Labels, StorageKeysConstants } from "../../constants";
import {
  StepId,
  USER_SITUATIONS,
  UserInfo,
} from "../../constants/profile.constants";
import type { UserSituation } from "../../types";
import { StepUtils, StorageUtils } from "..";

describe("Step utils", () => {
  describe("nbOfUnreadArticlesInCurrentStep", () => {
    const articleIdsInCurrentStep: number[] = [1, 3, 5];

    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("should return the number of articles in current step when none of them have been read", async () => {
      const readArticleIds = null;
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.currentStepArticleIds,
        articleIdsInCurrentStep
      );
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.articlesRead,
        readArticleIds
      );

      const result = await StepUtils.nbOfUnreadArticlesInCurrentStep();

      expect(result).toEqual(3);
    });

    it("should return the number of unread articles in current step when some of them are read", async () => {
      const readArticleIds: number[] = [3, 7, 11, 12];
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.currentStepArticleIds,
        articleIdsInCurrentStep
      );
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.articlesRead,
        readArticleIds
      );

      const result = await StepUtils.nbOfUnreadArticlesInCurrentStep();

      expect(result).toEqual(2);
    });

    it("should return 0 when all articles in current step are read", async () => {
      const readArticleIds: number[] = [1, 2, 3, 4, 5, 6];
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.currentStepArticleIds,
        articleIdsInCurrentStep
      );
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.articlesRead,
        readArticleIds
      );

      const result = await StepUtils.nbOfUnreadArticlesInCurrentStep();

      expect(result).toEqual(0);
    });

    it("should return -1 when there are no articles for current step", async () => {
      const readArticleIds: number[] = [1, 2, 3, 4, 5, 6];
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.currentStepArticleIds,
        null
      );
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.articlesRead,
        readArticleIds
      );

      const result = await StepUtils.nbOfUnreadArticlesInCurrentStep();

      expect(result).toEqual(-1);
    });
  });

  describe("getCurrentStepId", () => {
    it("should return 1 when user situation is a project and due date is null", () => {
      const dueDate = null;
      const result = StepUtils.getCurrentStepIdOrNull(
        checkUserSituation(UserInfo.projet),
        dueDate
      );
      const expected = StepId.projet;

      expect(result).toEqual(expected);
    });

    it("should return 2 when user situation is conception and due date is null", () => {
      const dueDate = null;
      const result = StepUtils.getCurrentStepIdOrNull(
        checkUserSituation(UserInfo.conception),
        dueDate
      );
      const expected = StepId.conception;

      expect(result).toEqual(expected);
    });

    it("should return 3 when user situation is start of pregnancy and due date is in 40 weeks", () => {
      const dueDate = addWeeks(new Date(), 40).toISOString();
      const result = StepUtils.getCurrentStepIdOrNull(
        checkUserSituation(UserInfo.grossesse),
        dueDate
      );
      const expected = StepId.grossesseDebut;

      expect(result).toEqual(expected);
    });

    it("should return 4 when user situation is end of pregnancy and due date is in 15 weeks", () => {
      const dueDate = addWeeks(new Date(), 15).toISOString();
      const result = StepUtils.getCurrentStepIdOrNull(
        checkUserSituation(UserInfo.grossesse),
        dueDate
      );
      const expected = StepId.grossesseSuiteFin;

      expect(result).toEqual(expected);
    });

    it("should return 6 when user situation is first 3 months of the child and child is a month old", () => {
      const childBirthday = subMonths(new Date(), 1).toISOString();
      const result = StepUtils.getCurrentStepIdOrNull(
        checkUserSituation(UserInfo.enfant),
        childBirthday
      );
      const expected = StepId.enfant3PremiersMois;

      expect(result).toEqual(expected);
    });

    it("should return 7 when user situation is 4 months to a year and child is 5 months old", () => {
      const childBirthday = subMonths(new Date(), 5).toISOString();
      const result = StepUtils.getCurrentStepIdOrNull(
        checkUserSituation(UserInfo.enfant),
        childBirthday
      );
      const expected = StepId.enfant4Mois1An;

      expect(result).toEqual(expected);
    });

    it("should return 8 when user situation is 1 to 2 years and child is 13 months old", () => {
      const childBirthday = subMonths(new Date(), 13).toISOString();
      const result = StepUtils.getCurrentStepIdOrNull(
        checkUserSituation(UserInfo.enfant),
        childBirthday
      );
      const expected = StepId.enfant1An2Ans;

      expect(result).toEqual(expected);
    });
  });

  describe("checkErrorOnProfile", () => {
    it("should not return an error when due date matches with the situation", () => {
      const dueDate = addWeeks(new Date(), 40).toISOString();
      const result = StepUtils.checkErrorOnProfile(
        checkUserSituation(UserInfo.grossesse),
        dueDate
      );

      expect(result).toBeNull();
    });

    it("should return error message when date is required but not typed", () => {
      const dueDate = null;
      const result = StepUtils.checkErrorOnProfile(
        checkUserSituation(UserInfo.grossesse),
        dueDate
      );
      const expected = Labels.profile.dateIsRequired;

      expect(result).toEqual(expected);
    });

    it("should return error message when due date is over usual pregnancy term", () => {
      const dueDate = addWeeks(new Date(), 42).toISOString();
      const result = StepUtils.checkErrorOnProfile(
        checkUserSituation(UserInfo.grossesse),
        dueDate
      );
      const expected = Labels.profile.dateTooFarInFuture;

      expect(result).toEqual(expected);
    });

    it("should return error message when due date is in the past", () => {
      const dueDate = subDays(new Date(), 1).toISOString();
      const result = StepUtils.checkErrorOnProfile(
        checkUserSituation(UserInfo.grossesse),
        dueDate
      );
      const expected = Labels.profile.dateCannotBeInThePast;

      expect(result).toEqual(expected);
    });

    it("should return error message when child date of birth is in the future", () => {
      const childBirthday = addDays(new Date(), 1).toISOString();
      const result = StepUtils.checkErrorOnProfile(
        checkUserSituation(UserInfo.enfant),
        childBirthday
      );
      const expected = Labels.profile.dateCannotBeInTheFuture;

      expect(result).toEqual(expected);
    });

    it("should return error message when child is over two years old", () => {
      const childBirthday = subYears(new Date(), 3).toISOString();
      const result = StepUtils.checkErrorOnProfile(
        checkUserSituation(UserInfo.enfant),
        childBirthday
      );
      const expected = Labels.profile.childTooOld;

      expect(result).toEqual(expected);
    });
  });

  describe("getCheckedUserSituationOrUndefined", () => {
    it("should return the first checked situation", () => {
      const userSituations: UserSituation[] = [
        {
          childBirthdayLabel: "",
          childBirthdayRequired: false,
          id: UserInfo.projet,
          isChecked: false,
          label: Labels.profile.situations.project,
        },
        {
          childBirthdayLabel: "",
          childBirthdayRequired: false,
          id: UserInfo.conception,
          isChecked: true,
          label: Labels.profile.situations.search,
        },
      ];

      const result =
        StepUtils.getCheckedUserSituationOrUndefined(userSituations);
      const expected: UserSituation = {
        childBirthdayLabel: "",
        childBirthdayRequired: false,
        id: UserInfo.conception,
        isChecked: true,
        label: Labels.profile.situations.search,
      };

      expect(result).toEqual(expected);
    });

    it("should return undefined when no situation is checked", () => {
      const result =
        StepUtils.getCheckedUserSituationOrUndefined(USER_SITUATIONS);
      expect(result).toBeUndefined();
    });

    it("should return undefined when there are no situations", () => {
      const result = StepUtils.getCheckedUserSituationOrUndefined(null);
      expect(result).toBeUndefined();
    });
  });
});

const checkUserSituation = (
  situationId: UserInfo
): UserSituation | undefined => {
  const userSituations = _.cloneDeep(USER_SITUATIONS);
  const userSituationIndex = userSituations.findIndex(
    (situation) => situation.id == situationId
  );
  userSituations[userSituationIndex].isChecked = true;

  return userSituations[userSituationIndex];
};
