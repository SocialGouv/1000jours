import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDays, isAfter, subDays } from "date-fns";

import { Labels, StorageKeysConstants } from "../../../constants";
import type { Step } from "../../../types";
import { ArticlesNotificationUtils, StorageUtils } from "../..";

describe("Notification Utils", () => {
  describe("buildArticlesNotificationContent", () => {
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

    it("should return content for current step when there are articles to read", async () => {
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.currentStep,
        CURRENT_STEP
      );

      await ArticlesNotificationUtils.buildArticlesNotificationContent(3).then(
        (content) => {
          expect(content).toEqual({
            body: "Il vous reste 3 article(s) à lire concernant votre étape.",
            data: {
              redirectFromRoot: false,
              redirectParams: { step: CURRENT_STEP },
              redirectTitle: "Consulter",
              redirectTo: "articleList",
              type: "articles",
            },
            title: Labels.article.notification.articlesToRead.title,
          });
        }
      );
    });

    it("should return content with congratulations when all articles are read", async () => {
      await ArticlesNotificationUtils.buildArticlesNotificationContent(0).then(
        (content) => {
          expect(content).toEqual({
            body: "Vous avez lu tous les articles présents actuellement à l’étape suite et fin de grossesse ! Vous faites parti de nos grand(e)s lecteur(rices). \n\nNous en ajoutons régulièrement, vous pouvez aussi lire des articles dans d’autres étapes.",
            data: {
              confetti: true,
              redirectFromRoot: false,
              redirectParams: null,
              redirectTitle: "Fermer",
              redirectTo: null,
              type: "articles",
            },
            title: "Félicitations !",
          });
        }
      );
    });

    it("should return null when an issue has occurred", async () => {
      await ArticlesNotificationUtils.buildArticlesNotificationContent(-1).then(
        (content) => {
          expect(content).toBeNull();
        }
      );
    });
  });

  describe("getValidTriggerDate", () => {
    it("should return future trigger date when original date is a future date", () => {
      const originalDate = addDays(new Date(), 1);
      const triggerDate =
        ArticlesNotificationUtils.getValidTriggerDate(originalDate);

      expect(isAfter(triggerDate, new Date())).toEqual(true);
    });

    it("should return past trigger date when original date is a past date", () => {
      const originalDate = subDays(new Date(), 1);
      const triggerDate =
        ArticlesNotificationUtils.getValidTriggerDate(originalDate);

      expect(isAfter(triggerDate, new Date())).toEqual(true);
    });
  });

  describe("getNotificationTrigger", () => {
    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("should return minimal trigger when there is no article and trigger input is null", async () => {
      await ArticlesNotificationUtils.getNotificationTrigger(0, null).then(
        (trigger) => {
          expect(trigger).toEqual({ seconds: 10 });
        }
      );
    });

    it("should return trigger when there are some articles and trigger input is not null", async () => {
      await ArticlesNotificationUtils.getNotificationTrigger(5, {
        seconds: 20,
      }).then((trigger) => {
        expect(trigger).toEqual({ seconds: 20 });
      });
    });

    it("should return trigger with new date when there are some articles and trigger input is null", async () => {
      const expected = new Date(addDays(new Date(), 14).setHours(18, 0, 0, 0));

      await ArticlesNotificationUtils.getNotificationTrigger(5, null).then(
        (trigger) => {
          expect(trigger).toEqual(expected);
        }
      );
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

    it("should return false when current step is null", () => {
      expect(
        ArticlesNotificationUtils.hasBeenAlreadyNotifiedForArticles(null, ["6"])
      ).toBeFalsy();
    });

    it("should return false when no step is stored", () => {
      const CURRENT_STEP = {
        active: true,
        debut: 0,
        description: null,
        fin: 90,
        id: 6,
        nom: "De 0 à 3 mois",
        ordre: 6,
      };
      expect(
        ArticlesNotificationUtils.hasBeenAlreadyNotifiedForArticles(
          CURRENT_STEP,
          null
        )
      ).toBeFalsy();
    });

    it("should return false when current step has not already been stored but other steps are", () => {
      const CURRENT_STEP = {
        active: true,
        debut: 0,
        description: null,
        fin: 90,
        id: 6,
        nom: "De 0 à 3 mois",
        ordre: 6,
      };
      expect(
        ArticlesNotificationUtils.hasBeenAlreadyNotifiedForArticles(
          CURRENT_STEP,
          ["1"]
        )
      ).toBeFalsy();
    });

    it("should return true when current step has already been stored", () => {
      const CURRENT_STEP = {
        active: true,
        debut: 0,
        description: null,
        fin: 90,
        id: 6,
        nom: "De 0 à 3 mois",
        ordre: 6,
      };
      expect(
        ArticlesNotificationUtils.hasBeenAlreadyNotifiedForArticles(
          CURRENT_STEP,
          ["6"]
        )
      ).toBeTruthy();
    });
  });

  describe("saveStepForCongratNotifScheduled", () => {
    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("should not store step id when all articles are read but currentStep is null", async () => {
      await ArticlesNotificationUtils.saveStepForCongratNotifScheduled(
        0,
        null,
        null
      );
      await StorageUtils.getObjectValue(
        StorageKeysConstants.stepsAlreadyCongratulatedForArticles
      ).then((data) => {
        expect(data).toBeNull();
      });
    });

    it("should store step id when all article are read and currentStep is not null", async () => {
      const currentStep: Step = {
        active: null,
        debut: 0,
        description: null,
        fin: 90,
        id: 6,
        nom: "De 0 à 3 mois",
        ordre: 6,
      };

      await ArticlesNotificationUtils.saveStepForCongratNotifScheduled(
        0,
        currentStep,
        null
      );
      await StorageUtils.getObjectValue(
        StorageKeysConstants.stepsAlreadyCongratulatedForArticles
      ).then((data) => {
        expect(data).toEqual(["6"]);
      });
    });

    it("should add step id when all articles are read, current step is not null, and steps are already stored", async () => {
      const currentStep: Step = {
        active: null,
        debut: 0,
        description: null,
        fin: 90,
        id: 6,
        nom: "De 0 à 3 mois",
        ordre: 6,
      };
      await ArticlesNotificationUtils.saveStepForCongratNotifScheduled(
        0,
        currentStep,
        ["2", "5"]
      );
      await StorageUtils.getObjectValue(
        StorageKeysConstants.stepsAlreadyCongratulatedForArticles
      ).then((data) => {
        expect(data).toEqual(["2", "5", "6"]);
      });
    });
  });
});
