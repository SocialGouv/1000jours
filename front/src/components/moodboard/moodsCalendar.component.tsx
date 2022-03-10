import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";

import { StorageKeysConstants } from "../../constants";
import type { MoodStorageItem } from "../../screens/moodboard/moodboard.component";
import { MOODBOARD_ITEMS } from "../../screens/moodboard/moodboard.component";
import { StorageUtils } from "../../utils";

const MoodsCalendar: React.FC<Props> = () => {
  const [moods, setMoods] = useState<MoodStorageItem[]>();

  useEffect(() => {
    const findMoods = async () => {
      const moodsStorage: MoodStorageItem[] =
        (await StorageUtils.getObjectValue(StorageKeysConstants.moodsByDate)) ??
        [];

      setMoods(moodsStorage);
    };

    void findMoods();
  }, []);

  return (
    <Calendar
      onDayPress={(day) => {
        console.log("selected day", day);
      }}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={"MMMM yyyy"}
      // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
      // day from another month that is visible in calendar page. Default = false
      disableMonthChange={true}
      firstDay={1}
      // Handler which gets executed when press arrow icon left. It receive a callback can go back month
      onPressArrowLeft={(subtractMonth) => {
        subtractMonth();
      }}
      // Handler which gets executed when press arrow icon right. It receive a callback can go next month
      onPressArrowRight={(addMonth) => {
        addMonth();
      }}
      // Collection of dates that have to be marked. Default = {}
      markedDates={buildMarkedDatesForCalendar(moods)}
    />
  );
};

export const buildMarkedDatesForCalendar = (
  moods: MoodStorageItem[] | undefined
) => {
  const markedList = {};

  moods?.forEach((item) => {
    const moodItem = MOODBOARD_ITEMS.find(
      (element) => element.title === item.title
    );

    return (markedList[item.date] = {
      selected: true,
      selectedColor: moodItem?.color,
    });
  });

  return markedList;
};

export default MoodsCalendar;
