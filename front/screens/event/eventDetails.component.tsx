import { useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import { addDays, format } from "date-fns";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import * as React from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

import {
  BackButton,
  ErrorMessage,
  Events,
  Loader,
  TitleH1,
  View,
} from "../../components";
import {
  Formats,
  Labels,
  Paddings,
  StorageKeysConstants,
} from "../../constants";
import type { Event, TabCalendarParamList } from "../../types";
import { StorageUtils, TrackerUtils } from "../../utils";

interface Props {
  navigation: StackNavigationProp<TabCalendarParamList, "eventDetails">;
  route: RouteProp<{ params: { eventId: string } }, "params">;
}

const EventDetails: FC<Props> = ({ navigation, route }) => {
  const { trackScreenView } = useMatomo();

  const [childBirthday, setChildBirthday] = React.useState("");
  const [events, setEvents] = React.useState<Event[]>([]);
  const [loadingEvent, setLoadingEvent] = React.useState(false);

  const EVENT_DETAILS = gql`
    query GetEventDetails {
      evenement(id: ${route.params.eventId})
      {
        id
        nom
        description
        debut
        fin
        thematique {
          id
          nom
        }
        etapes {
          id
          nom
        }
      }
    }
  `;
  const [loadEvent, { loading, error, data }] = useLazyQuery(EVENT_DETAILS, {
    fetchPolicy: "cache-and-network",
  });

  const init = async () => {
    const childBirthdayStr =
      (await StorageUtils.getStringValue(
        StorageKeysConstants.userChildBirthdayKey
      )) ?? "";

    if (childBirthdayStr.length > 0) {
      setChildBirthday(childBirthdayStr);
      setLoadingEvent(true);
      if (route.params.eventId) loadEvent();
    }
  };

  useEffect(() => {
    void init();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      const eventDetails = (data as { evenement: Event }).evenement;
      const date = format(
        addDays(new Date(childBirthday), eventDetails.debut),
        Formats.dateISO
      );
      eventDetails.date = date;
      setEvents([eventDetails]);

      trackScreenView(
        `${TrackerUtils.TrackingEvent.EVENT} : ${eventDetails.nom}`
      );
      setLoadingEvent(false);
    }
  }, [loading, data]);

  return (
    <View style={styles.container}>
      <View style={[styles.flexStart]}>
        <BackButton
          action={() => {
            navigation.goBack();
          }}
        />
      </View>
      <TitleH1 title={Labels.event.title} animated={false} />
      {loadingEvent ? (
        <Loader />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <View style={styles.calendarContainer}>
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
