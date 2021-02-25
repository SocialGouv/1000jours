import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { range } from 'lodash';
import { View } from '../components/Themed';
import TimelineStep from '../components/timeline/TimlineStep';
import Colors from '../constants/Colors';

export default function TabOneScreen() {

  const title = 'Choisissez l\'étape que vous souhaitez approfondir';
  const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  const steps = [
    {
      title: "Projet de parentalité",
      icon: "https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg"
    },
    {
      title: "Conception",
      icon: "https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg"
    },
    {
      title: "Début de grossesse",
      icon: "https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg"
    },
    {
      title: "Suite et fin de grossesse",
      icon: "https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg"
    },
    {
      title: "Accouchement",
      icon: "https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg"
    },
    {
      title: "Ses 3 premiers mois",
      icon: "https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg"
    },
    {
      title: "De ses 4 mois à 1 an",
      icon: "https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg"
    },
    {
      title: "De sa 1ère année à sa 2ème année",
      icon: "https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg"
    },
  ];

  const numberOfStepsWithoutTheFirstAndLast = (steps.length - 1) - 2;

  return (
    <ScrollView style={[styles.mainContainer]}>
      <View>
        <Text style={[styles.title]}>{title}</Text>
        <Text style={[styles.description]}>{description}</Text>
      </View>
      <View style={[styles.timelineStepContainer]}>
        <View style={[styles.timelineContainer]}>
          <View style={[styles.timelineBlock, styles.timelineBlockRight, styles.timelineBlockFirst]} />
          {range(numberOfStepsWithoutTheFirstAndLast).map((index) =>
            <View style={[styles.timelineBlock, (index % 2 === 0) ? styles.timelineBlockLeft : styles.timelineBlockRight]} key={index} />
          )}
        </View>
        {steps.map(({ title, icon }, index) =>
          <TimelineStep title={title} icon={icon} index={index} isTheLast={(index === steps.length-1)} key={index} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: Colors.primaryColor,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10
  },
  description: {
    color: Colors.tertiaryColor,
  },
  mainContainer: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'white',
  },
  timelineStepContainer: {
    marginTop: 80,
    marginBottom: 80,
    marginLeft: '5%',
    marginRight: '5%',
  },
  timelineContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  timelineBlock: {
    height: 100,
    marginTop: -1,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: Colors.secondaryColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  timelineBlockFirst: {
    marginTop: 0,
  },
  timelineBlockRight: {
    borderRightWidth: 1,
    borderLeftWidth: 0,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    marginLeft: 75,
    marginRight: 25,
  },
  timelineBlockLeft: {
    borderRightWidth: 0,
    borderLeftWidth: 1,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    marginRight: 75,
    marginLeft: 25
  },
});
