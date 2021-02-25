import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { View, Text } from '../Themed';

type TimelineStepProps = {
    title: string;
    icon: string;
    index: number;
    isTheLast: boolean
};

const TimelineStep: React.FC<TimelineStepProps> = ({title, icon, index, isTheLast}) => {

  const getStyles=(index: number, isTheLast: boolean) =>{
    const initialOffset = 10;
    const verticalOffset = 100;
    if(index === 0) {
      return [styles.step, {marginTop: initialOffset - 50}, styles.stepLeft];
    } else {
      const marginTop = ((initialOffset - index + 1) + (verticalOffset * (index - 1))) - (isTheLast ? 50 : 0);
      return [styles.step, {marginTop: marginTop}, (index %2 === 0) ? styles.stepLeft : styles.stepRight];
    }
  };

  return (
    <View style={getStyles(index, isTheLast)}>
        <Image style={[styles.stepIcon]} source={{uri: icon}}/>
        <Text style={[styles.stepTitle, isTheLast ? styles.stepLast : (index === 0) ? styles.stepFirst : null]}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    step: {
      height: 80,
      position: 'absolute',
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'transparent'
    },
    stepRight: {
      right: 0,
      flexDirection: 'row-reverse',
      textAlign: 'right',
    },
    stepLeft: {
      left: 0,
      flexDirection: 'row',
      textAlign: 'left',
    },
    stepIcon: {
      width: 80,
      height: 80,
    },
    stepTitle: {
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 13,
    },
    stepFirst: {
      paddingBottom: 60,
    },
    stepLast: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 80,
    },
  });

export default TimelineStep
