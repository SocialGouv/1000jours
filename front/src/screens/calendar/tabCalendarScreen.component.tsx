import { format } from "date-fns";
import * as Calendar from "expo-calendar";
import * as Localization from "expo-localization";
import _ from "lodash";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { Alert, Image, StyleSheet, TouchableOpacity } from "react-native";

import HelpIcon from "../../assets/images/help.png";
import { Events } from "../../components";
import {
  CommonText,
  CustomButton,
  CustomSnackbar,
  Icomoon,
  IcomoonIcons,
  ModalHelp,
  SecondaryTextItalic,
  TitleH1,
  View,
} from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import {
  CalendarDbQueries,
  FetchPoliciesConstants,
  Formats,
  Labels,
  StorageKeysConstants,
} from "../../constants";
import {
  ICLOUD,
  PLATFORM_IS_IOS,
  SCREEN_WIDTH,
} from "../../constants/platform.constants";
import { useAccessibilityReader } from "../../hooks";
import { GraphQLLazyQuery } from "../../services";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Paddings,
  Sizes,
} from "../../styles";
import type { Event } from "../../types";
import {
  NotificationUtils,
  StorageUtils,
  StringUtils,
  TrackerUtils,
} from "../../utils";
import { formattedEvents } from "../../utils/events/event.util";
import * as RootNavigation from "../../utils/rootNavigation.util";

