import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import { range } from "lodash";
import type { FC } from "react";
import * as React from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { View } from "../components/Themed";
import TimelineStep from "../components/timeline/TimlineStep";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import type { Step, TabHomeParamList } from "../types";

interface Props {
  navigation: StackNavigationProp<TabHomeParamList, "listArticles">;
}

const TabHomeScreen: FC<Props> = ({ navigation }) => {
  const screenTitle = "Choisissez l'étape que vous souhaitez approfondir";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const ALL_STEPS = gql`
    query GetAllSteps {
      etapes(order_by: { ordre: asc }) {
        id
        nom
        ordre
        description
      }
    }
  `;
  const { loading, error, data } = useQuery(ALL_STEPS);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>{Labels.errorMsg}</Text>;

  const result = data as { etapes: Step[] };
  const numberOfStepsWithoutTheFirstAndLast = result.etapes.length - 1 - 2;
  return (
    <ScrollView style={[styles.mainContainer]}>
      <View>
        <Text style={[styles.title]}>{screenTitle}</Text>
        <Text style={[styles.description]}>{description}</Text>
      </View>
      <View style={[styles.timelineStepContainer]}>
        <View style={[styles.timelineContainer]}>
          <View
            style={[
              styles.timelineBlock,
              styles.timelineBlockRight,
              styles.timelineBlockFirst,
            ]}
          />
          {range(numberOfStepsWithoutTheFirstAndLast).map((index) => (
            <View
              style={[
                styles.timelineBlock,
                index % 2 === 0
                  ? styles.timelineBlockLeft
                  : styles.timelineBlockRight,
              ]}
              key={index}
            />
          ))}
        </View>
        {result.etapes.map((step, index) => (
          <TimelineStep
            ordre={step.ordre}
            nom={step.nom}
            index={index}
            isTheLast={index === result.etapes.length - 1}
            key={index}
            onPress={() => {
              navigation.navigate("listArticles", { step });
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  description: {
    color: Colors.commonText,
  },
  mainContainer: {
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
  },
  timelineBlock: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderColor: Colors.primaryYellow,
    borderStyle: "solid",
    borderTopWidth: 1,
    height: 100,
    marginTop: -1,
  },
  timelineBlockFirst: {
    marginTop: 0,
  },
  timelineBlockLeft: {
    borderBottomLeftRadius: 50,
    borderLeftWidth: 1,
    borderRightWidth: 0,
    borderTopLeftRadius: 50,
    marginLeft: 25,
    marginRight: 75,
  },
  timelineBlockRight: {
    borderBottomRightRadius: 50,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderTopRightRadius: 50,
    marginLeft: 75,
    marginRight: 25,
  },
  timelineContainer: {
    flex: 1,
    flexDirection: "column",
  },
  timelineStepContainer: {
    marginBottom: 80,
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: 80,
  },
  title: {
    color: Colors.primaryBlue,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default TabHomeScreen;
