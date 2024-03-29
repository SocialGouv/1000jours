import AsyncStorage from "@react-native-async-storage/async-storage";

import { StorageKeysConstants } from "../../constants";
import type { Event } from "../../types";
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
          expect(data).toBeTruthy();
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
          expect(data).toBeFalsy();
        }
      );
    });

    it("should return true when key for type is undefined (toogle default value)", async () => {
      await NotificationToggleUtils.isToggleOn(NotificationType.epds).then(
        (data) => {
          expect(data).toBeTruthy();
        }
      );
    });

    it("should return true when key for type is defined and value is undefined", async () => {
      await NotificationToggleUtils.isToggleOn(NotificationType.moodboard).then(
        (data) => {
          expect(data).toBeTruthy();
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

    it("should return notifToggleEvents when type is event", () => {
      expect(
        NotificationToggleUtils.getStorageKey(NotificationType.event)
      ).toEqual("@notifToggleEvents");
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

    it("should call scheduleEventsNotification when type is event", () => {
      const eventNotificationSpy = jest.spyOn(
        NotificationUtils,
        "scheduleEventsNotification"
      );
      const event: Event = {
        debut: 0,
        fin: 8,
        id: 1,
        nom: "événement",
      };

      NotificationToggleUtils.updateNotification(NotificationType.event, [
        event,
      ]);
      expect(eventNotificationSpy).toHaveBeenCalled();
    });
  });
});
