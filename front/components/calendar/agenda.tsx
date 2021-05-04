import { addDays, format } from "date-fns";
import _ from "lodash";
import type { FC } from "react";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Agenda as RNAgenda } from "react-native-calendars";

import Colors from "../../constants/Colors";
import Labels from "../../constants/Labels";
import { FontWeight } from "../../constants/Layout";
import type { Event } from "../../types";
import { CommonText } from "../StyledText";

interface Props {
  evenements: Event[];
  childBirthday: string;
}

const Agenda: FC<Props> = ({ evenements, childBirthday }) => {
  const formattedEvents = _.chain(evenements)
    .map((event) => ({
      ...event,
      date: format(addDays(new Date(childBirthday), event.debut), "yyyy-MM-dd"),
    }))
    .groupBy("date")
    .value();

  return (
    <RNAgenda
      items={formattedEvents}
      hideKnob={false}
      renderItem={(item) => (
        <View style={styles.eventContainer}>
          <CommonText style={styles.eventTitle}>{item.nom}</CommonText>
          <CommonText style={styles.eventDescription}>
            {item.description}
          </CommonText>
        </View>
      )}
      renderEmptyData={() => (
        <View style={styles.emptyDataContainer}>
          <CommonText style={styles.emptyDataTitle}>
            {Labels.calendar.noEventMessage}
          </CommonText>
        </View>
      )}
      theme={{
        agendaDayNumColor: Colors.primaryBlue,
        agendaDayTextColor: Colors.primaryBlue,
        agendaTodayColor: Colors.primaryBlue,
        backgroundColor: Colors.cardGrey,
        calendarBackground: "white",
        dayTextColor: Colors.primaryBlue,
        dotColor: Colors.primaryBlueDark,
        monthTextColor: Colors.primaryBlue,
        selectedDayBackgroundColor: Colors.primaryBlue,
        selectedDayTextColor: "white",
        selectedDotColor: Colors.primaryBlueLight,
        textDisabledColor: Colors.primaryBlue,
        textSectionTitleColor: Colors.primaryBlue,
        todayTextColor: Colors.primaryBlue,
      }}
    />
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    borderBottomColor: Colors.primaryBlue,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  dayDescription: {},
  dayTitle: {},
  description: {
    color: Colors.commonText,
  },
  emptyDataContainer: {
    alignSelf: "center",
    backgroundColor: Colors.cardGrey,
    flex: 1,
    justifyContent: "center",
  },
  emptyDataTitle: {
    color: Colors.disabled,
  },
  eventContainer: {
    backgroundColor: Colors.primaryBlueLight,
    borderStartColor: Colors.primaryBlue,
    borderStartWidth: 2,
    padding: 20,
  },
  eventDescription: {
    color: Colors.primaryBlue,
    fontSize: 10,
  },
  eventTitle: {
    color: Colors.primaryBlueDark,
    fontSize: 12,
    fontWeight: FontWeight.bold,
    paddingBottom: 10,
  },
});

export default Agenda;
