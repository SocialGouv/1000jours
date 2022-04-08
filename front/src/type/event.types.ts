export interface TrackerEvent {
  category: string;
  action: string;
  name?: string;
  value?: number;
  userInfo: {
    dimension1: string; // dimension1 = AppVersion
  };
}
