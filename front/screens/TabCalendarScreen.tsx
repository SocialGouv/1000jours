import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import type { FC } from "react";
import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import Agenda from "../components/calendar/agenda";
import { CommonText } from "../components/StyledText";
import { Text, View } from "../components/Themed";
import { Colors, Labels, StorageKeysConstants } from "../constants";
import type { Event } from "../types";
import { StorageUtils } from "../utils";

const TabCalendarScreen: FC = () => {
  const [childBirthday, setChildBirthday] = React.useState("");

  useEffect(() => {
    const loadChildBirthday = async () => {
      const childBirthdayStr =
        (await StorageUtils.getStringValue(
          StorageKeysConstants.userChildBirthdayKey
        )) ?? "";
      setChildBirthday(childBirthdayStr);
    };
    void loadChildBirthday();
  }, []);

  const ALL_STEPS = gql`
    query GetEvents {
      evenements {
        id
        nom
        description
        debut
        fin
      }
    }
  `;
  const { loading, error, data } = useQuery(ALL_STEPS);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>{Labels.errorMsg}</Text>;

  const evenements = (data as { evenements: Event[] }).evenements;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Labels.tabs.calendarTitle}</Text>
      <Text style={styles.description}>{Labels.calendar.description}</Text>
      <View style={styles.agendaContainer}>
        {childBirthday.length > 0 ? (
          <Agenda evenements={evenements} childBirthday={childBirthday} />
        ) : (
          <CommonText>{Labels.calendar.noChildBirthday}</CommonText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  agendaContainer: {
    flex: 1,
    marginTop: 20,
  },
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