const TabCalendarScreen: FC = () => {
  const [childBirthday, setChildBirthday] = useState("");
  const [eventsCalcFromBirthday, setEventsCalcFromBirthday] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [lastSyncDate, setLastSyncDate] = useState<string | null>(null);
  const hourWhenEventStart = 8; // Commence à 8h
  const hourWhenEventEnd = 18; // Se Termine à 18h

  const [showModalHelp, setShowModalHelp] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [triggerGetAllEvents, setTriggerGetAllEvents] = useState(false);
  const [trackerAction, setTrackerAction] = useState("");

  const [scrollToEventId, setScrollToEventId] = useState("");
  const isAccessibilityModeOn = useAccessibilityReader();

  const init = useCallback(async () => {
    await getLastSyncDate();
    await getScrollToEventId();

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
      setTriggerGetAllEvents(!triggerGetAllEvents);
    }
  }, [triggerGetAllEvents]);

  useEffect(() => {
    void init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getScrollToEventId = async () => {
    const eventId = await StorageUtils.getStringValue(
      StorageKeysConstants.scrollToEventId
    );
    if (eventId) setScrollToEventId(eventId);
  };

  const getLastSyncDate = async () => {
    const calendarSyncDate = await StorageUtils.getStringValue(
      StorageKeysConstants.osCalendarSyncDate
    );
    if (calendarSyncDate) setLastSyncDate(calendarSyncDate);
  };

  const calendarSourceIOS = async () => {
    const sources = await Calendar.getSourcesAsync();
    return sources.find((source) => source.name === ICLOUD) ?? sources[0];
  };

  const createCalendar = useCallback(async () => {
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
  }, []);

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

  const createEventInCalendar = useCallback(
    (calendarId: string, event: Event) => {
      try {
        if (event.date) {
          void Calendar.createEventAsync(calendarId, {
            endDate: buildDateTimeWithTimeZone(event.date, hourWhenEventEnd),
            notes: event.description ?? "",
            startDate: buildDateTimeWithTimeZone(
              event.date,
              hourWhenEventStart
            ),
            timeZone: Localization.timezone,
            title: event.nom,
          });
        }
      } catch (e: unknown) {
        console.error((e as Error).message);
        setShowSnackBar(true);
      }
    },
    []
  );

  const syncEventsWithOsCalendar = useCallback(async () => {
    setTrackerAction(TrackerUtils.TrackingEvent.CALENDAR_SYNC);

    const calendarPermission = await Calendar.requestCalendarPermissionsAsync();
    if (calendarPermission.granted) {
      const appCalendar = await getAppCalendar();
      if (appCalendar?.id) void Calendar.deleteCalendarAsync(appCalendar.id);
      const newCalendarId = await createCalendar();

      events.forEach((event) => {
        createEventInCalendar(newCalendarId, event);
      });

      const date = new Date().toISOString();
      void StorageUtils.storeStringValue(
        StorageKeysConstants.osCalendarSyncDate,
        date
      );
      setLastSyncDate(date);
    } else {
      Alert.alert(Labels.calendar.pleaseAllowAccessCalendar);
    }
  }, [createCalendar, createEventInCalendar, events]);

  const scheduleEventsNotification = useCallback(async () => {
    const notifIdsEventsStored = await StorageUtils.getObjectValue(
      StorageKeysConstants.notifIdsEvents
    );
    const forceToScheduleEventsNotif = await StorageUtils.getObjectValue(
      StorageKeysConstants.forceToScheduleEventsNotif
    );
    if (
      StringUtils.isNotNullNorEmpty(eventsCalcFromBirthday) &&
      (!notifIdsEventsStored ||
        eventsCalcFromBirthday !== childBirthday ||
        forceToScheduleEventsNotif)
    ) {
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.forceToScheduleEventsNotif,
        false
      );

      // Supprime les anciennes et planifie les nouvelles notifications des événements
      void NotificationUtils.rescheduleEventsNotifications(events);
    }
  }, [childBirthday, events, eventsCalcFromBirthday]);

  useEffect(() => {
    setLoadingEvents(false);
    if (events.length > 0) {
      void scheduleEventsNotification();
    }
  }, [events, scheduleEventsNotification]);

  const handleResults = useCallback(
    (data: unknown) => {
      const evenements = (data as { evenements: Event[] }).evenements;

      void StorageUtils.storeStringValue(
        StorageKeysConstants.eventsCalcFromBirthday,
        childBirthday
      )
        .then(() => {
          setEvents(formattedEvents(evenements, childBirthday));
        })
        .catch(() => {
          setLoadingEvents(false);
        });
    },
    [childBirthday]
  );

  const onShowHelpModalButtonPressed = useCallback(
    (showModal: boolean) => () => {
      setShowModalHelp(showModal);
    },
    []
  );

  const navigateToProfile = useCallback(() => {
    void RootNavigation.navigate("profile");
  }, []);

  const onHideSnackBar = useCallback(() => {
    setShowSnackBar(false);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <TitleH1
        title={Labels.tabs.calendarTitle}
        description={Labels.calendar.description}
        animated={false}
      />
      <TrackerHandler
        screenName={TrackerUtils.TrackingEvent.CALENDAR}
        actionName={trackerAction}
      />
      {!loadingEvents && (
        <View style={styles.calendarContainer}>
          {childBirthday.length > 0 ? (
            <>
              <View style={styles.flexStart}>
                <View style={{ flex: 0 }}>
                  <CustomButton
                    title={Labels.calendar.synchronize}
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
                    accessibilityLabel={`${Labels.calendar.synchronize}. ${Labels.calendar.synchronizationHelper}`}
                  />
                </View>
                {!isAccessibilityModeOn && (
                  <View style={styles.helpBtnContainer}>
                    <TouchableOpacity
                      onPress={onShowHelpModalButtonPressed(true)}
                    >
                      <Image source={HelpIcon} style={styles.helpIconStyle} />
                    </TouchableOpacity>
                  </View>
                )}
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
                scrollToEventId={scrollToEventId}
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
                action={navigateToProfile}
              />
            </View>
          )}
        </View>
      )}
      <GraphQLLazyQuery
        query={CalendarDbQueries.ALL_EVENTS}
        fetchPolicy={FetchPoliciesConstants.CACHE_AND_NETWORK}
        getFetchedData={handleResults}
        triggerLaunchQuery={triggerGetAllEvents}
        noLoaderBackdrop
      />
      {showModalHelp && (
        <ModalHelp
          icon={IcomoonIcons.synchroniser}
          title={Labels.calendar.synchronization}
          body={Labels.calendar.synchronizationHelper}
          onDismiss={onShowHelpModalButtonPressed(false)}
        />
      )}
      <CustomSnackbar
        isAccessibilityModeOn={isAccessibilityModeOn}
        visible={showSnackBar}
        isOnTop={false}
        backgroundColor={Colors.primaryBlueLight}
        onDismiss={onHideSnackBar}
        textColor={Colors.primaryBlue}
        text={Labels.errorMsg}
      />
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
