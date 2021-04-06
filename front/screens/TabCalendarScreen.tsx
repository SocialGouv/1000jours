import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { Text, View } from "../components/Themed";
import Labels from "../constants/Labels";
import Colors from "../constants/Colors";

const TabCalendarScreen: FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>{Labels.tabs.calendarTitle}</Text>
    <Text style={styles.description}>{Labels.calendar.description}</Text>
    <Calendar
      hideExtraDays={true}
      enableSwipeMonths={true}
      firstDay={1}
      theme={{
        todayTextColor: Colors.primaryBlue,
        arrowColor: Colors.primaryBlue,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 15,
  },
  title: {
    color: Colors.primaryBlue,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    color: Colors.commonText,
  },
});

export default TabCalendarScreen;
