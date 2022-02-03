import { useLazyQuery } from "@apollo/client";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import {
  DatabaseQueries,
  FetchPoliciesConstants,
  Steps,
} from "../../constants";
import { Colors, Sizes } from "../../styles";
import type { TabHomeParamList } from "../../types";
import { TimelineStepLibrary } from "..";
import { View } from "../baseComponents";

interface Props {
  navigation: StackNavigationProp<TabHomeParamList>;
}

const ParenthequeItem: FC<Props> = ({ navigation }) => {
  const [counterDocument, setCounterDocument] = useState(0);
  const [
    loadParentheque,
    {
      loading: loadingParentheque,
      error: errorParentheque,
      data: dataParentheque,
    },
  ] = useLazyQuery(DatabaseQueries.PARENTS_DOCUMENTS, {
    fetchPolicy: FetchPoliciesConstants.CACHE_AND_NETWORK,
  });

  useEffect(() => {
    void loadParentheque();
  }, []);

  useEffect(() => {
    if (!loadingParentheque && dataParentheque) {
      const results = (dataParentheque as { parenthequeDocuments: Document[] })
        .parenthequeDocuments;
      setCounterDocument(results.length);
    }
  }, [loadingParentheque, dataParentheque, errorParentheque]);

  if (counterDocument > 0)
    return (
      <View
        style={[
          styles.timelineStepContainer,
          styles.timelineStepLibraryContainer,
        ]}
      >
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
      </View>
    );

  return (
    <View
      style={[
        styles.timelineStepContainer,
        styles.timelineStepLibraryContainer,
      ]}
    />
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
  timelineBlockRight: {
    borderBottomRightRadius: Sizes.timelineBlock / 2,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderTopRightRadius: Sizes.timelineBlock / 2,
    marginLeft: Sizes.step,
    marginRight: Sizes.step / 4,
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