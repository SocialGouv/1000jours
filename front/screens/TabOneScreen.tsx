import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { range } from 'lodash';

import { View } from '../components/Themed';
import TimelineStep from '../components/timeline/TimlineStep';

export default function TabOneScreen() {
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

  return (
    <ScrollView>

      <View style={[styles.mainContainer]}>
        <View style={[styles.timelineContainer]}>
          <View style={[styles.timelineBlock, styles.timelineBlockRight, styles.timelineBlockFirst]} />
          {range(steps.length - 2).map((index) =>
            <View style={[styles.timelineBlock, (index % 2 === 0) ? styles.timelineBlockLeft : styles.timelineBlockRight]} key={index} />
          )}
        </View>
        {steps.map(({ title, icon }, index) =>
          <TimelineStep title={title} icon={icon} index={index} key={index} />
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 100,
    marginLeft: 15,
    marginRight: 15
  },
  timelineContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 20
  },
  timelineBlock: {
    width: '75%',
    height: 100,
    marginTop: -1,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "#e29132",
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
    marginLeft: 50
  },
  timelineBlockLeft: {
    borderRightWidth: 0,
    borderLeftWidth: 1,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    marginRight: 50
  },
});
