import { addDays, format } from "date-fns";

import { Formats } from "../../constants";
import type { Event } from "../../types";

export const formattedEvents = (
  eventsToFormat: Event[],
  childBirthday: string
): Event[] => {
  return eventsToFormat.map((event) => ({
    ...event,
    date: format(
      addDays(new Date(childBirthday), event.debut),
      Formats.dateISO
    ),
  }));
};
