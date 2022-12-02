import AsyncStorage from "@react-native-async-storage/async-storage";

import { StorageKeysConstants } from "../../constants";
import { AppUtils, InAppReviewUtils, StorageUtils } from "..";

describe("App utils", () => {
  describe("hasNewVersionAvailable", () => {
    it("hasNewVersionAvailable is called with null", () => {
      const currentVersion = "1.1.1";
      const lastVersionAvailable = null;
      const hasNewVersion = AppUtils.hasNewVersionAvailable(
        currentVersion,
        lastVersionAvailable
      );
      expect(hasNewVersion).toEqual(false);
    });

    it("hasNewVersionAvailable is called with same version", () => {
      const currentVersion = "1.1.1";
      const lastVersionAvailable = "1.1.1";
      const hasNewVersion = AppUtils.hasNewVersionAvailable(
        currentVersion,
        lastVersionAvailable
      );
      expect(hasNewVersion).toEqual(false);
    });

    it("hasNewVersionAvailable is called with older versions", () => {
      const currentVersion = "1.1.1";
      let lastVersionAvailable = "1.1.0";
      let hasNewVersion = AppUtils.hasNewVersionAvailable(
        currentVersion,
        lastVersionAvailable
      );
      expect(hasNewVersion).toEqual(false);

      lastVersionAvailable = "1.0.2";
      hasNewVersion = AppUtils.hasNewVersionAvailable(
        currentVersion,
        lastVersionAvailable
      );
      expect(hasNewVersion).toEqual(false);

      lastVersionAvailable = "0.2.2";
      hasNewVersion = AppUtils.hasNewVersionAvailable(
        currentVersion,
        lastVersionAvailable
      );
      expect(hasNewVersion).toEqual(false);
    });

    it("hasNewVersionAvailable is called with new versions", () => {
      const currentVersion = "1.1.1";
      let lastVersionAvailable = "1.1.2";
      let hasNewVersion = AppUtils.hasNewVersionAvailable(
        currentVersion,
        lastVersionAvailable
      );
      expect(hasNewVersion).toEqual(true);

      lastVersionAvailable = "1.2.0";
      hasNewVersion = AppUtils.hasNewVersionAvailable(
        currentVersion,
        lastVersionAvailable
      );
      expect(hasNewVersion).toEqual(true);

      lastVersionAvailable = "2.0.0";
      hasNewVersion = AppUtils.hasNewVersionAvailable(
        currentVersion,
        lastVersionAvailable
      );
      expect(hasNewVersion).toEqual(true);
    });
  });

  describe("shouldTriggerInAppReview", () => {
    it("should return false when the app has been opened less than 3 times", () => {
      expect(AppUtils.shouldTriggerInAppReview(0)).toBeFalsy();
    });

    it("should return true when the app has been opened 3 times", () => {
      expect(AppUtils.shouldTriggerInAppReview(1)).toBeTruthy();
    });

    it("should return true when the app has been opened more than 3 times", () => {
      expect(AppUtils.shouldTriggerInAppReview(2)).toBeTruthy();
    });
  });

  describe("handleInAppReview", () => {
    const inAppReviewSpy = jest.spyOn(
      InAppReviewUtils,
      "scheduleInAppReviewNotification"
    );

    afterEach(() => {
      void AsyncStorage.clear();
      inAppReviewSpy.mockRestore();
    });

    it("should store in-app review trigger when app has been opened 3 times and review not triggered yet", async () => {
      await AppUtils.handleInAppReviewPopup(1);

      expect(inAppReviewSpy).toHaveBeenCalledTimes(1);
      await StorageUtils.getObjectValue(
        StorageKeysConstants.hasTriggeredInAppReview
      ).then((data) => {
        expect(data).toBeTruthy();
      });
    });

    it("should not call for in-app review when app has been opened less than 3 times", async () => {
      await AppUtils.handleInAppReviewPopup(0);

      expect(inAppReviewSpy).toHaveBeenCalledTimes(0);
    });

    it("should not call for in-app review when review has already been triggered", async () => {
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.hasTriggeredInAppReview,
        true
      );
      await AppUtils.handleInAppReviewPopup(5);

      expect(inAppReviewSpy).toHaveBeenCalledTimes(0);
    });
  });
});
