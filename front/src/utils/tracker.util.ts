/* eslint-disable @typescript-eslint/naming-convention */
import "react-native-get-random-values";

import { add, isBefore } from "date-fns";
import MatomoTracker from "matomo-tracker-react-native";
import { v4 as uuidv4 } from "uuid";

import { StorageKeysConstants } from "../constants";
import { getStringValue, storeObjectValue } from "./storage.util";

export const MIN_HOURS_DELAY_TO_TRACK_NEW_OPENING = 6;

export const getOrCreateUserUuid = async (): Promise<string> => {
  let userUuid = await getStringValue(StorageKeysConstants.userUuidKey);

  if (!userUuid) {
    userUuid = uuidv4();
    await storeObjectValue(StorageKeysConstants.userUuidKey, userUuid);
  }

  // Le getStringValue retourne la valeur avec double quotes, il faut les supprimer
  return userUuid.replaceAll('"', "");
};

export const matomoInstance = async (): Promise<MatomoTracker> => {
  const userId = await getOrCreateUserUuid();
  return new MatomoTracker({
    disabled: process.env.MATOMO_ENABLED === "false",
    siteId: Number(process.env.MATOMO_APPLICATION_ID),
    urlBase: String(process.env.MATOMO_URL),
    userId,
  });
};

export enum TrackingEvent {
  APP_ACTIVE = "Ouverture de l'app",
  ONBOARDING = "Onboarding",
  PROFILE = "Profil",
  HOME = "Accueil",
  PARENTHEQUE = "Parenthèque",
  ARTICLE_LIST = "Liste d'articles",
  ARTICLE = "Article",
  CALENDAR = "Calendrier",
  CALENDAR_SYNC = "Demande de synchronisation",
  EVENT = "Événement",
  EVENT_SEE_THE_MAP = "Événement - Voir la carte",
  CARTO = "Cartographie",
  CARTO_CLICK_POI = "Clic sur un POI",
  EPDS = "EPDS",
  EPDS_BE_CONTACTED = "EPDS - Être contacté",
  NOTIFICATION = "Notification",
  FILTER_CARTO = "Filtre (Carto)",
  FILTER_ARTICLES = "Filtre (Articles)",
  RECHERCHER = "Rechercher",
  MOODBOARD = "Moodboard",
}

export const dateWithMinHoursDelayIsBeforeNow = (date: Date): boolean => {
  return isBefore(
    add(date, {
      hours: MIN_HOURS_DELAY_TO_TRACK_NEW_OPENING,
    }),
    new Date()
  );
};

export const needToTrackOpeningApp = async (): Promise<boolean> => {
  const openingLastDate = await getStringValue(
    StorageKeysConstants.appOpeningLastDate
  );
  return openingLastDate
    ? dateWithMinHoursDelayIsBeforeNow(new Date(openingLastDate))
    : true;
};
