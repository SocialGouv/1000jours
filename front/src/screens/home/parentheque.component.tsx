import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import _ from "lodash";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

import { DocumentCard } from "../../components";
import { BackButton, TitleH1, View } from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import { FetchPoliciesConstants, HomeDbQueries, Labels } from "../../constants";
import { GraphQLLazyQuery } from "../../services";
import { Colors, FontWeight, Paddings, Sizes } from "../../styles";
import type { Document, TabHomeParamList } from "../../types";
import { TrackerUtils } from "../../utils";

interface Props {
  navigation: StackNavigationProp<TabHomeParamList>;
  route: RouteProp<{ params?: { documents?: Document[] } }, "params">;
}

const Parentheque: FC<Props> = ({ navigation, route }) => {
  const documentsFromParam =
    route.params?.documents && sortDocuments(route.params.documents);

  const [documents, setDocuments] = useState<Document[]>(
    documentsFromParam ?? []
  );
  const [triggerGetDocuments, setTriggerGetDocuments] = useState(false);

  useEffect(() => {
    if (!documentsFromParam) {
      setTriggerGetDocuments(!triggerGetDocuments);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBackButtonPressed = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleResults = useCallback((data: unknown) => {
    const results = (data as { parenthequeDocuments: Document[] })
      .parenthequeDocuments;
    setDocuments(results);
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <TrackerHandler
        screenName={`${TrackerUtils.TrackingEvent.PARENTHEQUE}`}
      />
      <View style={styles.topContainer}>
        <View style={[styles.flexStart]}>
          <BackButton action={onBackButtonPressed} />
        </View>
        <TitleH1
          title={Labels.timeline.library.nom}
          description={Labels.timeline.library.description}
          animated={false}
        />
      </View>
      <GraphQLLazyQuery
        query={HomeDbQueries.PARENTS_DOCUMENTS}
        fetchPolicy={FetchPoliciesConstants.CACHE_AND_NETWORK}
        getFetchedData={handleResults}
        triggerLaunchQuery={triggerGetDocuments}
        noLoaderBackdrop
      />
      {documents.length > 0 && (
        <View style={styles.listContainer}>
          {documents.map((document, index) => (
            <Animatable.View
              key={index}
              animation="fadeInUp"
              duration={1000}
              delay={0}
            >
              <DocumentCard document={document} />
            </Animatable.View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const sortDocuments = (documents: Document[]) => {
  return _.sortBy(documents, [
    function (doc) {
      return doc.ordre;
    },
  ]);
};

const styles = StyleSheet.create({
  flexStart: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  listContainer: {
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.smallest,
  },
  scrollView: {
    backgroundColor: Colors.white,
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
});

export default Parentheque;
