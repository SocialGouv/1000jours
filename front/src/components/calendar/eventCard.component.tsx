import _ from "lodash";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import * as React from "react";
import {
  AccessibilityInfo,
  findNodeHandle,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import { ListItem } from "react-native-elements";

import BgImage from "../../assets/images/bg-icon-event-type.png";
import { Labels, StorageKeysConstants } from "../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type { CartoFilterStorage } from "../../type";
import type { Event, Tag } from "../../types";
import { RootNavigation, StorageUtils, TrackerUtils } from "../../utils";
import { getThematiqueIcon } from "../../utils/thematique.util";
import ArticleCard from "../article/articleCard.component";
import { CommonText, SecondaryText } from "../baseComponents";
import CustomButton from "../baseComponents/customButton.component";
import Icomoon from "../baseComponents/icomoon.component";
import ShareButton, {
  SharePageType,
} from "../baseComponents/shareButton.component";
import Tags from "../baseComponents/tags.component";
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

  const updateCartoFilterStorage = () => {
    const cartoFilterStorage: CartoFilterStorage = {
      etapes: _.map(event.etapes, "nom"),
      thematiques: event.thematique?.nom ? [event.thematique.nom] : [],
      types: [],
    };
    void StorageUtils.storeObjectValue(
      StorageKeysConstants.cartoFilterKey,
      cartoFilterStorage
    );
  };

  const seeOnTheMap = () => {
    setTrackerAction(TrackerUtils.TrackingEvent.EVENT_SEE_THE_MAP);
    updateCartoFilterStorage();
    void RootNavigation.navigate("tabAroundMe", null);
  };

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

  return (
    <View style={styles.eventCard} key={event.id}>
      <TrackerHandler actionName={trackerAction} />
      <ListItem
        pad={0}
        containerStyle={styles.listItemContainer}
        onPress={() => {
          onPressed(event.id.toString());
        }}
        accessibilityHint={Labels.accessibility.tapForMoreInfo}
        accessibilityLabel={`${Labels.accessibility.eventCard.title} : ${event.nom}. ${Labels.accessibility.eventCard.description} : ${event.description}`}
      >
        <View style={styles.eventContainer}>
          <View style={styles.eventIconContainer}>
            <ImageBackground
              source={BgImage}
              imageStyle={styles.eventTypeIcon}
              style={styles.eventTypeBackground}
            >
              <Icomoon
                name={getThematiqueIcon(event.thematique)}
                size={Sizes.xxxl}
                color={Colors.primaryBlue}
              />
            </ImageBackground>
          </View>
          <View style={styles.eventContentContainer}>
            <CommonText style={styles.eventTitle}>{event.nom}</CommonText>
            <Tags tags={getEventTags()}></Tags>
            <SecondaryText style={styles.eventDescription}>
              {event.description}
            </SecondaryText>
          </View>
        </View>
      </ListItem>

      {isExpanded && (
        <View style={styles.eventDetailsContainer}>
          <View style={styles.linkCarto} ref={elementRef} accessible={true}>
            <CustomButton
              rounded={true}
              title={Labels.event.seeOnTheMap}
              titleStyle={styles.buttonTitle}
              buttonStyle={{ alignSelf: "center" }}
              action={seeOnTheMap}
            />
          </View>
          <ShareButton
            buttonTitle={Labels.buttons.share}
            title={Labels.appName}
            message={`${Labels.share.event.messageStart} "${event.nom}" ${Labels.share.event.messageEnd}`}
            page={SharePageType.event}
            id={event.id}
          />

          {event.articles && event.articles.length > 0 && (
            <View style={styles.listArticles}>
              <CommonText style={styles.listArticlesTitle}>
                {Labels.event.matchingArticles} :
              </CommonText>
              {event.articles.map((article, index) => (
                <View key={index}>
                  <ArticleCard article={article} />
                </View>
              ))}
            </View>
          )}
        </View>
      )}
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
