// eslint-disable-next-line import/no-duplicates
import { addDays, format, isBefore, isEqual } from "date-fns";
// eslint-disable-next-line import/no-duplicates
import { fr } from "date-fns/locale";
import _ from "lodash";
import type { FC } from "react";
import { useCallback } from "react";
import * as React from "react";
import type { LayoutChangeEvent } from "react-native";
import { ScrollView, StyleSheet, View } from "react-native";

import { Formats, Labels, StorageKeysConstants } from "../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type { Event } from "../../types";
import { StorageUtils } from "../../utils";
import { CommonText } from "../baseComponents";
import Icomoon, { IcomoonIcons } from "../baseComponents/icomoon.component";
import EventCard from "./eventCard.component";

interface Props {
  evenements: Event[];
  childBirthday: string;
  showEventDetails: boolean;
  scrollToEventId?: string;
}
const dotIconSize = Sizes.xxxs;
const Events: FC<Props> = ({ evenements, childBirthday, scrollToEventId }) => {
  let closestEventHasBeenFound = false;
  const [eventIdPressed, setEventIdPressed] = React.useState<string | null>(
    null
  );

  const today = new Date().setUTCHours(0, 0, 0, 0);

  const isClosestEvent = (date: Date) => {
    if (!closestEventHasBeenFound && !isBefore(date, today)) {
      closestEventHasBeenFound = true;
      return true;
    }
    return false;
  };

  const formattedEvents = _.chain(evenements)
    .map((event) => ({
      ...event,
      date:
        event.date ??
        format(addDays(new Date(childBirthday), event.debut), Formats.dateISO),
    }))
    .sort((item1, item2) =>
      new Date(item1.date) > new Date(item2.date) ? 0 : -1
    )
    .map((event) => ({
      ...event,
      isClosestEvent: isClosestEvent(new Date(event.date)),
    }))
    .groupBy("date")
    .value();

  const getDateTagTitle = (date: Date) => {
    if (isEqual(new Date(date), today)) return Labels.calendar.today;
    else return format(new Date(date), Formats.dateEvent, { locale: fr });
  };

  const eventCardPressed = useCallback((eventId: string) => {
    setEventIdPressed(eventId);
  }, []);

  const scrollViewRef = React.useRef<ScrollView>(null);
  const scrollToEvent = useCallback(
    (event: Event, layoutEvent: LayoutChangeEvent) => {
      let posY: number | null = null;
      if (eventIdPressed) {
        if (eventIdPressed === event.id.toString()) {
          posY = layoutEvent.nativeEvent.layout.y;
        }
      } else {
        if (scrollToEventId && event.id.toString() === scrollToEventId) {
          setEventIdPressed(event.id.toString());
          posY = layoutEvent.nativeEvent.layout.y;
          void StorageUtils.storeStringValue(
            StorageKeysConstants.scrollToEventId,
            ""
          );
        } else {
          if (event.isClosestEvent) {
            posY = layoutEvent.nativeEvent.layout.y;
          }
        }
      }

      if (posY) {
        scrollViewRef.current?.scrollTo({
          animated: true,
          y: posY,
        });
      }
    },
    [eventIdPressed, scrollToEventId]
  );

  const onViewLayout = useCallback(
    (layoutEvent: LayoutChangeEvent, date: string) => {
      const event = formattedEvents[date][0];
      scrollToEvent(event, layoutEvent);
    },
    [formattedEvents, scrollToEvent]
  );

  return (
    <ScrollView style={styles.mainContainer} ref={scrollViewRef}>
      <View style={styles.timeline} />
      {_.keys(formattedEvents).map((date, index) => (
        <View
          key={index}
          // eslint-disable-next-line react/jsx-no-bind
          onLayout={(layoutEvent: LayoutChangeEvent) => {
            onViewLayout(layoutEvent, date);
          }}
        >
          <View style={styles.dateTagContainer}>
            <View
              style={styles.dateTagIcon}
              importantForAccessibility="no-hide-descendants"
              accessibilityElementsHidden={true}
            >
              <Icomoon
                name={IcomoonIcons.point}
                size={dotIconSize}
                color={Colors.primaryBlue}
              />
            </View>

            <CommonText style={styles.dateTag} accessibilityRole="header">
              {getDateTagTitle(new Date(date))}
            </CommonText>
          </View>
          {formattedEvents[date].map((event, indexEvents) => (
            <View key={indexEvents}>
              <EventCard
                event={event}
                onPressed={eventCardPressed}
                isExpanded={eventIdPressed === event.id.toString()}
              />
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dateTag: {
    alignSelf: "flex-start",
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.bold,
    marginVertical: Margins.smallest,
    overflow: "hidden",
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.smaller,
    textTransform: "capitalize",
  },
  dateTagContainer: {
    flexDirection: "row",
  },
  dateTagIcon: {
    justifyContent: "center",
  },
  description: {
    color: Colors.commonText,
  },
  eventContainer: {
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    margin: 0,
    marginStart: Margins.default,
    padding: Paddings.default,
  },
  eventContentContainer: {
    flex: 3,
  },
  eventDescription: {
    color: Colors.commonText,
    fontSize: Sizes.xs,
  },
  eventIconContainer: {
    flex: 1,
  },
  eventTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.bold,
    paddingBottom: Paddings.light,
  },
  eventTypeBackground: {
    alignItems: "center",
    backgroundColor: "transparent",
    height: Sizes.xxxxl + Paddings.default,
    justifyContent: "center",
    paddingTop: Margins.light,
    width: Sizes.xxxxl + Paddings.light,
  },
  eventTypeIcon: {
    marginBottom: Margins.smaller,
    marginStart: Margins.smallest,
    resizeMode: "contain",
  },
  listItemContainer: {
    padding: Paddings.smallest,
  },
  mainContainer: {
    position: "relative",
  },
  timeline: {
    backgroundColor: Colors.primaryBlue,
    height: "100%",
    marginStart: dotIconSize / 2 - 1,
    position: "absolute",
    width: 1,
    zIndex: 1,
  },
});

export default Events;
