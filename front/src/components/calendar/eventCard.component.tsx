import _ from "lodash";
import type { FC } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import {
  AccessibilityInfo,
  findNodeHandle,
  StyleSheet,
  View,
} from "react-native";
import { ListItem } from "react-native-elements";

import { Labels, StorageKeysConstants } from "../../constants";
import { useAccessibilityReader } from "../../hooks";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type { CartoFilterStorage } from "../../type";
import type { Event, Tag } from "../../types";
import {
  RootNavigation,
  StorageUtils,
  StringUtils,
  TrackerUtils,
} from "../../utils";
import { getThematiqueIcon } from "../../utils/thematique.util";
import ArticleCard from "../article/articleCard.component";
import {
  CommonText,
  CustomButton,
  ExpandableButton,
  Icomoon,
  IcomoonIcons,
  IconWithBackground,
  SecondaryText,
  ShareButton,
  SharePageType,
  Tags,
  UsefulQuestion,
} from "../baseComponents";
import TrackerHandler from "../tracker/trackerHandler.component";

interface Props {
  event: Event;
  isExpanded: boolean;
  onPressed: (eventId: string) => void;
}
const dotIconSize = Sizes.xxxs;

const EventCard: FC<Props> = ({ event, isExpanded, onPressed }) => {
  const [trackerAction, setTrackerAction] = useState("");
  const elementRef = useRef<View>(null);

  const getEventTags = () => {
    const tags: Tag[] = [];
    if (event.thematique?.nom)
      tags.push({
        bgColor: Colors.primaryBlueLight,
        color: Colors.primaryBlue,
        name: event.thematique.nom,
      });

    event.etapes?.forEach((etape) => {
      tags.push({
        bgColor: Colors.primaryYellowLight,
        color: Colors.primaryYellow,
        name: etape.nom,
      });
    });
    return tags;
  };

  const updateCartoFilterStorage = useCallback(async () => {
    const cartoFilterStorage: CartoFilterStorage = {
      types: event.typesPoi ? _.map(event.typesPoi, "nom") : [],
    };
    await StorageUtils.storeObjectValue(
      StorageKeysConstants.cartoFilterKey,
      cartoFilterStorage
    );
  }, [event.typesPoi]);

  const seeOnTheMap = useCallback(async () => {
    setTrackerAction(TrackerUtils.TrackingEvent.EVENT_SEE_THE_MAP);
    await updateCartoFilterStorage();
    void RootNavigation.navigate("aroundMeScreen");
  }, [updateCartoFilterStorage]);

  const setAccessibilityFocus = () => {
    if (elementRef.current) {
      const reactTag = findNodeHandle(elementRef.current);
      if (reactTag) {
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    }
  };

  useEffect(() => {
    if (isExpanded) setAccessibilityFocus();
  }, [isExpanded]);

  const onListItemPressed = useCallback(() => {
    onPressed(event.id.toString());
  }, [event.id, onPressed]);

  const isScreenReaderEnabled = useAccessibilityReader();

  return (
    <View style={styles.eventCardContainer}>
      {event.important && (
        <ExpandableButton
          expandedText={Labels.calendar.importantEvent}
          icon={
            <Icomoon
              name={IcomoonIcons.important}
              size={Sizes.sm}
              color={Colors.white}
            />
          }
          buttonColor={Colors.secondaryGreenDark}
        />
      )}
      <View style={styles.eventCard} key={event.id}>
        <TrackerHandler actionName={trackerAction} />
        <ListItem
          pad={0}
          containerStyle={styles.listItemContainer}
          onPress={onListItemPressed}
          accessibilityHint={Labels.accessibility.tapForMoreInfo}
          accessibilityLabel={`${Labels.accessibility.eventCard.title} : ${
            event.nom
          }. ${
            Labels.accessibility.eventCard.description
          } : ${StringUtils.removeListHyphens(event.description)}`}
        >
          <View style={styles.eventContainer}>
            <View style={styles.eventIconContainer}>
              <IconWithBackground
                iconName={getThematiqueIcon(event.thematique)}
              />
            </View>
            <View style={styles.eventContentContainer}>
              <CommonText style={styles.eventTitle}>{event.nom}</CommonText>
              <Tags tags={getEventTags()} />
              <SecondaryText style={styles.eventDescription}>
                {isScreenReaderEnabled
                  ? StringUtils.removeListHyphens(event.description)
                  : event.description}
              </SecondaryText>
            </View>
          </View>
        </ListItem>
        {isExpanded && (
          <View style={styles.eventDetailsContainer}>
            {event.typesPoi && event.typesPoi.length > 0 && (
              <View style={styles.linkCarto} ref={elementRef} accessible={true}>
                <CustomButton
                  rounded={true}
                  title={Labels.event.seeOnTheMap}
                  titleStyle={styles.buttonTitle}
                  buttonStyle={{ alignSelf: "center" }}
                  action={seeOnTheMap}
                />
              </View>
            )}
            <ShareButton
              buttonTitle={Labels.buttons.share}
              title={Labels.appName}
              message={`${Labels.share.event.messageStart} "${event.nom}" ${Labels.share.event.messageEnd}`}
              page={SharePageType.event}
              id={event.id}
            />
            <UsefulQuestion
              question={Labels.calendar.usefulEvent}
              trackerActionValue={TrackerUtils.TrackingEvent.EVENT}
              trackerNameValue={`${TrackerUtils.TrackingEvent.EVENT} : ${event.nom}`}
            />

            {event.articles && event.articles.length > 0 && (
              <View style={styles.listArticles}>
                <CommonText style={styles.listArticlesTitle}>
                  {Labels.event.matchingArticles} :
                </CommonText>
                {event.articles.map((article, index) => (
                  <View key={index}>
                    <ArticleCard
                      selectedArticleId={article.id}
                      articles={event.articles ?? []}
                    />
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonTitle: {
    fontSize: Sizes.xs,
    textTransform: "uppercase",
  },
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
  eventCard: {
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    margin: 0,
    marginStart: Margins.default,
    paddingTop: Paddings.smaller,
    position: "relative",
  },
  eventCardContainer: {
    paddingTop: Paddings.default,
    position: "relative",
  },
  eventContainer: {
    flex: 1,
    flexDirection: "row",
    padding: Paddings.light,
  },
  eventContentContainer: {
    flex: 3,
  },
  eventDescription: {
    color: Colors.commonText,
    fontSize: Sizes.xs,
  },
  eventDetailsContainer: {
    paddingHorizontal: Paddings.light,
  },
  eventIconContainer: {
    flex: 1,
  },
  eventTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.bold,
    paddingBottom: Paddings.light,
  },
  linkCarto: {
    paddingVertical: Paddings.default,
  },
  listArticles: {
    paddingBottom: Paddings.light,
  },
  listArticlesTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.bold,
    paddingBottom: Paddings.light,
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

export default EventCard;
