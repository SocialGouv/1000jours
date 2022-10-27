import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";

import { FetchPoliciesConstants, HomeDbQueries, Labels } from "../../constants";
import { GraphQLQuery } from "../../services";
import { Colors, Sizes } from "../../styles";
import type { Document, TabHomeParamList } from "../../types";
import { View } from "../baseComponents";
import TimelineStep from "../timeline/timelineStep.component";

interface Props {
  navigation: StackNavigationProp<TabHomeParamList>;
  isBasicTimeline?: boolean;
}

const ParenthequeItem: FC<Props> = ({ navigation, isBasicTimeline }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const handleResults = useCallback((data: unknown) => {
    const results = (data as { parenthequeDocuments: Document[] })
      .parenthequeDocuments;
    setDocuments(results);
  }, []);

  const onNavigateToParenthequeButtonPressed = useCallback(() => {
    navigation.navigate("parentheque", {
      documents,
    });
  }, [documents, navigation]);

  const drawTimeLine = () => {
    if (isBasicTimeline) {
      return (
        <View style={styles.lineContainer}>
          <View style={styles.line} />
        </View>
      );
    }
    return (
      <View
        style={[
          styles.timelineContainer,
          styles.timelineBlock,
          styles.timelineLibraryBlock,
          styles.timelineBlockLeft,
        ]}
      />
    );
  };

  return (
    <View
      style={[
        styles.timelineStepContainer,
        styles.timelineStepLibraryContainer,
        isBasicTimeline ? null : styles.timelineMargin,
      ]}
    >
      <GraphQLQuery
        query={HomeDbQueries.PARENTS_DOCUMENTS}
        fetchPolicy={FetchPoliciesConstants.CACHE_AND_NETWORK}
        getFetchedData={handleResults}
      />
      {documents.length > 0 && (
        <>
          {drawTimeLine()}
          <TimelineStep
            order={0}
            name={Labels.timeline.library.nom}
            index={-1}
            active={false}
            isTheLast={false}
            onPress={onNavigateToParenthequeButtonPressed}
            isParentheque
            isBasicTimeline={isBasicTimeline}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    backgroundColor: Colors.primaryBlueDark,
    height: "100%",
    position: "absolute",
    width: 1,
  },
  lineContainer: {
    height: "100%",
    marginLeft: Sizes.step / 2,
    position: "absolute",
    width: 1,
  },
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
  timelineMargin: { marginHorizontal: "5%" },
  timelineStepContainer: {
    marginBottom: Sizes.step,
  },
  timelineStepLibraryContainer: {
    marginBottom: 0,
    marginTop: Sizes.step,
  },
});

export default ParenthequeItem;
