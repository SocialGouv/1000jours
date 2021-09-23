import { useLazyQuery } from "@apollo/client";
import _ from "lodash";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import { useEffect } from "react";
import * as React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";

import BgImage from "../../assets/images/bg-icon-event-type.png";
import {
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
  StorageKeysConstants,
} from "../../constants";
import { GET_EVENT_ARTICLES } from "../../constants/databaseQueries.constants";
import type { CartoFilterStorage } from "../../type";
import type { Article, Event, Tag } from "../../types";
import { StorageUtils, TrackerUtils } from "../../utils";
import * as RootNavigation from "../../utils/rootNavigation.util";
import { getThematiqueIcon } from "../../utils/thematique.util";
import { Loader } from "..";
import ArticleCard from "../article/articleCard.component";
import Button from "../base/button.component";
import ErrorMessage from "../base/errorMessage.component";
import Icomoon from "../base/icomoon.component";
import Tags from "../base/tags.component";
import { CommonText, SecondaryText } from "../StyledText";

interface Props {
  event: Event;
  isExpanded: boolean;
  onPressed: (eventId: string) => void;
}
const dotIconSize = Sizes.xxxs;

const EventCard: FC<Props> = ({ event, isExpanded, onPressed }) => {
  const { trackScreenView } = useMatomo();
  const [articles, setArticles] = React.useState<Article[]>([]);
  const MAX_ARTICLES = 10;

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
    trackScreenView(TrackerUtils.TrackingEvent.EVENT_SEE_THE_MAP);
    updateCartoFilterStorage();
    RootNavigation.navigate("tabAroundMe", null);
  };

  const buildWhereCondition = () => {
    let condition = "";
    condition +=
      event.etapes && event.etapes.length > 0
        ? "etapes: { id_in: $etapeIds }" // <field>_in: Matches any value in the array of values.
        : "etapes: { id_nin: $etapeIds }"; // <field>_nin: Doesn't match any value in the array of values.

    condition += event.thematique?.id
      ? "thematiques: { id: $thematiqueId }"
      : "thematiques: { id_ne: $thematiqueId }"; // <field>_ne: Not equals.

    return condition;
  };

  const [loadArticles, { loading, error, data }] = useLazyQuery(
    GET_EVENT_ARTICLES(buildWhereCondition(), MAX_ARTICLES),
    {
      variables: {
        etapeIds: _.map(event.etapes, "id"),
        thematiqueId: event.thematique?.id,
      },
    }
  );

  useEffect(() => {
    if (isExpanded) loadArticles();
  }, [isExpanded]);

  useEffect(() => {
    if (!loading && data) {
      const results = (data as { articles: Article[] }).articles;
      setArticles(results);
    }
  }, [loading, data]);

  if (error) return <ErrorMessage error={error} />;

  return (
    <View style={styles.eventCard} key={event.id}>
      <ListItem
        key={event.id}
        pad={0}
        containerStyle={styles.listItemContainer}
        onPress={() => {
          onPressed(event.id.toString());
        }}
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
          <View style={styles.linkCarto}>
            <Button
              rounded={true}
              title={Labels.event.seeOnTheMap}
              titleStyle={{
                textTransform: "uppercase",
              }}
              buttonStyle={{ alignSelf: "center" }}
              action={seeOnTheMap}
            />
          </View>

          {loading ? (
            <Loader />
          ) : (
            articles.length > 0 && (
              <View style={styles.listArticles}>
                <CommonText style={styles.listArticlesTitle}>
                  {Labels.event.matchingArticles} :
                </CommonText>
                {articles.map((article, index) => (
                  <View key={index}>
                    <ArticleCard article={article} />
                  </View>
                ))}
              </View>
            )
          )}
        </View>
      )}
    </View>
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
  linkCarto: {
    paddingVertical: Paddings.default,
  },
  listArticles: {
    paddingBottom: Paddings.light,
  },
  listArticlesTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.normal,
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
