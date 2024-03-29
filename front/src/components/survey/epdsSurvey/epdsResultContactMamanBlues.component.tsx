/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native-elements";

import portraitElise from "../../../assets/images/epds/portrait_elise.jpg";
import { Labels } from "../../../constants";
import { FontWeight, Margins, Paddings, Sizes } from "../../../styles";
import { TrackerUtils } from "../../../utils";
import { CustomButton, SecondaryText, View } from "../../baseComponents";
import TrackerHandler from "../../tracker/trackerHandler.component";
import HowToBeContacted from "./beContacted/howToBeContacted.component";

interface EpdsResultContactMamanBluesProps {
  primaryColor: string;
  secondaryColor: string;
  showSnackBar: (showSnackBar: boolean) => void;
}

const EpdsResultContactMamanBlues: React.FC<
  EpdsResultContactMamanBluesProps
> = ({ primaryColor, secondaryColor, showSnackBar }) => {
  const [showBeContactedModal, setShowBeContactedModal] = useState(false);
  const [trackerAction, setTrackerAction] = useState("");

  const backgroundColor = { backgroundColor: secondaryColor };
  const buttonColor = { backgroundColor: primaryColor };
  const pictureBorderColor = { borderColor: primaryColor };

  const onBeContactedButtonPressed = useCallback(() => {
    setTrackerAction(TrackerUtils.TrackingEvent.EPDS_BE_CONTACTED);
    setShowBeContactedModal(true);
  }, []);

  const onHideModal = useCallback(
    (showSB: boolean) => {
      setShowBeContactedModal(false);
      showSnackBar(showSB);
    },
    [showSnackBar]
  );

  return (
    <View style={[styles.mainView, backgroundColor]}>
      <TrackerHandler actionName={trackerAction} />
      <View style={[styles.rowView]}>
        <Image
          source={portraitElise}
          containerStyle={[styles.articleImage, pictureBorderColor]}
          height={Sizes.step}
          width={Sizes.step}
        />
        <SecondaryText style={styles.textStyle}>
          {Labels.epdsSurveyLight.textesExplication.contactParElise}
          <SecondaryText style={styles.fontBold}>
            {Labels.epdsSurveyLight.textesExplication.contactParEliseBold}
          </SecondaryText>
        </SecondaryText>
      </View>
      <View style={[styles.beContactedButton]}>
        <CustomButton
          buttonStyle={buttonColor}
          title={Labels.epdsSurvey.beContacted.button}
          titleStyle={styles.fontButton}
          rounded={true}
          disabled={false}
          action={onBeContactedButtonPressed}
        />
      </View>
      <HowToBeContacted
        visible={showBeContactedModal}
        hideModal={onHideModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  articleImage: {
    alignSelf: "center",
    borderRadius: Sizes.step / 2,
    borderWidth: 3,
    height: Sizes.step,
    marginRight: Margins.smaller,
    width: Sizes.step,
  },
  beContactedButton: {
    alignItems: "center",
    backgroundColor: "transparent",
    paddingTop: Paddings.light,
  },
  fontBold: {
    fontWeight: FontWeight.bold,
  },
  fontButton: {
    fontSize: Sizes.sm,
    textTransform: "uppercase",
  },
  mainView: {
    flexDirection: "column",
    marginVertical: Margins.smaller,
    paddingHorizontal: Paddings.smaller,
    paddingVertical: Paddings.default,
  },
  rowView: {
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  textStyle: {
    alignSelf: "center",
    fontSize: Sizes.sm,
    maxWidth: "75%",
  },
});

export default EpdsResultContactMamanBlues;
