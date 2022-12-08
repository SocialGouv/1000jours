import AsyncStorage from "@react-native-async-storage/async-storage";
import { sub } from "date-fns";

import { TrackerUtils } from "..";
import { NotificationType } from "../notifications/notification.util";

describe("Tracker Utils", () => {
  describe("dateWithMinHoursDelayIsBeforeNow", () => {
    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("should return false when the app was opened less than 6 hours ago", () => {
      const lastOpeningDate = new Date();
      const result =
        TrackerUtils.dateWithMinHoursDelayIsBeforeNow(lastOpeningDate);
      expect(result).toBeFalsy();
    });

    it("should return true when the app was opened more than 6 hours ago", () => {
      const lastOpeningDate = sub(new Date(), { hours: 6, seconds: 1 });
      const result =
        TrackerUtils.dateWithMinHoursDelayIsBeforeNow(lastOpeningDate);
      expect(result).toBeTruthy();
    });
  });

  describe("trackerArticlesScreenName", () => {
    it("should return full name when step name is not null", () => {
      const result = TrackerUtils.trackerArticlesScreenName("Accouchement");
      const expected = "Liste d'articles : Accouchement";
      expect(result).toEqual(expected);
    });

    it("should return partial name when step name is null", () => {
      const result = TrackerUtils.trackerArticlesScreenName(null);
      const expected = "Liste d'articles";
      expect(result).toEqual(expected);
    });
  });

  describe("notificationModalTrackerAction", () => {
    it("should return full name when action name is not empty", () => {
      const result = TrackerUtils.notificationModalTrackerAction(
        NotificationType.articles,
        "Consulter"
      );
      const expected = "Notification (articles) - Consulter";
      expect(result).toEqual(expected);
    });

    it("should return partial name when action name is empty", () => {
      const result = TrackerUtils.notificationModalTrackerAction(
        NotificationType.articles,
        ""
      );
      const expected = "Notification (articles) - ";
      expect(result).toEqual(expected);
    });
  });
});
