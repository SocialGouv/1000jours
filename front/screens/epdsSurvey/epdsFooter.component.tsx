import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import type SwiperFlatListRefProps from "react-native-swiper-flatlist";

import BackButton from "../../components/BackButton";
import Button from "../../components/form/Button";
import Icomoon, { IcomoonIcons } from "../../components/Icomoon";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import Labels from "../../constants/Labels";

interface Props {
  swiperCurrentIndex: number;
  swiperRef: React.RefObject<SwiperFlatListRefProps>;
  showValidateButton: boolean | undefined;
  questionIsAnswered: boolean | undefined;
  setDisplayResult: (value: boolean) => void;
}

const EpdsFooter: React.FC<Props> = ({
  swiperCurrentIndex,
  swiperRef,
  showValidateButton,
  questionIsAnswered,
  setDisplayResult,
}) => {
  return (
    <View style={[styles.footer, styles.justifyContentCenter]}>
      <View style={[styles.buttonsContainer, styles.justifyContentCenter]}>
        <View style={[styles.buttonContainer]}>
          {swiperCurrentIndex > 0 && (
            <BackButton
              action={() => {
                swiperRef.current?.scrollToIndex({
                  index: swiperCurrentIndex - 1,
                });
              }}
            />
          )}
        </View>
        <View style={[styles.buttonContainer]}>
          {showValidateButton ? (
            <View style={styles.justifyContentCenter}>
              <Button
                title={Labels.buttons.validate}
                rounded={true}
                disabled={false}
                action={() => {
                  setDisplayResult(true);
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
                }}
              />
            )
          )}
        </View>
      </View>
    </View>
  );
};

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  footer: {
    flex: 1,
    paddingVertical: 10,
  },
  justifyContentCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EpdsFooter;
