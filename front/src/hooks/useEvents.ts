import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import {
  CalendarDbQueries,
  FetchPoliciesConstants,
  StorageKeysConstants,
} from "../constants";
import type { Event } from "../types";
import { StorageUtils } from "../utils";
import { formattedEvents } from "../utils/events/event.util";

const useEvents = (): Event[] => {
  const [events, setEvents] = useState<Event[]>([]);

  const [getEventsQuery] = useLazyQuery(gql(CalendarDbQueries.ALL_EVENTS), {
    fetchPolicy: FetchPoliciesConstants.CACHE_AND_NETWORK,
    onCompleted: async (data) => {
      const evenements = (data as { evenements: Event[] }).evenements;
      const childBirthday =
        (await StorageUtils.getStringValue(
          StorageKeysConstants.eventsCalcFromBirthday
        )) ?? "";

      setEvents(formattedEvents(evenements, childBirthday));
    },
    onError: (e) => {
      console.warn(e);
      setEvents([]);
    },
  });

  useEffect(() => {
    const eventsQuery = async () => {
      await getEventsQuery();
    };

    void eventsQuery();
  }, []);

  return events;
};

export default useEvents;
