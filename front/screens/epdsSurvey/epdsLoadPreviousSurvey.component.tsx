import * as React from "react";
import { StyleSheet } from "react-native";

import Button from "../../components/base/button.component";
import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import { Colors, FontWeight, Labels, Paddings, Sizes } from "../../constants";

interface EpdsLoadPreviousSurveyProps {
  startSurveyOver: (value: boolean) => void;
}

const EpdsLoadPreviousSurvey: React.FC<EpdsLoadPreviousSurveyProps> = ({
  startSurveyOver,
}) => {
  return (
    <View style={styles.mainContainer}>
      <CommonText style={styles.instruction}>
        {Labels.epdsSurvey.previousSurvey.messsage}
      </CommonText>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button
            title={Labels.epdsSurvey.previousSurvey.continueButton}
            titleStyle={styles.titleButtonStyle}
            rounded={true}
            action={() => {
              startSurveyOver(false);
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={Labels.epdsSurvey.previousSurvey.startOverButton}
            titleStyle={styles.titleButtonStyle}
            rounded={true}
            action={() => {
              startSurveyOver(true);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  instruction: {
    color: Colors.commonText,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.medium,
    padding: Paddings.default,
  },
  mainContainer: {
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
  },
  titleButtonStyle: {
    fontSize: Sizes.xs,
  },
});

export default EpdsLoadPreviousSurvey;
