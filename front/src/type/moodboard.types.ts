import type { ImageSourcePropType } from "react-native";

export interface MoodStorageItem {
  title: string;
  date: string;
}

export interface MoodboardItem {
  title: string;
  color: string;
  icon: ImageSourcePropType;
}
