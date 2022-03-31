import { format } from "date-fns";

import { MoodboardAssets } from "../components/assets";
import { Formats, Labels, StorageKeysConstants } from "../constants";
import { Colors } from "../styles";
import type { MoodboardItem, MoodStorageItem } from "../type/moodboard.types";
import { StorageUtils } from ".";

export const MOODBOARD_ITEMS: MoodboardItem[] = [
  {
    color: Colors.mood.veryGood,
    icon: MoodboardAssets.IconVeryGood,
    title: Labels.moodboard.mood.veryGood,
  },
  {
    color: Colors.mood.good,
    icon: MoodboardAssets.IconGood,
    title: Labels.moodboard.mood.good,
  },
  {
    color: Colors.mood.medium,
    icon: MoodboardAssets.IconMedium,
    title: Labels.moodboard.mood.medium,
  },
  {
    color: Colors.mood.bad,
    icon: MoodboardAssets.IconBad,
    title: Labels.moodboard.mood.bad,
  },
];

export const saveMood = async (
  mood: string,
  dateISO?: string
): Promise<void> => {
  const oldMoods: MoodStorageItem[] =
    (await StorageUtils.getObjectValue(StorageKeysConstants.moodsByDate)) ?? [];
  const today = dateISO ?? format(new Date(), Formats.dateISO);

  // Permet de ne pas récupérer l'humeur du jour s'il a déjà été saisi, et don ne pas avoir de doublons
  const newMoods = oldMoods.filter((item) => item.date !== today);
  newMoods.push({
    date: today,
    title: mood,
  });

  void StorageUtils.storeObjectValue(
    StorageKeysConstants.moodsByDate,
    newMoods
  );
};
