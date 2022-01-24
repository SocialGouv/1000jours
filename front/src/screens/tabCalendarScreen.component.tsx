import { useLazyQuery } from "@apollo/client";
import type { StackNavigationProp } from "@react-navigation/stack";
import { addDays, format } from "date-fns";
import * as Calendar from "expo-calendar";
import * as Localization from "expo-localization";
import _ from "lodash";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import * as React from "react";
import { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import HelpIcon from "../assets/images/help.png";
import {
  CommonText,
  CustomButton,
  ErrorMessage,
  Icomoon,
  IcomoonIcons,
  Loader,
  TitleH1,
} from "../components";
import ModalHelp from "../components/baseComponents/modalHelp.component";
import Events from "../components/calendar/events.component";
import { SecondaryTextItalic } from "../components/StyledText";
import { View } from "../components/Themed";
import {
  FetchPoliciesConstants,
  Formats,
  Labels,
  StorageKeysConstants,
} from "../constants";
import { ALL_EVENTS } from "../constants/databaseQueries.constants";
import {
  ICLOUD,
  PLATFORM_IS_IOS,
  SCREEN_WIDTH,
} from "../constants/platform.constants";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Paddings,
  Sizes,
} from "../styles";
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
  const [lastSyncDate, setLastSyncDate] = React.useState<string | null>(null);
  const hourWhenEventStart = 8; // Commence à 8h
  const hourWhenEventEnd = 18; // Se Termine à 18h

  const [showModalHelp, setShowModalHelp] = React.useState(false);

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
    return newCalendarID;
  };

  const buildDateTimeWithTimeZone = (date: string, hour: number) => {
    const hourOffset = new Date().getTimezoneOffset() / 60;
    const newHour = hour + hourOffset;
    const strNewHour =
      newHour.toString().length < 2 ? `0${newHour}` : `${newHour}`;
    return `${date}T${strNewHour}:00:00.000Z`;
  };

  const getAppCalendar = async () => {
    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    const calendar = _.find(calendars, {
      allowsModifications: true,
      color: Colors.primaryBlue,
      title: Labels.appName,
    });
    return calendar;
  };

  const syncEventsWithOsCalendar = async () => {
    trackScreenView(TrackerUtils.TrackingEvent.CALENDAR_SYNC);

    const appCalendar = await getAppCalendar();
    if (appCalendar?.id) void Calendar.deleteCalendarAsync(appCalendar.id);
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
      void loadEvents();
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
    const forceToScheduleEventsNotif = await StorageUtils.getObjectValue(
      StorageKeysConstants.forceToScheduleEventsNotif
    );
    if (
      stringIsNotNullNorEmpty(eventsCalcFromBirthday) &&
      (!notifIdsEventsStored ||
        eventsCalcFromBirthday !== childBirthday ||
        forceToScheduleEventsNotif)
    ) {
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.forceToScheduleEventsNotif,
        false
      );

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
    <View style={styles.mainContainer}>
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
              <View style={styles.flexStart}>
                <View style={{ flex: 0 }}>
                  <CustomButton
                    title={Labels.calendar.synchronise}
                    icon={
                      <Icomoon
                        name={IcomoonIcons.synchroniser}
                        size={Sizes.sm}
                        color={Colors.primaryBlue}
                      />
                    }
                    rounded={true}
                    disabled={false}
                    action={syncEventsWithOsCalendar}
                    titleStyle={styles.buttonTitleStyle}
                    buttonStyle={styles.buttonStyle}
                  />
                </View>
                <View style={styles.helpBtnContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowModalHelp(true);
                    }}
                  >
                    <Image source={HelpIcon} style={styles.helpIconStyle} />
                  </TouchableOpacity>
                </View>
              </View>
              {lastSyncDate && (
                <SecondaryTextItalic style={styles.lastSyncDate}>
                  {`(${Labels.calendar.lastSyncDate} ${format(
                    new Date(lastSyncDate),
                    Formats.dateTimeFR
                  )})`}
                </SecondaryTextItalic>
              )}
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
              <CustomButton
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
      {showModalHelp && (
        <ModalHelp
          icon={IcomoonIcons.synchroniser}
          title={Labels.calendar.synchronization}
          body={Labels.calendar.synchronizationHelper}
          onDismiss={() => {
            setShowModalHelp(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.white,
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    maxWidth: SCREEN_WIDTH * 0.8,
    paddingBottom: Paddings.smaller,
  },
  buttonTitleStyle: {
    color: Colors.primaryBlue,
    fontFamily: getFontFamilyName(FontNames.comfortaa, FontWeight.bold),
    fontSize: Sizes.xs,
    textAlign: "left",
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
  flexStart: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: Paddings.light,
  },
  helpBtnContainer: {
    flex: 0,
    paddingHorizontal: Paddings.light,
  },
  helpIconStyle: {
    height: Sizes.xxl,
    width: Sizes.xxl,
  },
  lastSyncDate: {
    color: Colors.commonText,
    fontFamily: "avenir-italic",
    fontSize: Sizes.xs,
    fontStyle: "italic",
    paddingBottom: Paddings.default,
  },
  mainContainer: {
    backgroundColor: Colors.white,
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
