import { useLazyQuery } from "@apollo/client";
import type { StackNavigationProp } from "@react-navigation/stack";
import { addDays, format } from "date-fns";
import * as Calendar from "expo-calendar";
import * as Localization from "expo-localization";
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
import {
  Colors,
  FetchPoliciesConstants,
  Formats,
  Labels,
  Paddings,
  Sizes,
  StorageKeysConstants,
} from "../constants";
import { ALL_EVENTS } from "../constants/databaseQueries.constants";
import { ICLOUD, PLATFORM_IS_IOS } from "../constants/platform.constants";
import type { Event, TabCalendarParamList } from "../types";
import { NotificationUtils, StorageUtils, TrackerUtils } from "../utils";
import * as RootNavigation from "../utils/rootNavigation.util";
import { stringIsNotNullNorEmpty } from "../utils/strings.util";

interface Props {
  navigation: StackNavigationProp<TabCalendarParamList, "eventDetails">;
}

const TabCalendarScreen: FC<Props> = ({ navigation }) => {
  const { trackScreenView } = useMatomo();
  const [childBirthday, setChildBirthday] = React.useState("");
  const [eventsCalcFromBirthday, setEventsCalcFromBirthday] =
    React.useState("");
  const [events, setEvents] = React.useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = React.useState(false);
  const [lastSyncDate, setLastSyncDate] = React.useState("");
  const hourWhenEventStart = 8; // Commence à 8h
  const hourWhenEventEnd = 18; // Se Termine à 18h

  useEffect(() => {
    trackScreenView(TrackerUtils.TrackingEvent.CALENDAR);
    void requestCalendarPermission();
    void getLastSyncDate();

    // Permet de forcer le refresh de la page lorsque l'on arrive dessus
    const unsubscribe = navigation.addListener("focus", () => {
      void init();
    });
    // Retourne "unsubscribe" pour que l'événement soit supprimé lors du "démontage" (fix memory leak)
    return unsubscribe;
  }, []);

  const getLastSyncDate = async () => {
    const calendarSyncDate = await StorageUtils.getStringValue(
      StorageKeysConstants.osCalendarSyncDate
    );
    if (calendarSyncDate) setLastSyncDate(calendarSyncDate);
  };

  const requestCalendarPermission = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    }
  };

  const calendarSourceIOS = async () => {
    const sources = await Calendar.getSourcesAsync();
    return sources.find((source) => source.name === ICLOUD) ?? sources[0];
  };

  const createCalendar = async () => {
    const defaultCalendarSource = PLATFORM_IS_IOS
      ? await calendarSourceIOS()
      : {
          isLocalAccount: true,
          name: Labels.appName,
          type: Calendar.SourceType.LOCAL,
        };

    const newCalendarID = await Calendar.createCalendarAsync({
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      color: Colors.primaryBlue,
      entityType: Calendar.EntityTypes.EVENT,
      name: Labels.appName,
      ownerAccount: Labels.appName,
      source: defaultCalendarSource,
      sourceId: defaultCalendarSource.id,
      title: Labels.appName,
    });
    await StorageUtils.storeStringValue(
      StorageKeysConstants.osCalendarId,
      newCalendarID
    );
    return newCalendarID;
  };

  const buildDateTimeWithTimeZone = (date: string, hour: number) => {
    const hourOffset = new Date().getTimezoneOffset() / 60;
    const newHour = hour + hourOffset;
    const strNewHour =
      newHour.toString().length < 2 ? `0${newHour}` : `${newHour}`;
    return `${date}T${strNewHour}:00:00.000Z`;
  };

  const syncEventsWithOsCalendar = async () => {
    trackScreenView(TrackerUtils.TrackingEvent.CALENDAR_SYNC);
    const calendarId = await StorageUtils.getStringValue(
      StorageKeysConstants.osCalendarId
    );
    if (calendarId) void Calendar.deleteCalendarAsync(calendarId);
    const newCalendarId = await createCalendar();

    events.forEach((event) => {
      if (event.date) {
        void Calendar.createEventAsync(newCalendarId, {
          endDate: buildDateTimeWithTimeZone(event.date, hourWhenEventEnd),
          notes: event.description ?? "",
          startDate: buildDateTimeWithTimeZone(event.date, hourWhenEventStart),
          timeZone: Localization.timezone,
          title: event.nom,
        });
      }
    });

    const date = new Date().toISOString();
    void StorageUtils.storeStringValue(
      StorageKeysConstants.osCalendarSyncDate,
      date
    );
    setLastSyncDate(date);
  };

  const [loadEvents, { loading, error, data }] = useLazyQuery(ALL_EVENTS, {
    fetchPolicy: FetchPoliciesConstants.CACHE_AND_NETWORK,
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
    if (events.length > 0) {
      void scheduleEventsNotification();
    }
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
            <>
              <View>
                <Button
                  title={Labels.calendar.synchronise}
                  titleStyle={styles.buttonTitle}
                  buttonStyle={{ alignSelf: "center" }}
                  rounded={true}
                  action={syncEventsWithOsCalendar}
                />
                <CommonText style={styles.lastSyncDate}>
                  {lastSyncDate
                    ? `${Labels.calendar.lastSyncDate} ${format(
                        new Date(lastSyncDate),
                        Formats.dateTimeFR
                      )}`
                    : ""}
                </CommonText>
              </View>
              <Events
                evenements={events}
                childBirthday={childBirthday}
                showEventDetails={false}
              />
            </>
          ) : (
            <View style={styles.center}>
              <CommonText style={styles.noChildBirthday}>
                {Labels.calendar.noChildBirthday}
              </CommonText>
              <Button
                title={Labels.profile.update}
                rounded={true}
                action={() => {
                  RootNavigation.navigate("profile", null);
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
  buttonTitle: {
    fontSize: Sizes.md,
    textTransform: "uppercase",
  },
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
  lastSyncDate: {
    alignSelf: "center",
    fontSize: Sizes.xs,
    paddingVertical: Paddings.light,
  },
  noChildBirthday: {
    paddingVertical: Paddings.default,
  },
  switchViewMode: {
    alignItems: "flex-end",
  },
});

export default TabCalendarScreen;
