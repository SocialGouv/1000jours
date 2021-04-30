import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";

const TabCalendarScreen: FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>{Labels.tabs.calendarTitle}</Text>
    <Text style={styles.description}>{Labels.calendar.description}</Text>
    <Calendar
      hideExtraDays={true}
      enableSwipeMonths={true}
      firstDay={1}
      theme={{
        arrowColor: Colors.primaryBlue,
        todayTextColor: Colors.primaryBlue,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 15,
  },
  description: {
    color: Colors.commonText,
  },
  title: {
    color: Colors.primaryBlue,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default TabCalendarScreen;
