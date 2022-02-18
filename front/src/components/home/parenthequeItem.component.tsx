import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { FetchPoliciesConstants, HomeDbQueries, Steps } from "../../constants";
import { GraphQLQuery } from "../../services";
import { Colors, Sizes } from "../../styles";
import type { TabHomeParamList } from "../../types";
import { View } from "../baseComponents";
import TimelineStepLibrary from "../timeline/timelineStepLibrary.component";

interface Props {
  navigation: StackNavigationProp<TabHomeParamList>;
}

const ParenthequeItem: FC<Props> = ({ navigation }) => {
  const [counterDocument, setCounterDocument] = useState(0);

  const handleResults = (data: unknown) => {
    const results = (data as { parenthequeDocuments: Document[] })
      .parenthequeDocuments;
    setCounterDocument(results.length);
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
      {counterDocument > 0 && (
        <>
          <View style={[styles.timelineContainer]}>
            <View
              style={[
                styles.timelineBlock,
                styles.timelineLibraryBlock,
                styles.timelineBlockLeft,
              ]}
            />
          </View>
          {[Steps.stepParentheque].map((step, index) => (
            <TimelineStepLibrary
              order={step.ordre}
              name={step.nom}
              key={index}
              onPress={() => {
                navigation.navigate("listParentsDocuments", { step });
              }}
            />
          ))}
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
