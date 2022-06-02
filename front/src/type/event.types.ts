import type { TrackerUserInfo } from "./userInfo.types";

export interface TrackerEvent {
  category: string;
  action: string;
  name?: string;
  value?: number;
  userInfo: TrackerUserInfo;
}

export interface TrackerEventLight {
  category?: string;
  action: string;
  name: string;
  value?: number;
  userInfo?: TrackerUserInfo;
}
