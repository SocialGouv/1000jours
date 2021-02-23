import * as React from 'react';
import { StyleSheet, Image } from 'react-native';

import { View, Text } from '../Themed';

type TimelineStepProps = {
    title: string;
    icon: string;
    index: number;
};

const TimelineStep: React.FC<TimelineStepProps> = ({title, icon, index}) => {

    const getStyles=(index: number) =>{
        const initialOffset = 10;
        const verticalOffset = 100;
        if(index === 0) {
            return [styles.step, {marginTop: initialOffset - 50}];
        } else if(index %2 === 0) {
            return [styles.step, styles.stepLeft, {marginTop: initialOffset + (verticalOffset * (index - 1))}];
        } else {
            return [styles.step, styles.stepRight, {marginTop: initialOffset + (verticalOffset * (index-1))}];
        }
    };

    return (
    <View style={getStyles(index)}>
        <Image style={[styles.stepIcon]} source={{uri: icon}}/>
        <Text style={[styles.stepTitle]}>{title}</Text>
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
        right: "5%",
        flexDirection: 'row-reverse'
      },
      stepLeft: {
        flexDirection: 'row'
      },
      stepIcon: {
        width: 80,
        height: 80,
      },
      stepTitle: {
        paddingLeft: 10,
        paddingRight: 10,
      }
  });

export default TimelineStep
