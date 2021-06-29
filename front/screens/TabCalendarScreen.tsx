import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { useEffect } from "react";
import { StyleSheet } from "react-native";

import {
  CommonText,
  ErrorMessage,
  Events,
  Loader,
  TitleH1,
} from "../components";
import { View } from "../components/Themed";
import { Labels, Paddings, StorageKeysConstants } from "../constants";
import type { Event } from "../types";
import { StorageUtils, TrackerUtils } from "../utils";

const TabCalendarScreen: FC = () => {
  const { trackScreenView } = useMatomo();
  trackScreenView(TrackerUtils.TrackingEvent.CALENDAR);
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

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  const evenements = (data as { evenements: Event[] }).evenements;

  return (
    <View style={styles.container}>
      <TitleH1
        title={Labels.tabs.calendarTitle}
        description={Labels.calendar.description}
        animated={false}
      />
      <View style={styles.calendarContainer}>
        {childBirthday.length > 0 ? (
          <Events evenements={evenements} childBirthday={childBirthday} />
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
  switchViewMode: {
    alignItems: "flex-end",
  },
});

export default TabCalendarScreen;
