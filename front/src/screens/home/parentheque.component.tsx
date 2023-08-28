import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import _ from "lodash";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import type {
  NavigationState,
  SceneRendererProps,
} from "react-native-tab-view";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

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

  // TabView
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      accessible: true,
      key: "documents",
      title: Labels.parentheque.documentSection,
    },
    {
      accessible: true,
      key: "videos",
      title: Labels.parentheque.videoSection,
    },
  ]);

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

  const renderTabBar = useCallback(
    (
      props: SceneRendererProps & {
        navigationState: NavigationState<{
          accessible: boolean;
          key: string;
          title: string;
        }>;
      }
    ) => (
      <TabBar
        {...props}
        labelStyle={styles.tabBarLabel}
        style={[styles.whiteBackground]}
        indicatorStyle={styles.indicator}
      />
    ),
    []
  );

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
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          documents: () => TabParenthequeDocuments(documents),
          videos: () => TabParenthequeVideos(videos),
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={styles.whiteBackground}
      />
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
