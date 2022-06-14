import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import type SwiperFlatListRefProps from "react-native-swiper-flatlist";

import {
  CustomButton,
  Icomoon,
  IcomoonIcons,
  View,
} from "../../components/baseComponents";
import { Labels } from "../../constants";
import { Colors } from "../../styles";
import { TrackerUtils } from "../../utils";
import TrackerHandler from "../tracker/trackerHandler.component";

interface Props {
  swiperCurrentIndex: number;
  swiperRef: React.RefObject<SwiperFlatListRefProps>;
  showValidateButton: boolean | undefined;
  questionIsAnswered: boolean | undefined;
  setShowResult: (value: boolean) => void;
}

const EpdsSurveyFooter: React.FC<Props> = ({
  swiperCurrentIndex,
  swiperRef,
  showValidateButton,
  questionIsAnswered,
  setShowResult,
}) => {
  const [trackerAction, setTrackerAction] = useState("");

  const onBackButtonPressed = useCallback(() => {
    swiperRef.current?.scrollToIndex({
      index: swiperCurrentIndex - 1,
    });
  }, [swiperCurrentIndex, swiperRef]);

  const onNextButtonPressed = useCallback(() => {
    swiperRef.current?.scrollToIndex({
      index: swiperCurrentIndex + 1,
    });
    setTrackerAction(
      `${TrackerUtils.TrackingEvent.EPDS} - question n°${
        swiperCurrentIndex + 1
      } répondue`
    );
  }, [swiperCurrentIndex, swiperRef]);

  const onFinishButtonPressed = useCallback(() => {
    setShowResult(true);
    setTrackerAction(
      `${TrackerUtils.TrackingEvent.EPDS} - questionnaire terminé`
    );
  }, [setShowResult]);

  return (
    <View>
      <TrackerHandler actionName={trackerAction} />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          {swiperCurrentIndex > 0 && (
            <CustomButton
              title={Labels.buttons.back}
              rounded={false}
              disabled={false}
              icon={
                <Icomoon
                  name={IcomoonIcons.retour}
                  size={14}
                  color={Colors.primaryBlue}
                />
              }
              action={onBackButtonPressed}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          {showValidateButton ? (
            <View style={styles.justifyContentCenter}>
              <CustomButton
                title={Labels.buttons.finish}
                rounded={true}
                disabled={false}
                action={onFinishButtonPressed}
              />
            </View>
          ) : (
            questionIsAnswered && (
              <CustomButton
                title={Labels.buttons.next}
                rounded={false}
                disabled={false}
                icon={
                  <Icomoon
                    name={IcomoonIcons.suivant}
                    size={14}
                    color={Colors.primaryBlue}
                  />
                }
                action={onNextButtonPressed}
              />
            )
          )}
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
  justifyContentCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EpdsSurveyFooter;