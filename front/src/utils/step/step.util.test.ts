import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDays, addWeeks, subDays, subMonths, subYears } from "date-fns";
import _ from "lodash";

import { Labels, StorageKeysConstants } from "../../constants";
import {
  GROSSESSE_TOTAL_SEMAINES_SA,
  GROSSESSE_TRIMESTRE_2_SEMAINES_SA,
  StepId,
  USER_SITUATIONS,
  UserInfo,
} from "../../constants/profile.constants";
import type { UserSituation } from "../../types";
import { StepUtils, StorageUtils } from "..";

describe("Step utils", () => {
  describe("Count Articles to read in CurrentStep", () => {
    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("countCurrentStepArticlesNotRead is called with 0 article read", async () => {
      const ARTICLES_CURRENT_STEP: number[] = [1, 3, 5];
      const ARTICLES_READ = null;

      await StorageUtils.storeObjectValue(
        StorageKeysConstants.currentStepArticleIds,
        ARTICLES_CURRENT_STEP
      );
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.articlesRead,
        ARTICLES_READ
      );

      const result = await StepUtils.countCurrentStepArticlesNotRead();
      const expected = ARTICLES_CURRENT_STEP.length;

      expect(result).toEqual(expected);
    });

    it("countCurrentStepArticlesNotRead is called with some articles read", async () => {
      const ARTICLES_CURRENT_STEP: number[] = [1, 3, 5];
      const ARTICLES_READ: number[] = [3, 7, 11, 12];

      await StorageUtils.storeObjectValue(
        StorageKeysConstants.currentStepArticleIds,
        ARTICLES_CURRENT_STEP
      );
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.articlesRead,
        ARTICLES_READ
      );

      const result = await StepUtils.countCurrentStepArticlesNotRead();
      const expected = 2;

      expect(result).toEqual(expected);
    });

    it("countCurrentStepArticlesNotRead is called with all articles read", async () => {
      const ARTICLES_CURRENT_STEP: number[] = [1, 3, 5];
      const ARTICLES_READ: number[] = [1, 2, 3, 4, 5, 6];

      await StorageUtils.storeObjectValue(
        StorageKeysConstants.currentStepArticleIds,
        ARTICLES_CURRENT_STEP
      );
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.articlesRead,
        ARTICLES_READ
      );

      const result = await StepUtils.countCurrentStepArticlesNotRead();
      const expected = 0;

      expect(result).toEqual(expected);
    });

    it("countCurrentStepArticlesNotRead is called with no articles for the current step", async () => {
      const ARTICLES_CURRENT_STEP = null;
      const ARTICLES_READ: number[] = [1, 2, 3, 4, 5, 6];

      await StorageUtils.storeObjectValue(
        StorageKeysConstants.currentStepArticleIds,
        ARTICLES_CURRENT_STEP
      );
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.articlesRead,
        ARTICLES_READ
      );

      const result = await StepUtils.countCurrentStepArticlesNotRead();
      const expected = -1;

      expect(result).toEqual(expected);
    });
  });

  describe("Get Current Step Id", () => {
    afterEach(() => {
      void AsyncStorage.clear();
    });

    const getUserSituations = (userinfo: UserInfo) => {
      const userSituations = _.cloneDeep(USER_SITUATIONS);
      return userSituations.map((userSituation: UserSituation) => {
        if (userSituation.id === userinfo) userSituation.isChecked = true;
        return userSituation;
      });
    };

    it("getCurrentStepId is called for currentStepId  = 'projet'", () => {
      const childBirthday = null;
      const result = StepUtils.getCurrentStepId(
        getUserSituations(UserInfo.projet),
        childBirthday
      );
      const expected = StepId.projet;

      expect(result).toEqual(expected);
    });

    it("getCurrentStepId is called for currentStepId  = 'conception'", () => {
      const childBirthday = null;
      const result = StepUtils.getCurrentStepId(
        getUserSituations(UserInfo.conception),
        childBirthday
      );
      const expected = StepId.conception;

      expect(result).toEqual(expected);
    });

    it("getCurrentStepId is called for currentStepId  = 'grossesseDebut'", () => {
      const childBirthday = addWeeks(
        new Date(),
        GROSSESSE_TOTAL_SEMAINES_SA - 1
      ).toISOString();
      const result = StepUtils.getCurrentStepId(
        getUserSituations(UserInfo.grossesse),
        childBirthday
      );
      const expected = StepId.grossesseDebut;

      expect(result).toEqual(expected);
    });

    it("getCurrentStepId is called for currentStepId  = 'grossesseSuiteFin'", () => {
      const childBirthday = addWeeks(
        new Date(),
        GROSSESSE_TRIMESTRE_2_SEMAINES_SA - 1
      ).toISOString();
      const result = StepUtils.getCurrentStepId(
        getUserSituations(UserInfo.grossesse),
        childBirthday
      );
      const expected = StepId.grossesseSuiteFin;

      expect(result).toEqual(expected);
    });

    it("getCurrentStepId is called for currentStepId  = 'enfant3PremiersMois'", () => {
      const childBirthday = subMonths(new Date(), 1).toISOString();
      const result = StepUtils.getCurrentStepId(
        getUserSituations(UserInfo.enfant),
        childBirthday
      );
      const expected = StepId.enfant3PremiersMois;

      expect(result).toEqual(expected);
    });

    it("getCurrentStepId is called for currentStepId  = 'enfant4Mois1An'", () => {
      const childBirthday = subMonths(new Date(), 5).toISOString();
      const result = StepUtils.getCurrentStepId(
        getUserSituations(UserInfo.enfant),
        childBirthday
      );
      const expected = StepId.enfant4Mois1An;

      expect(result).toEqual(expected);
    });

    it("getCurrentStepId is called for currentStepId  = 'enfant1An2Ans'", () => {
      const childBirthday = subMonths(new Date(), 13).toISOString();
      const result = StepUtils.getCurrentStepId(
        getUserSituations(UserInfo.enfant),
        childBirthday
      );
      const expected = StepId.enfant1An2Ans;

      expect(result).toEqual(expected);
    });
  });

  describe("Check Error On Profile", () => {
    afterEach(() => {
      void AsyncStorage.clear();
    });

    const getUserSituations = (userinfo: UserInfo) => {
      const userSituations = _.cloneDeep(USER_SITUATIONS);
      return userSituations.map((userSituation: UserSituation) => {
        if (userSituation.id === userinfo) userSituation.isChecked = true;
        return userSituation;
      });
    };

    it("checkErrorOnProfile is called with no error", () => {
      const childBirthday = addWeeks(
        new Date(),
        GROSSESSE_TOTAL_SEMAINES_SA - 1
      ).toISOString();
      const result = StepUtils.getErrorMessageOnProfile(
        getUserSituations(UserInfo.grossesse),
        childBirthday
      );
      const expected = null;

      expect(result).toEqual(expected);
    });

    it("getCurrentStepId is called with no date", () => {
      const childBirthday = null;
      const result = StepUtils.getErrorMessageOnProfile(
        getUserSituations(UserInfo.grossesse),
        childBirthday
      );
      const expected = Labels.profile.dateIsRequired;

      expect(result).toEqual(expected);
    });

    it("getCurrentStepId is called with date too far in future (grossesse)", () => {
      const childBirthday = addWeeks(
        new Date(),
        GROSSESSE_TOTAL_SEMAINES_SA + 1
      ).toISOString();
      const result = StepUtils.getErrorMessageOnProfile(
        getUserSituations(UserInfo.grossesse),
        childBirthday
      );
      const expected = Labels.profile.dateTooFarInFuture;

      expect(result).toEqual(expected);
    });

    it("getCurrentStepId is called with date in the past (grossesse)", () => {
      const childBirthday = subDays(new Date(), 1).toISOString();
      const result = StepUtils.getErrorMessageOnProfile(
        getUserSituations(UserInfo.grossesse),
        childBirthday
      );
      const expected = Labels.profile.dateCannotBeInThePast;

      expect(result).toEqual(expected);
    });

    it("getCurrentStepId is called with date in the future (enfant)", () => {
      const childBirthday = addDays(new Date(), 1).toISOString();
      const result = StepUtils.getErrorMessageOnProfile(
        getUserSituations(UserInfo.enfant),
        childBirthday
      );
      const expected = Labels.profile.dateCannotBeInTheFuture;

      expect(result).toEqual(expected);
    });

    it("getCurrentStepId is called with date to far in the future (enfant)", () => {
      const childBirthday = subYears(new Date(), 3).toISOString();
      const result = StepUtils.getErrorMessageOnProfile(
        getUserSituations(UserInfo.enfant),
        childBirthday
      );
      const expected = Labels.profile.childTooOld;

      expect(result).toEqual(expected);
    });
  });
});
