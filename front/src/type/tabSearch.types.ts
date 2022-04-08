export interface TrackerSearch {
  keyword: string;
  category: string;
  count: number;
  userInfo: {
    dimension1: string; // dimension1 = AppVersion
  };
}
