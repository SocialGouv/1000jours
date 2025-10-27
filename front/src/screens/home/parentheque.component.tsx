import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import _ from "lodash";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {
  TabParenthequeDocuments,
  TabParenthequeVideos,
} from "../../components";
import { BackButton, TitleH1, View } from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import { FetchPoliciesConstants, HomeDbQueries, Labels } from "../../constants";
import { GraphQLLazyQuery } from "../../services";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Paddings,
  Sizes,
} from "../../styles";
import type { Document, TabHomeParamList, Video } from "../../types";
import { TrackerUtils } from "../../utils";

interface Props {
  navigation: StackNavigationProp<TabHomeParamList>;
  route: RouteProp<
    { params?: { documents?: Document[]; videos?: Video[] } },
    "params"
  >;
}

const Tab = createMaterialTopTabNavigator();

const Parentheque: FC<Props> = ({ navigation, route }) => {
  const documentsFromParam =
    route.params?.documents && sortDocuments(route.params.documents);
  const videosFromParameters =
    route.params?.videos && sortVideos(route.params.videos);

  const [documents, setDocuments] = useState<Document[]>(
    documentsFromParam ?? []
  );
  const [shouldGetDocuments, setShouldGetDocuments] = useState(false);

  const [videos, setVideos] = useState<Video[]>(videosFromParameters ?? []);
  const [shouldGetVideos, setShouldGetVideos] = useState(false);

  useEffect(() => {
    if (!documentsFromParam) setShouldGetDocuments(!shouldGetDocuments);
    if (!videosFromParameters) setShouldGetVideos(!shouldGetVideos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBackButtonPressed = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleDocumentsResults = useCallback((data: unknown) => {
    const results = (data as { parenthequeDocuments: Document[] })
      .parenthequeDocuments;
    setDocuments(results);
  }, []);

  const handleVideosResults = useCallback((data: unknown) => {
    const results = (data as { videos: Video[] }).videos;
    setVideos(results);
  }, []);

  return (
    <>
      <View style={styles.scrollView}>
        <TrackerHandler
          screenName={`${TrackerUtils.TrackingEvent.PARENTHEQUE}`}
        />
        <View style={styles.topContainer}>
          <View style={[styles.flexStart]}>
            <BackButton action={onBackButtonPressed} />
          </View>
          <TitleH1
            title={Labels.parentheque.sectionTitle}
            description={Labels.parentheque.description}
            animated={false}
          />
        </View>
        <GraphQLLazyQuery
          query={HomeDbQueries.PARENTS_DOCUMENTS}
          fetchPolicy={FetchPoliciesConstants.CACHE_AND_NETWORK}
          getFetchedData={handleDocumentsResults}
          triggerLaunchQuery={shouldGetDocuments}
          noLoaderBackdrop
        />
        <GraphQLLazyQuery
          query={HomeDbQueries.PARENTHEQUE_VIDEOS}
          fetchPolicy={FetchPoliciesConstants.CACHE_AND_NETWORK}
          getFetchedData={handleVideosResults}
          triggerLaunchQuery={shouldGetVideos}
          noLoaderBackdrop
          noLoader
        />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIndicatorStyle: styles.indicator,
          tabBarStyle: styles.whiteBackground,
        }}
      >
        <Tab.Screen
          name="Documents"
          children={() => TabParenthequeDocuments(documents)}
          options={{ title: Labels.parentheque.documentSection }}
        />
        <Tab.Screen
          name="Videos"
          children={() => TabParenthequeVideos(videos)}
          options={{ title: Labels.parentheque.videoSection }}
        />
      </Tab.Navigator>
    </>
  );
};

const sortDocuments = (documents: Document[]) =>
  _.sortBy(documents, [
    function (doc) {
      return doc.ordre;
    },
  ]);

const sortVideos = (videos: Video[]) =>
  _.sortBy(videos, [
    function (video) {
      return video.ordre;
    },
  ]);

const styles = StyleSheet.create({
  flexStart: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  indicator: {
    backgroundColor: Colors.primaryBlue,
  },
  listContainer: {
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.smallest,
  },
  scrollView: {
    backgroundColor: Colors.white,
  },
  tabBarLabel: {
    color: Colors.primaryBlueDark,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.medium),
  },
  title: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.md,
    fontWeight: FontWeight.black,
    textTransform: "uppercase",
  },
  topContainer: {
    paddingHorizontal: Paddings.default,
    paddingTop: Paddings.default,
  },
  whiteBackground: {
    backgroundColor: Colors.white,
    paddingTop: Paddings.smallest,
  },
});

export default Parentheque;
