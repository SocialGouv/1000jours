import { useMatomo } from "matomo-tracker-react-native";
import * as React from "react";
import { StyleSheet } from "react-native";
import type SwiperFlatListRefProps from "react-native-swiper-flatlist";

import Button from "../../components/baseComponents/button.component";
import Icomoon, { IcomoonIcons } from "../../components/baseComponents/icomoon.component";
import { View } from "../../components/Themed";
import { Colors, Labels } from "../../constants";
import { TrackerUtils } from "../../utils";

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
  const { trackScreenView } = useMatomo();
  return (
    <View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          {swiperCurrentIndex > 0 && (
            <Button
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
              action={() => {
                swiperRef.current?.scrollToIndex({
                  index: swiperCurrentIndex - 1,
                });
              }}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          {showValidateButton ? (
            <View style={styles.justifyContentCenter}>
              <Button
                title={Labels.buttons.finish}
                rounded={true}
                disabled={false}
                action={() => {
                  setShowResult(true);
                  trackScreenView(
                    `${TrackerUtils.TrackingEvent.EPDS} - questionnaire terminé`
                  );
                }}
              />
            </View>
          ) : (
            questionIsAnswered && (
              <Button
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
                action={() => {
                  swiperRef.current?.scrollToIndex({
                    index: swiperCurrentIndex + 1,
                  });
                  trackScreenView(
                    `${TrackerUtils.TrackingEvent.EPDS} - question n°${
                      swiperCurrentIndex + 1
                    } répondue`
                  );
                }}
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
