import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import type { DateData } from "react-native-calendars";
import { Calendar } from "react-native-calendars";

import { StorageKeysConstants } from "../../constants";
import { Colors, Margins, Sizes } from "../../styles";
import type { MoodStorageItem } from "../../type/moodboard.types";
import { StorageUtils } from "../../utils";
import { MOODBOARD_ITEMS } from "../../utils/moodboard.util";
import EditMoodDay from "./editMoodDay.component";

interface Props {}

const MoodsCalendar: React.FC<Props> = () => {
  const [moods, setMoods] = useState<MoodStorageItem[]>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [dateToEdit, setDateToEdit] = useState<string>();

  const findMoods = async () => {
    const moodsStorage: MoodStorageItem[] =
      (await StorageUtils.getObjectValue(StorageKeysConstants.moodsByDate)) ??
      [];

    setMoods(moodsStorage);
  };

  useEffect(() => {
    void findMoods();
  }, []);

  const onDayPress = useCallback((day: DateData) => {
    setDateToEdit(day.dateString);
    setShowEditModal(true);
  }, []);

  const hideEditModal = useCallback(() => {
    setShowEditModal(false);
    void findMoods();
  }, []);

  return (
    <>
      <Calendar
        style={styles.calendarStyle}
        theme={{
          arrowColor: Colors.primaryBlue,
          dayTextColor: Colors.primaryBlue,
          monthTextColor: Colors.primaryBlue,
          textDayHeaderFontWeight: "500",
          textMonthFontSize: Sizes.xs,
        }}
        onDayPress={onDayPress}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"MMMM yyyy"}
        // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={true}
        firstDay={1}
        markedDates={buildMarkedDatesForCalendar(moods)}
      />

      <EditMoodDay
        visible={showEditModal}
        hideModal={hideEditModal}
        dateISO={dateToEdit}
      />
    </>
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

const styles = StyleSheet.create({
  calendarStyle: {
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    margin: Margins.default,
  },
});

export default MoodsCalendar;
