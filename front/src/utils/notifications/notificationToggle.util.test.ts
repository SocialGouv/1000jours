import AsyncStorage from "@react-native-async-storage/async-storage";

import { StorageKeysConstants } from "../../constants";
import { NotificationToggleUtils, NotificationUtils } from "..";
import { NotificationType } from "./notification.util";

describe("Notification Toggle Utils", () => {
  describe("isToggleOn", () => {
    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("should return true when stored value is true", async () => {
      await AsyncStorage.setItem(
        StorageKeysConstants.notifToggleMoodboard,
        "true"
      );

      await NotificationToggleUtils.isToggleOn(NotificationType.moodboard).then(
        (data) => {
          expect(data).toEqual(true);
        }
      );
    });

    it("should return false when stored value is false", async () => {
      await AsyncStorage.setItem(
        StorageKeysConstants.notifToggleMoodboard,
        "false"
      );

      await NotificationToggleUtils.isToggleOn(NotificationType.moodboard).then(
        (data) => {
          expect(data).toEqual(false);
        }
      );
    });

    it("should return false when key for type is undefined", async () => {
      await NotificationToggleUtils.isToggleOn(NotificationType.epds).then(
        (data) => {
          expect(data).toEqual(false);
        }
      );
    });
  });

  describe("getStorageKey", () => {
    it("should return notifToggleMoodboard when type is moodboard", () => {
      expect(
        NotificationToggleUtils.getStorageKey(NotificationType.moodboard)
      ).toEqual("@notifToggleMoodboard");
    });

    it("should return notifToggleArticles when type is articles", () => {
      expect(
        NotificationToggleUtils.getStorageKey(NotificationType.articles)
      ).toEqual("@notifToggleArticles");
    });

    it("should return undefined when type is not articles or moodboard", () => {
      expect(
        NotificationToggleUtils.getStorageKey(NotificationType.epds)
      ).toBeUndefined();
    });
  });

  describe("updateNotification", () => {
    it("should call updateArticlesNotification when type is articles", () => {
      const articlesNotificationSpy = jest.spyOn(
        NotificationUtils,
        "updateArticlesNotification"
      );
      NotificationToggleUtils.updateNotification(NotificationType.articles);
      expect(articlesNotificationSpy).toHaveBeenCalled();
    });

    it("should call scheduleMoodboardNotifications when type is moodboard", () => {
      const moodboardNotificationSpy = jest.spyOn(
        NotificationUtils,
        "scheduleMoodboardNotifications"
      );
      NotificationToggleUtils.updateNotification(NotificationType.moodboard);
      expect(moodboardNotificationSpy).toHaveBeenCalled();
    });
  });
});
