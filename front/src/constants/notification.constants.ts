import type { NotificationTriggerInput } from "expo-notifications";

import { IS_DEV_ENV } from "./platform.constants";

export const MIN_SECONDS = 10;
export const MIN_TRIGGER: NotificationTriggerInput = { seconds: MIN_SECONDS };
export const NUMBER_OF_DAYS_NOTIF_EVENT_REMINDER = 7;
export const NUMBER_OF_DAYS_NOTIF_ARTICLES_REMINDER = IS_DEV_ENV ? 0 : 14; // 0 : pour faciliter les tests
export const DAYS_UNTIL_FAVORITES_NOTIFICATION = 30;
export const MOODBOARD_NOTIF_TRIGGER_HOUR = 9;
export const EVENT_NOTIF_TRIGGER_HOUR = 13;
export const NEXTSTEP_NOTIF_TRIGGER_HOUR = 13;
export const ARTICLES_NOTIF_TRIGGER_HOUR = 18;
export const SCREEN_CALENDAR = "tabCalendar";
export const SCREEN_ARTICLES = "articleList";
export const SCREEN_FAVORITES = "articleFavorites";
