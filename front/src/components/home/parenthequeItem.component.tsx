import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { FetchPoliciesConstants, HomeDbQueries, Labels } from "../../constants";
import { GraphQLQuery } from "../../services";
import { Colors, Sizes } from "../../styles";
import type { Document, TabHomeParamList } from "../../types";
import { View } from "../baseComponents";
import TimelineStep from "../timeline/timelineStep.component";

interface Props {
  navigation: StackNavigationProp<TabHomeParamList>;
}

const ParenthequeItem: FC<Props> = ({ navigation }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const handleResults = (data: unknown) => {
    const results = (data as { parenthequeDocuments: Document[] })
      .parenthequeDocuments;
    setDocuments(results);
  };

  return (
    <View
      style={[
        styles.timelineStepContainer,
        styles.timelineStepLibraryContainer,
      ]}
    >
      <GraphQLQuery
        query={HomeDbQueries.PARENTS_DOCUMENTS}
        fetchPolicy={FetchPoliciesConstants.CACHE_AND_NETWORK}
        updateFetchedData={handleResults}
      />
      {documents.length > 0 && (
        <>
          <View
            style={[
              styles.timelineContainer,
              styles.timelineBlock,
              styles.timelineLibraryBlock,
              styles.timelineBlockLeft,
            ]}
          />
          <TimelineStep
            order={0}
            name={Labels.timeline.library.nom}
            index={-1}
            active={false}
            isTheLast={false}
            onPress={() => {
              navigation.navigate("parentheque", {
                documents,
              });
            }}
            isParentheque
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  timelineBlock: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderColor: Colors.primaryYellow,
    borderStyle: "solid",
    borderTopWidth: 1,
    height: Sizes.timelineBlock,
    marginTop: -1,
  },
  timelineBlockLeft: {
    borderBottomLeftRadius: Sizes.timelineBlock / 2,
    borderLeftWidth: 1,
    borderRightWidth: 0,
    borderTopLeftRadius: Sizes.timelineBlock / 2,
    marginLeft: Sizes.step / 4,
    marginRight: Sizes.step,
  },
  timelineContainer: {
    flex: 1,
    flexDirection: "column",
  },
  timelineLibraryBlock: {
    borderBottomWidth: 0,
    borderColor: Colors.primaryBlue,
    borderStyle: "solid",
    borderTopWidth: 1,
  },
  timelineStepContainer: {
    marginBottom: Sizes.step,
    marginLeft: "5%",
    marginRight: "5%",
  },
  timelineStepLibraryContainer: {
    marginBottom: 0,
    marginTop: Sizes.step,
  },
});

export default ParenthequeItem;
