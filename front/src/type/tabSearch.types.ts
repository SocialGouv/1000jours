import type { TrackerUserInfo } from "./userInfo.types";

export interface TrackerSearch {
  keyword: string;
  category: string;
  count: number;
  userInfo: TrackerUserInfo;
}
