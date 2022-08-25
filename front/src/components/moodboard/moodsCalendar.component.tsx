import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { AccessibilityInfo, StyleSheet, View } from "react-native";
import type { DateData } from "react-native-calendars";
import { Calendar, LocaleConfig } from "react-native-calendars";
import type { Direction, Theme } from "react-native-calendars/src/types";

import { Labels, StorageKeysConstants } from "../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type { MoodStorageItem } from "../../type";
import { MoodboardUtils, StorageUtils } from "../../utils";
import { Icomoon, IcomoonIcons, SecondaryText } from "../baseComponents";
import EditMoodDay from "./editMoodDay.component";

const CALENDAR_MONTH_FORMAT = "MMMM yyyy";

const MoodsCalendar: React.FC = () => {
  const [moods, setMoods] = useState<MoodStorageItem[]>();
  const [showEditModal, setShowEditModal] = useState(false);
  const [dateToEdit, setDateToEdit] = useState<string>();
  const [monthToDisplay, setMonthToDisplay] = useState(new Date().getMonth());

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

  const renderMonthArrow = useCallback(
    (direction: Direction) => {
      const fullMonthName =
        LocaleConfig.locales[LocaleConfig.defaultLocale].monthNames;

      const previousMonthLabel = `${Labels.accessibility.mood.goToPreviousMonth}
      ${fullMonthName?.[monthToDisplay - 1]}`;
      const nextMonthLabel = `${Labels.accessibility.mood.goToNextMonth}
      ${fullMonthName?.[monthToDisplay + 1]}`;

      return direction === "left" ? (
        <View
          accessibilityRole="button"
          accessibilityLabel={previousMonthLabel}
        >
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
    },
    [monthToDisplay]
  );

  const onMonthChange = useCallback((month: DateData) => {
    // month a les mois numéroté de 1 à 12, alors que dans LocaleConfig c'est dans un tableau donc de 0 à 11.
    const monthNumber = month.month - 1;

    setMonthToDisplay(monthNumber);
    AccessibilityInfo.announceForAccessibility(
      `${
        LocaleConfig.locales[LocaleConfig.defaultLocale].monthNames?.[
          monthNumber
        ]
      }`
    );
  }, []);

  const hideEditModal = useCallback(() => {
    setShowEditModal(false);
    void findMoods();
  }, []);

  return (
    <>
      <View style={styles.titleContainer}>
        <SecondaryText style={styles.title}>
          {Labels.moodboard.completeMoodboard}
        </SecondaryText>
      </View>
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
        onMonthChange={onMonthChange}
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
  title: {
    color: Colors.primaryBlue,
    fontSize: Sizes.md,
    paddingHorizontal: Paddings.default,
    textAlign: "center",
  },
  titleContainer: {
    alignContent: "center",
    alignItems: "center",
    paddingVertical: Paddings.smallest,
  },
});

export default MoodsCalendar;
