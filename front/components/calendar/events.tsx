import { addDays, format } from "date-fns";
import _ from "lodash";
import type { FC } from "react";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";

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
import { CommonText } from "../StyledText";

interface Props {
  evenements: Event[];
  childBirthday: string;
}

const Events: FC<Props> = ({ evenements, childBirthday }) => {
  const formattedEvents = _.chain(evenements)
    .map((event) => ({
      ...event,
      date: format(
        addDays(new Date(childBirthday), event.debut),
        Formats.dateISO
      ),
    }))
    .sort((item1, item2) =>
      new Date(item1.date) > new Date(item2.date) ? 0 : -1
    )
    .groupBy("date")
    .value();

  return (
    <View>
      <CommonText style={styles.eventTitle}>
        {Labels.calendar.listOfEvents}
      </CommonText>
      <ScrollView>
        {_.keys(formattedEvents).map((date, indexDate) => (
          <View key={indexDate}>
            <CommonText style={styles.dateTag}>
              {format(new Date(date), Formats.dateFR)}
            </CommonText>
            {formattedEvents[date].map((event, indexEvent) => (
              <ListItem
                key={indexEvent}
                pad={0}
                containerStyle={styles.listItemContainer}
              >
                <View style={styles.eventContainer}>
                  <CommonText style={styles.eventTitle}>{event.nom}</CommonText>
                  <CommonText style={styles.eventDescription}>
                    {event.description}
                  </CommonText>
                </View>
              </ListItem>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dateTag: {
    alignSelf: "flex-start",
    backgroundColor: Colors.primaryBlue,
    borderRadius: Sizes.xxxxs,
    color: "white",
    fontWeight: FontWeight.bold,
    marginVertical: Margins.smallest,
    overflow: "hidden",
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.smaller,
  },
  description: {
    color: Colors.commonText,
  },
  eventContainer: {
    backgroundColor: Colors.primaryBlueLight,
    borderStartColor: Colors.primaryBlue,
    borderStartWidth: 2,
    flex: 1,
    margin: 0,
    padding: Paddings.default,
  },
  eventDescription: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xxxs,
  },
  eventTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.xxs,
    fontWeight: FontWeight.bold,
    paddingBottom: Paddings.light,
  },
  listItemContainer: {
    padding: Paddings.smallest,
  },
});

export default Events;
