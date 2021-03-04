import { range } from "lodash";
import type { FC } from "react";
import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { View } from "../components/Themed";
import TimelineStep from "../components/timeline/TimlineStep";
import Colors from "../constants/Colors";

const TabOneScreen: FC = () => {
  const screenTitle = "Choisissez l'étape que vous souhaitez approfondir";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const steps = [
    {
      icon:
        "https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg",
      title: "Projet de parentalité",
    },
    {
      icon:
        "https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg",
      title: "Conception",
    },
    {
      icon:
        "https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg",
      title: "Début de grossesse",
    },
    {
      icon:
        "https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg",
      title: "Suite et fin de grossesse",
    },
    {
      icon:
        "https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg",
      title: "Accouchement",
    },
    {
      icon:
        "https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg",
      title: "Ses 3 premiers mois",
    },
    {
      icon:
        "https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg",
      title: "De ses 4 mois à 1 an",
    },
    {
      icon:
        "https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg",
      title: "De sa 1ère année à sa 2ème année",
    },
  ];

  const numberOfStepsWithoutTheFirstAndLast = steps.length - 1 - 2;

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
        {steps.map(({ title, icon }, index) => (
          <TimelineStep
            title={title}
            icon={icon}
            index={index}
            isTheLast={index === steps.length - 1}
            key={index}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  description: {
    color: Colors.tertiaryColor,
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
    borderColor: Colors.secondaryColor,
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
    color: Colors.primaryColor,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default TabOneScreen;
