import { useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import { addDays, format } from "date-fns";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { useEffect } from "react";
import { StyleSheet } from "react-native";

import {
  Button,
  CommonText,
  ErrorMessage,
  Events,
  Loader,
  TitleH1,
} from "../components";
import { View } from "../components/Themed";
import { Formats, Labels, Paddings, StorageKeysConstants } from "../constants";
import type { Event, RootStackParamList } from "../types";
import { NotificationUtils, StorageUtils, TrackerUtils } from "../utils";
import { stringIsNotNullNorEmpty } from "../utils/strings.util";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "root">;
}

const TabCalendarScreen: FC<Props> = ({ navigation }) => {
  const { trackScreenView } = useMatomo();
  const [childBirthday, setChildBirthday] = React.useState("");
  const [eventsCalcFromBirthday, setEventsCalcFromBirthday] =
    React.useState("");
  const [events, setEvents] = React.useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = React.useState(false);

  useEffect(() => {
    trackScreenView(TrackerUtils.TrackingEvent.CALENDAR);
  }, []);

  const ALL_EVENTS = gql`
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
  const [loadEvents, { loading, error, data }] = useLazyQuery(ALL_EVENTS, {
    fetchPolicy: "cache-and-network",
  });

  const init = async () => {
    const childBirthdayStr =
      (await StorageUtils.getStringValue(
        StorageKeysConstants.userChildBirthdayKey
      )) ?? "";
    setChildBirthday(childBirthdayStr);
    const eventsCalcFromBirthdayStr =
      (await StorageUtils.getStringValue(
        StorageKeysConstants.eventsCalcFromBirthday
      )) ?? "";
    setEventsCalcFromBirthday(eventsCalcFromBirthdayStr);

    if (childBirthdayStr.length > 0) {
      setLoadingEvents(true);
      loadEvents();
    }
  };

  const formattedEvents = (eventsToFormat: Event[]): Event[] => {
    return eventsToFormat.map((event) => ({
      ...event,
      date: format(
        addDays(new Date(childBirthday), event.debut),
        Formats.dateISO
      ),
    }));
  };

  useEffect(() => {
    // Permet de forcer le refresh de la page lorsque l'on arrive dessus
    const unsubscribe = navigation.addListener("focus", () => {
      void init();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!loading && data) {
      const evenements = (data as { evenements: Event[] }).evenements;

      void StorageUtils.storeStringValue(
        StorageKeysConstants.eventsCalcFromBirthday,
        childBirthday
      )
        .then(() => {
          setEvents(formattedEvents(evenements));
        })
        .catch(() => {
          setLoadingEvents(false);
        });
    }
  }, [loading, data]);

  const scheduleEventsNotification = async () => {
    const notifIdsEventsStored = await StorageUtils.getObjectValue(
      StorageKeysConstants.notifIdsEvents
    );
    if (
      stringIsNotNullNorEmpty(eventsCalcFromBirthday) &&
      (!notifIdsEventsStored || eventsCalcFromBirthday !== childBirthday)
    ) {
      // Supprimme les anciennes et planifie les nouvelles notifications des événements
      void NotificationUtils.cancelScheduleEventsNotification().then(() => {
        NotificationUtils.scheduleEventsNotification(events);
      });
    }
  };

  useEffect(() => {
    setLoadingEvents(false);
    if (events.length > 0) void scheduleEventsNotification();
  }, [events]);

  return (
    <View style={styles.container}>
      <TitleH1
        title={Labels.tabs.calendarTitle}
        description={Labels.calendar.description}
        animated={false}
      />
      {loadingEvents ? (
        <Loader />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <View style={styles.calendarContainer}>
          {childBirthday.length > 0 ? (
            <Events evenements={events} childBirthday={childBirthday} />
          ) : (
            <View style={styles.center}>
              <CommonText style={styles.noChildBirthday}>
                {Labels.calendar.noChildBirthday}
              </CommonText>
              <Button
                title={Labels.profile.update}
                rounded={true}
                action={() => {
                  navigation.navigate("profile");
                }}
              />
            </View>
          )}
        </View>
      )}
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
  noChildBirthday: {
    paddingVertical: Paddings.default,
  },
  switchViewMode: {
    alignItems: "flex-end",
  },
});

export default TabCalendarScreen;
