import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDays, isAfter, subDays } from "date-fns";

import {
  Labels,
  NotificationConstants,
  StorageKeysConstants,
} from "../../constants";
import type { Step } from "../../types";
import { NotificationUtils, StorageUtils } from "..";
import { NotificationType } from "./notification.util";

describe("Notification utils", () => {
  const CURRENT_STEP = {
    debut: 0,
    description: null,
    fin: 90,
    id: "6",
    nom: "De 0 à 3 mois",
    ordre: 6,
  };

  describe("Build Articles Notification Content", () => {
    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("buildArticlesNotificationContent is called with articles to read (NB_ARTICLE_TO_READ > 0)", async () => {
      const NB_ARTICLE_TO_READ = 3;
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.currentStep,
        CURRENT_STEP
      );
      const content = await NotificationUtils.buildArticlesNotificationContent(
        NB_ARTICLE_TO_READ
      );
      const expected = {
        body: `${Labels.article.notification.articlesToRead.bodyPart1} ${NB_ARTICLE_TO_READ} ${Labels.article.notification.articlesToRead.bodyPart2}.`,
        data: {
          redirectFromRoot: false,
          redirectParams: { step: CURRENT_STEP },
          redirectTitle:
            Labels.article.notification.articlesToRead.redirectTitle,
          redirectTo: NotificationConstants.SCREEN_ARTICLES,
          type: NotificationType.articles,
        },
        title: Labels.article.notification.articlesToRead.title,
      };

      expect(content).toEqual(expected);
    });

    it("buildArticlesNotificationContent is called with no articles to read (NB_ARTICLE_TO_READ = 0)", async () => {
      const NB_ARTICLE_TO_READ = 0;
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.currentStep,
        CURRENT_STEP
      );
      const content = await NotificationUtils.buildArticlesNotificationContent(
        NB_ARTICLE_TO_READ
      );

      const expected = {
        body: Labels.article.notification.congrats.body,
        data: {
          confetti: true,
          redirectFromRoot: false,
          redirectParams: null,
          redirectTitle: Labels.article.notification.congrats.redirectTitle,
          redirectTo: null,
          type: NotificationType.articles,
        },
        title: Labels.article.notification.congrats.title,
      };

      expect(content).toEqual(expected);
    });

    it("buildArticlesNotificationContent is called with a problem (NB_ARTICLE_TO_READ = -1)", async () => {
      const NB_ARTICLE_TO_READ = -1;
      const content = await NotificationUtils.buildArticlesNotificationContent(
        NB_ARTICLE_TO_READ
      );
      const expected = null;

      expect(content).toEqual(expected);
    });

    it("getValidTriggerDate is called with a future date", () => {
      const originalDate = addDays(new Date(), 1);
      const triggerDate = NotificationUtils.getValidTriggerDate(originalDate);
      const expected = isAfter(triggerDate, new Date());

      expect(true).toEqual(expected);
    });
    it("getValidTriggerDate is called with a past date", () => {
      const originalDate = subDays(new Date(), 1);
      const triggerDate = NotificationUtils.getValidTriggerDate(originalDate);
      const expected = isAfter(triggerDate, new Date());

      expect(true).toEqual(expected);
    });
  });

  describe("getNotificationTrigger", () => {
    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("getNotificationTrigger with 0 article and no trigger", async () => {
      const result = await NotificationUtils.getNotificationTrigger(0, null);
      const expected = NotificationConstants.MIN_TRIGGER;

      expect(result).toEqual(expected);
    });

    it("getNotificationTrigger with articles", async () => {
      const notifTrigger = { seconds: 20 };
      const result = await NotificationUtils.getNotificationTrigger(
        5,
        notifTrigger
      );
      const expected = { seconds: 20 };

      expect(result).toEqual(expected);
    });

    it("getNotificationTrigger with articles and no trigger", async () => {
      const result = await NotificationUtils.getNotificationTrigger(5, null);
      const expected = new Date(
        addDays(
          new Date(),
          NotificationConstants.NUMBER_OF_DAYS_NOTIF_ARTICLES_REMINDER
        ).setHours(NotificationConstants.ARTICLES_NOTIF_TRIGGER_HOUR, 0, 0, 0)
      );

      expect(result).toEqual(expected);
      await StorageUtils.getObjectValue(
        StorageKeysConstants.triggerForArticlesNotification
      ).then((data) => {
        expect(data).toEqual(expected.toJSON());
      });
    });
  });

  describe("hasBeenAlreadyNotifiedForArticles", () => {
    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("hasBeenAlreadyNotifiedForArticles with currentStep is null", () => {
      const CURRENT_STEP = null;
      const stepsAlreadyCongratulatedForArticles = ["6"];
      const data = NotificationUtils.hasBeenAlreadyNotifiedForArticles(
        CURRENT_STEP,
        stepsAlreadyCongratulatedForArticles
      );
      expect(data).toBeFalsy();
    });

    it("hasBeenAlreadyNotifiedForArticles with stepsAlreadyCongratulatedForArticles is null", () => {
      const CURRENT_STEP = {
        active: true,
        debut: 0,
        description: null,
        fin: 90,
        id: 6,
        nom: "De 0 à 3 mois",
        ordre: 6,
      };
      const stepsAlreadyCongratulatedForArticles = null;
      const data = NotificationUtils.hasBeenAlreadyNotifiedForArticles(
        CURRENT_STEP,
        stepsAlreadyCongratulatedForArticles
      );
      expect(data).toBeFalsy();
    });

    it("hasBeenAlreadyNotifiedForArticles is false", () => {
      const CURRENT_STEP = {
        active: true,
        debut: 0,
        description: null,
        fin: 90,
        id: 6,
        nom: "De 0 à 3 mois",
        ordre: 6,
      };
      const stepsAlreadyCongratulatedForArticles = ["1"];
      const data = NotificationUtils.hasBeenAlreadyNotifiedForArticles(
        CURRENT_STEP,
        stepsAlreadyCongratulatedForArticles
      );
      expect(data).toBeFalsy();
    });

    it("hasBeenAlreadyNotifiedForArticles is true", () => {
      const CURRENT_STEP = {
        active: true,
        debut: 0,
        description: null,
        fin: 90,
        id: 6,
        nom: "De 0 à 3 mois",
        ordre: 6,
      };
      const stepsAlreadyCongratulatedForArticles = ["6"];
      const data = NotificationUtils.hasBeenAlreadyNotifiedForArticles(
        CURRENT_STEP,
        stepsAlreadyCongratulatedForArticles
      );
      expect(data).toBeTruthy();
    });
  });

  describe("saveStepForCongratNotifScheduled", () => {
    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("saveStepForCongratNotifScheduled with no article and currentStep is null", async () => {
      await NotificationUtils.saveStepForCongratNotifScheduled(0, null, null);
      await StorageUtils.getObjectValue(
        StorageKeysConstants.stepsAlreadyCongratulatedForArticles
      ).then((data) => {
        expect(data).toBeNull();
      });
    });

    it("saveStepForCongratNotifScheduled with no article, currentStep and no stepsAlreadyCongratulatedForArticles", async () => {
      const currentStep: Step = {
        active: null,
        debut: 0,
        description: null,
        fin: 90,
        id: 6,
        nom: "De 0 à 3 mois",
        ordre: 6,
      };
      const expected = ["6"];

      await NotificationUtils.saveStepForCongratNotifScheduled(
        0,
        currentStep,
        null
      );
      await StorageUtils.getObjectValue(
        StorageKeysConstants.stepsAlreadyCongratulatedForArticles
      ).then((data) => {
        expect(data).toEqual(expected);
      });
    });

    it("saveStepForCongratNotifScheduled with no article, currentStep and stepsAlreadyCongratulatedForArticles", async () => {
      const currentStep: Step = {
        active: null,
        debut: 0,
        description: null,
        fin: 90,
        id: 6,
        nom: "De 0 à 3 mois",
        ordre: 6,
      };
      const stepsAlreadyCongratulatedForArticles = ["2", "5"];
      const expected = ["2", "5", "6"];

      await NotificationUtils.saveStepForCongratNotifScheduled(
        0,
        currentStep,
        stepsAlreadyCongratulatedForArticles
      );
      await StorageUtils.getObjectValue(
        StorageKeysConstants.stepsAlreadyCongratulatedForArticles
      ).then((data) => {
        expect(data).toEqual(expected);
      });
    });
  });
});
