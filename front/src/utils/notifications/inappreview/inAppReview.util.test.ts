import { InAppReviewUtils, NotificationUtils } from "../..";

describe("InAppReviewUtils", () => {
  describe("scheduleInAppReviewNotification", () => {
    const notificationSpy = jest.spyOn(
      NotificationUtils,
      "sendNotificationReminder"
    );

    afterEach(() => {
      notificationSpy.mockRestore();
    });

    it("should schedule notification with correct content and trigger", async () => {
      await InAppReviewUtils.scheduleInAppReviewNotification();

      expect(notificationSpy).toHaveBeenCalledTimes(1);
      expect(notificationSpy).toHaveBeenCalledWith(
        {
          body: "Votre avis est important pour nous ! N'hésitez pas à noter l'application et à nous laisser votre avis.",
          data: {
            redirectFromRoot: false,
            redirectParams: null,
            redirectTitle: "Laisser un avis",
            redirectTo: null,
            type: "inAppReview",
          },
          title: "Votre avis",
        },
        { seconds: 10 }
      );
    });
  });
});
