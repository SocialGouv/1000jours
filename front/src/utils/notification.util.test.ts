import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDays, isAfter, subDays } from "date-fns";

import {
  Labels,
  NotificationConstants,
  StorageKeysConstants,
} from "../constants";
import { NotificationUtils, StorageUtils } from ".";
import { NotificationType } from "./notification.util";

describe("Notification utils", () => {
  describe("Build Articles Notification Content", () => {
    const CURRENT_STEP = {
      debut: 0,
      description: null,
      fin: 90,
      id: "6",
      nom: "De 0 à 3 mois",
      ordre: 6,
    };

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
});
