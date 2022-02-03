import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import { Labels } from "../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import { CustomButton, SecondaryText, TitleH1, View } from "../baseComponents";

interface EpdsLoadPreviousSurveyProps {
  startSurveyOver: (value: boolean) => void;
}

const EpdsLoadPreviousSurvey: FC<EpdsLoadPreviousSurveyProps> = ({
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