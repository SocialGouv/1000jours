import type { NotificationContentInput } from "expo-notifications";

import { Labels, NotificationConstants } from "../../../constants";
import {
  NotificationType,
  sendNotificationReminder,
} from "../notification.util";

export const scheduleInAppReviewNotification = async (): Promise<string> =>
  sendNotificationReminder(
    buildInAppReviewNotificationContent(),
    NotificationConstants.MIN_TRIGGER
  );

export const buildInAppReviewNotificationContent =
  (): NotificationContentInput => {
    return {
      body: Labels.notification.inAppReview.body,
      data: {
        redirectFromRoot: false,
        redirectParams: null,
        redirectTitle: Labels.notification.inAppReview.redirectTitle,
        redirectTo: null,
        type: NotificationType.inAppReview,
      },
      title: Labels.notification.inAppReview.title,
    };
  };
