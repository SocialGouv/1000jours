// eslint-disable-next-line import/no-duplicates
import { addDays, format, isBefore, isEqual } from "date-fns";
// eslint-disable-next-line import/no-duplicates
import { fr } from "date-fns/locale";
import _ from "lodash";
import type { FC } from "react";
import * as React from "react";
import type { LayoutChangeEvent } from "react-native";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";

import BgImage from "../../assets/images/bg-icon-event-type.png";
import {
  Colors,
  FontWeight,
  Formats,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../constants";
import type { Event } from "../../types";
import Icomoon, { IcomoonIcons } from "../base/icomoon.component";
import { CommonText, SecondaryText } from "../StyledText";

interface Props {
  evenements: Event[];
  childBirthday: string;
}
const dotIconSize = Sizes.xxxs;
const Events: FC<Props> = ({ evenements, childBirthday }) => {
  let closestEventHasBeenFound = false;

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

  const scrollViewRef = React.useRef<ScrollView>(null);
  const scrollTo = (positionY: number) => {
    scrollViewRef.current?.scrollTo({
      animated: true,
      y: positionY,
    });
  };

  return (
    <ScrollView style={styles.mainContainer} ref={scrollViewRef}>
      <View style={styles.timeline}></View>
      {_.keys(formattedEvents).map((date, indexDate) => (
        <View
          key={indexDate}
          onLayout={(layoutEvent: LayoutChangeEvent) => {
            const event = formattedEvents[date][0];
            if (event.isClosestEvent) {
              const { layout } = layoutEvent.nativeEvent;
              scrollTo(layout.y);
            }
          }}
        >
          <View style={styles.dateTagContainer}>
            <View style={styles.dateTagIcon}>
              <Icomoon
                name={IcomoonIcons.point}
                size={dotIconSize}
                color={Colors.primaryBlue}
              />
            </View>

            <CommonText style={styles.dateTag}>
              {getDateTagTitle(new Date(date))}
            </CommonText>
          </View>
          {formattedEvents[date].map((event, indexEvent) => (
            <ListItem
              key={indexEvent}
              pad={0}
              containerStyle={styles.listItemContainer}
            >
              <View style={styles.eventContainer}>
                <View style={styles.eventIconContainer}>
                  <ImageBackground
                    source={BgImage}
                    imageStyle={styles.eventTypeIcon}
                    style={styles.eventTypeBackground}
                  >
                    <Icomoon
                      name={IcomoonIcons.calendrier}
                      size={Sizes.xxxl}
                      color={Colors.primaryBlue}
                    />
                  </ImageBackground>
                </View>
                <View style={styles.eventContentContainer}>
                  <CommonText style={styles.eventTitle}>{event.nom}</CommonText>
                  <SecondaryText style={styles.eventDescription}>
                    {event.description}
                  </SecondaryText>
                </View>
              </View>
            </ListItem>
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
    fontWeight: FontWeight.bold,
    marginVertical: Margins.smallest,
    overflow: "hidden",
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.smaller,
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
