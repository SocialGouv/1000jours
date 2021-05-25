import MatomoTracker from "matomo-tracker-react-native";

export const matomoInstance = new MatomoTracker({
  urlBase: process.env.MATOMO_URL,
  siteId: process.env.MATOMO_APPLICATION_ID,
});

export enum TrackingEvent {
  ONBOARDING = "Onboarding",
  PROFILE = "Profil",
  HOME = "Accueil",
  ARTICLE_LIST = "Liste d'articles",
  ARTICLE = "Article",
  CALENDAR = "Calendrier",
}
