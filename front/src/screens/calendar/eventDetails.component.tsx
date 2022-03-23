import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import { addDays, format } from "date-fns";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import { Events } from "../../components";
import { BackButton, TitleH1, View } from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import {
  CalendarDbQueries,
  FetchPoliciesConstants,
  Formats,
  Labels,
  StorageKeysConstants,
} from "../../constants";
import { GraphQLLazyQuery } from "../../services";
import { Paddings } from "../../styles";
import type { Event, TabCalendarParamList } from "../../types";
import { StorageUtils, TrackerUtils } from "../../utils";

interface Props {
  navigation: StackNavigationProp<TabCalendarParamList, "eventDetails">;
  route: RouteProp<{ params: { eventId: string } }, "params">;
}

const EventDetails: FC<Props> = ({ navigation, route }) => {
  const [childBirthday, setChildBirthday] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [triggerLoadEvent, setTriggerLoadEvent] = useState(false);

  const init = async () => {
    const childBirthdayStr =
      (await StorageUtils.getStringValue(
        StorageKeysConstants.userChildBirthdayKey
      )) ?? "";

    if (childBirthdayStr.length > 0) {
      setChildBirthday(childBirthdayStr);
      setLoadingEvent(true);
      if (route.params.eventId) setTriggerLoadEvent(!triggerLoadEvent);
    }
  };

  useEffect(() => {
    void init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBackButtonPressed = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleResults = useCallback(
    (data: unknown) => {
      const eventDetails = (data as { evenement: Event }).evenement;
      const date = format(
        addDays(new Date(childBirthday), eventDetails.debut),
        Formats.dateISO
      );
      eventDetails.date = date;
      setEvents([eventDetails]);
      setLoadingEvent(false);
    },
    [childBirthday]
  );

  return (
    <View style={styles.container}>
      <View style={[styles.flexStart]}>
        <BackButton action={onBackButtonPressed} />
      </View>
      <TitleH1 title={Labels.event.title} animated={false} />
      <GraphQLLazyQuery
        query={CalendarDbQueries.GET_EVENT_DETAILS(route.params.eventId)}
        fetchPolicy={FetchPoliciesConstants.CACHE_AND_NETWORK}
        getFetchedData={handleResults}
        triggerLaunchQuery={triggerLoadEvent}
        noLoaderBackdrop
      />
      {!loadingEvent && (
        <View style={styles.calendarContainer}>
          <TrackerHandler
            screenName={`${TrackerUtils.TrackingEvent.EVENT} : ${events[0].nom}`}
          />
          <Events
            evenements={events}
            childBirthday={childBirthday}
            showEventDetails={true}
          />
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
  flexStart: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default EventDetails;
