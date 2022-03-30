import type { FC } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

import { StorageKeysConstants } from "../../constants";
import { Colors, Margins } from "../../styles";
import { StorageUtils } from "../../utils";
import type { MoodStorageItem } from "../../utils/moodboard.util";
import { MOODBOARD_ITEMS } from "../../utils/moodboard.util";
import EditMoodDay from "./editMoodDay.component";

const MoodsCalendar: React.FC<Props> = () => {
  const [moods, setMoods] = useState<MoodStorageItem[]>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [dateToEdit, setDateToEdit] = useState<string>();

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
    <>
      <Calendar
        style={styles.calendarStyle}
        theme={{
          arrowColor: Colors.primaryBlue,
          // backgroundColor: "#ffffff",
          // calendarBackground: "#ffffff",
          dayTextColor: Colors.primaryBlue,
          // disabledArrowColor: "#d9e1e8",
          // dotColor: "#00adf5",
          // indicatorColor: "blue",
          monthTextColor: Colors.primaryBlue,
          // selectedDayBackgroundColor: "#00adf5",
          // selectedDayTextColor: "#ffffff",
          // selectedDotColor: "#ffffff",
          // textDayFontFamily: "monospace",
          //textDayFontSize: 12,
          // textDayFontWeight: "300",
          // textDayHeaderFontFamily: "monospace",
          //textDayHeaderFontSize: 12,
          textDayHeaderFontWeight: "500",
          // textDisabledColor: "#d9e1e8",
          // textMonthFontFamily: "monospace",
          textMonthFontSize: 14,
          // textMonthFontWeight: "bold",
          // textSectionTitleColor: "#b6c1cd",
          // textSectionTitleDisabledColor: "#d9e1e8",
          //todayTextColor: Colors.primaryBlueLight,
        }}
        onDayPress={(day) => {
          setDateToEdit(day.dateString);
          setShowEditModal(true);
        }}
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
        hideModal={() => {
          setShowEditModal(false);
        }}
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
