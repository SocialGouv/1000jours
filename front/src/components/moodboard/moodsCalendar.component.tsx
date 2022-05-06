import { format } from "date-fns";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import type { DateData } from "react-native-calendars";
import { Calendar } from "react-native-calendars";
import type { Direction, Theme } from "react-native-calendars/src/types";

import { Formats, Labels, StorageKeysConstants } from "../../constants";
import { Colors, FontWeight, Margins, Sizes } from "../../styles";
import type { MoodStorageItem } from "../../type";
import { MoodboardUtils, StorageUtils } from "../../utils";
import { Icomoon, IcomoonIcons } from "../baseComponents";
import EditMoodDay from "./editMoodDay.component";

interface Props {}

const CALENDAR_MONTH_FORMAT = "MMMM yyyy";

const MoodsCalendar: React.FC<Props> = () => {
  const [moods, setMoods] = useState<MoodStorageItem[]>();
  const [showEditModal, setShowEditModal] = useState(false);
  const [dateToEdit, setDateToEdit] = useState<string>();

  const calenderTheme: Theme = {
    arrowColor: Colors.primaryBlue,
    dayTextColor: Colors.primaryBlue,
    monthTextColor: Colors.primaryBlue,
    textDayHeaderFontWeight: FontWeight.medium,
    textMonthFontSize: Sizes.xs,
  };

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

  const renderMonthArrow = useCallback((direction: Direction) => {
    const today = new Date();
    const previousMonth = today.setMonth(today.getMonth() - 1);
    const nextMonth = today.setMonth(today.getMonth() + 2);

    const previousMonthLabel =
      Labels.accessibility.mood.goToPreviousMonth +
      format(previousMonth, Formats.dateFullMonthOnly);
    const nextMonthLabel =
      Labels.accessibility.mood.goToNextMonth +
      format(nextMonth, Formats.dateFullMonthOnly);

    return direction === "left" ? (
      <View accessibilityRole="button" accessibilityLabel={previousMonthLabel}>
        <Icomoon
          name={IcomoonIcons.precedent}
          size={Sizes.lg}
          color={Colors.primaryBlue}
        />
      </View>
    ) : (
      <View accessibilityRole="button" accessibilityLabel={nextMonthLabel}>
        <Icomoon
          name={IcomoonIcons.suivant}
          size={Sizes.lg}
          color={Colors.primaryBlue}
        />
      </View>
    );
  }, []);

  const hideEditModal = useCallback(() => {
    setShowEditModal(false);
    void findMoods();
  }, []);

  return (
    <>
      <Calendar
        style={styles.calendarStyle}
        theme={calenderTheme}
        onDayPress={onDayPress}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={CALENDAR_MONTH_FORMAT}
        // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={true}
        firstDay={1}
        markedDates={buildMarkedDatesForCalendar(moods)}
        renderArrow={renderMonthArrow}
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
    const moodItem = MoodboardUtils.MOODBOARD_ITEMS.find(
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
