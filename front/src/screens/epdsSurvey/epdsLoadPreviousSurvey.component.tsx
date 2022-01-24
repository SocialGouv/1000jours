import * as React from "react";
import { StyleSheet } from "react-native";

import { TitleH1 } from "../../components";
import CustomButton from "../../components/baseComponents/customButton.component";
import { SecondaryText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import {
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../constants";

interface EpdsLoadPreviousSurveyProps {
  startSurveyOver: (value: boolean) => void;
}

const EpdsLoadPreviousSurvey: React.FC<EpdsLoadPreviousSurveyProps> = ({
  startSurveyOver,
}) => {
  return (
    <View style={styles.mainContainer}>
      <TitleH1 title={Labels.epdsSurvey.title} animated={false} />
      <View style={styles.content}>
        <SecondaryText style={styles.instruction}>
          {Labels.epdsSurvey.previousSurvey.messsage}
        </SecondaryText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <CustomButton
              title={Labels.epdsSurvey.previousSurvey.continueButton}
              titleStyle={styles.titleButtonStyle}
              buttonStyle={styles.buttonStyle}
              rounded={true}
              action={() => {
                startSurveyOver(false);
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              title={Labels.epdsSurvey.previousSurvey.startOverButton}
              titleStyle={styles.titleButtonStyle}
              buttonStyle={styles.buttonStyle}
              rounded={true}
              action={() => {
                startSurveyOver(true);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  buttonStyle: {
    marginHorizontal: Margins.default,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  instruction: {
    color: Colors.commonText,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.medium,
    padding: Paddings.default,
  },
  mainContainer: {
    flex: 1,
  },
  titleButtonStyle: {
    fontSize: Sizes.xs,
  },
});

export default EpdsLoadPreviousSurvey;
