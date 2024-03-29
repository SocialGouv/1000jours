import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import type SwiperFlatListRefProps from "react-native-swiper-flatlist";

import { Labels } from "../../constants";
import { Colors } from "../../styles";
import type { TrackingEvent } from "../../utils/tracking/tracker.util";
import { CustomButton, Icomoon, IcomoonIcons, View } from "../baseComponents";
import TrackerHandler from "../tracker/trackerHandler.component";

interface Props {
  swiperCurrentIndex: number;
  swiperRef: React.RefObject<SwiperFlatListRefProps>;
  showValidateButton: boolean | undefined;
  questionIsAnswered: boolean | undefined;
  setShowResult: (value: boolean) => void;
  isAccessibilityModeOn: boolean;
  setSwiperCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  trackingEvent: TrackingEvent;
}

const SurveyFooter: React.FC<Props> = ({
  swiperCurrentIndex,
  swiperRef,
  showValidateButton,
  questionIsAnswered,
  setShowResult,
  isAccessibilityModeOn,
  setSwiperCurrentIndex,
  trackingEvent,
}) => {
  const [trackerAction, setTrackerAction] = useState("");

  const updateSwiperIndex = useCallback(
    (newValue: number) => {
      if (isAccessibilityModeOn) {
        setSwiperCurrentIndex(newValue);
      } else {
        swiperRef.current?.scrollToIndex({
          index: newValue,
        });
      }
      if (newValue > 0)
        setTrackerAction(`${trackingEvent} - question n°${newValue} répondue`);
    },
    [isAccessibilityModeOn, setSwiperCurrentIndex, swiperRef, trackingEvent]
  );

  const onBackButtonPressed = useCallback(() => {
    updateSwiperIndex(swiperCurrentIndex - 1);
  }, [swiperCurrentIndex, updateSwiperIndex]);

  const onNextButtonPressed = useCallback(() => {
    updateSwiperIndex(swiperCurrentIndex + 1);
  }, [swiperCurrentIndex, updateSwiperIndex]);

  const onFinishButtonPressed = useCallback(() => {
    setShowResult(true);
    setTrackerAction(`${trackingEvent} - questionnaire terminé`);
  }, [setShowResult, trackingEvent]);

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

export default SurveyFooter;
