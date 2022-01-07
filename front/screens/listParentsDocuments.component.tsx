import { useQuery } from "@apollo/client";
import type { RouteProp } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import _ from "lodash";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import * as React from "react";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

import { BackButton, ErrorMessage, Loader, TitleH1, View } from "../components";
import DocumentCard from "../components/document/documentCard.component";
import {
  Colors,
  FetchPoliciesConstants,
  FontWeight,
  Paddings,
  Sizes,
} from "../constants";
import { PARENTS_DOCUMENTS } from "../constants/databaseQueries.constants";
import type { Document, Step, TabHomeParamList } from "../types";
import { TrackerUtils } from "../utils";

interface Props {
  navigation: StackNavigationProp<TabHomeParamList>;
  route: RouteProp<{ params: { step: Step } }, "params">;
}

const ListParentsDocuments: FC<Props> = ({ navigation, route }) => {
  const screenTitle = route.params.step.nom;
  const description = route.params.step.description;
  const { trackScreenView } = useMatomo();

  const [documents, setDocuments] = React.useState<Document[]>([]);
  const [showDocuments, setShowDocuments] = React.useState(false);

  const { loading, error, data } = useQuery(PARENTS_DOCUMENTS, {
    fetchPolicy: FetchPoliciesConstants.CACHE_AND_NETWORK,
  });

  useEffect(() => {
    trackScreenView(`${TrackerUtils.TrackingEvent.PARENTHEQUE}`);
  }, []);

  useEffect(() => {
    if (!loading && data) setShowDocuments(true);
  }, [documents]);

  useEffect(() => {
    if (!loading && data) {
      const results = (data as { parenthequeDocuments: Document[] })
        .parenthequeDocuments;
      setDocuments(sortDocuments(results));
    }
  }, [loading, data]);

  if (error) return <ErrorMessage error={error} />;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.topContainer}>
        <View style={[styles.flexStart]}>
          <BackButton
            action={() => {
              navigation.goBack();
            }}
          />
        </View>
        <TitleH1
          title={screenTitle}
          description={description}
          animated={false}
        />
      </View>

      {showDocuments ? (
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
      ) : (
        <Loader />
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
  description: {
    color: Colors.commonText,
  },
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

export default ListParentsDocuments;
