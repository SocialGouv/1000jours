import { format, subMonths } from "date-fns";

import { Formats, Labels } from "../../../constants";
import { TndNotificationUtils } from "../..";
import { NotificationType } from "../notification.util";
import { ALL_TRIGGERS_IN_MONTH } from "./tndNotification.util";

describe("TndNotificationUtils", () => {
  describe("buildTndNotificationContent", () => {
    it("should build a tnd notification with the correct content", () => {
      const content = TndNotificationUtils.buildTndNotificationContent();
      const expected = {
        body: Labels.notification.tnd.body,
        data: {
          redirectFromRoot: true,
          redirectParams: null,
          redirectTitle: Labels.notification.tnd.redirectTitle,
          redirectTo: "tndSurvey",
          type: NotificationType.tnd,
        },
        title: Labels.notification.tnd.title,
      };
      expect(content).toEqual(expected);
    });
  });

  describe("scheduleTndNotifications", () => {
    it("should schedule all tnd notifications (6mois / 12mois / 18mois / 24mois / 3ans / 4ans / 5ans / 6ans) and one tomorrow when it's the firstTime", async () => {
      const date = new Date();
      const notificationIds =
        await TndNotificationUtils.scheduleTndNotifications(
          format(date, Formats.dateISO),
          true
        );
      expect(notificationIds.length).toEqual(9);
    });

    it("should schedule all tnd notifications (6mois / 12mois / 18mois / 24mois / 3ans / 4ans / 5ans / 6ans)", async () => {
      const date = new Date();
      const notificationIds =
        await TndNotificationUtils.scheduleTndNotifications(
          format(date, Formats.dateISO),
          false
        );
      expect(notificationIds.length).toEqual(8);
    });

    it("should schedule all tnd notifications (12mois / 18mois / 24mois / 3ans / 4ans / 5ans / 6ans)", async () => {
      const date = subMonths(new Date(), ALL_TRIGGERS_IN_MONTH[0] + 1);
      const notificationIds =
        await TndNotificationUtils.scheduleTndNotifications(
          format(date, Formats.dateISO),
          false
        );
      expect(notificationIds.length).toEqual(7);
    });

    it("should schedule all tnd notifications (18mois / 24mois / 3ans / 4ans / 5ans / 6ans)", async () => {
      const date = subMonths(new Date(), ALL_TRIGGERS_IN_MONTH[1] + 1);
      const notificationIds =
        await TndNotificationUtils.scheduleTndNotifications(
          format(date, Formats.dateISO),
          false
        );
      expect(notificationIds.length).toEqual(6);
    });

    it("should schedule all tnd notifications (24mois / 3ans / 4ans / 5ans / 6ans)", async () => {
      const date = subMonths(new Date(), ALL_TRIGGERS_IN_MONTH[2] + 1);
      const notificationIds =
        await TndNotificationUtils.scheduleTndNotifications(
          format(date, Formats.dateISO),
          false
        );
      expect(notificationIds.length).toEqual(5);
    });

    it("should schedule all tnd notifications (3ans / 4ans / 5ans / 6ans)", async () => {
      const date = subMonths(new Date(), ALL_TRIGGERS_IN_MONTH[3] + 1);
      const notificationIds =
        await TndNotificationUtils.scheduleTndNotifications(
          format(date, Formats.dateISO),
          false
        );
      expect(notificationIds.length).toEqual(4);
    });

    it("should schedule all tnd notifications (4ans / 5ans / 6ans)", async () => {
      const date = subMonths(new Date(), ALL_TRIGGERS_IN_MONTH[4] + 1);
      const notificationIds =
        await TndNotificationUtils.scheduleTndNotifications(
          format(date, Formats.dateISO),
          false
        );
      expect(notificationIds.length).toEqual(3);
    });

    it("should schedule all tnd notifications (5ans / 6ans)", async () => {
      const date = subMonths(new Date(), ALL_TRIGGERS_IN_MONTH[5] + 1);
      const notificationIds =
        await TndNotificationUtils.scheduleTndNotifications(
          format(date, Formats.dateISO),
          false
        );
      expect(notificationIds.length).toEqual(2);
    });

    it("should schedule all tnd notifications (6ans)", async () => {
      const date = subMonths(new Date(), ALL_TRIGGERS_IN_MONTH[6] + 1);
      const notificationIds =
        await TndNotificationUtils.scheduleTndNotifications(
          format(date, Formats.dateISO),
          false
        );
      expect(notificationIds.length).toEqual(1);
    });

    it("should schedule 0 tnd notification", async () => {
      const date = subMonths(new Date(), ALL_TRIGGERS_IN_MONTH[7] + 1);
      const notificationIds =
        await TndNotificationUtils.scheduleTndNotifications(
          format(date, Formats.dateISO),
          false
        );
      expect(notificationIds.length).toEqual(0);
    });
  });
});
