/* eslint-disable @typescript-eslint/naming-convention */
import MatomoTracker from "matomo-tracker-react-native";

export const matomoInstance = new MatomoTracker({
  disabled: process.env.MATOMO_ENABLED === "false",
  siteId: process.env.MATOMO_APPLICATION_ID,
  urlBase: process.env.MATOMO_URL,
});

export enum TrackingEvent {
  ONBOARDING = "Onboarding",
  PROFILE = "Profil",
  HOME = "Accueil",
  ARTICLE_LIST = "Liste d'articles",
  ARTICLE = "Article",
  CALENDAR = "Calendrier",
  CARTO = "Cartographie",
  EPDS = "EPDS",
}
