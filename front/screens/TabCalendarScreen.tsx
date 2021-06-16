import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import {
  Agenda,
  Button,
  CommonText,
  Events,
  Icomoon,
  IcomoonIcons,
} from "../components";
import { Text, View } from "../components/Themed";
import {
  Colors,
  Labels,
  Margins,
  Paddings,
  Sizes,
  StorageKeysConstants,
} from "../constants";
import type { Event } from "../types";
import { StorageUtils, TrackerUtils } from "../utils";

const TabCalendarScreen: FC = () => {
  const { trackScreenView } = useMatomo();
  trackScreenView(TrackerUtils.TrackingEvent.CALENDAR);
  const [childBirthday, setChildBirthday] = React.useState("");
  const [isModeAgenda, setIsModeAgenda] = React.useState(false);

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

      <View style={styles.calendarContainer}>
        <View style={styles.switchViewMode}>
          <Button
            title=""
            rounded={false}
            disabled={false}
            icon={
              <Icomoon
                name={IcomoonIcons.calendrier}
                size={Sizes.mmd}
                color={Colors.primaryBlue}
              />
            }
            action={() => {
              setIsModeAgenda(!isModeAgenda);
            }}
          />
        </View>
        {childBirthday.length > 0 ? (
          isModeAgenda ? (
            <Agenda evenements={evenements} childBirthday={childBirthday} />
          ) : (
            <Events evenements={evenements} childBirthday={childBirthday} />
          )
        ) : (
          <View style={styles.center}>
            <CommonText>{Labels.calendar.noChildBirthday}</CommonText>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
    marginTop: Paddings.default,
  },
  center: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  container: {
    height: "100%",
    padding: Paddings.default,
  },
  description: {
    color: Colors.commonText,
  },
  switchViewMode: {
    alignItems: "flex-end",
  },
  title: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xs,
    fontWeight: "bold",
    marginBottom: Margins.light,
  },
});

export default TabCalendarScreen;
