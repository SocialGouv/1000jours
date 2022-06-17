export interface TrackerUserInfo {
  /** dimension1 = AppVersion */
  dimension1: string;

  /** dimension2 = UserSituation */
  dimension2?: string | null;

  /** dimension3 = Gender */
  dimension3?: string | null;

  /** dimension4 = CurrentStep */
  dimension4?: string | null;
}