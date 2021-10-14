/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import { useMatomo } from "matomo-tracker-react-native";
import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native-elements";

import portraitElise from "../../assets/images/epds/portrait_elise.jpg";
import { Button, SecondaryText } from "../../components";
import { View } from "../../components/Themed";
import { FontWeight, Labels, Margins, Paddings, Sizes } from "../../constants";
import { TrackerUtils } from "../../utils";
import BeContacted from "./beContacted.component";

interface EpdsResultContactMamanBluesProps {
  primaryColor: string;
  secondaryColor: string;
  showSnackBar: (showSnackBar: boolean) => void;
}

const EpdsResultContactMamanBlues: React.FC<EpdsResultContactMamanBluesProps> =
  ({ primaryColor, secondaryColor, showSnackBar }) => {
    const { trackScreenView } = useMatomo();
    const [showBeContactedModal, setShowBeContactedModal] = useState(false);

    const backgroundColor = { backgroundColor: secondaryColor };
    const buttonColor = { backgroundColor: primaryColor };
    const pictureBorderColor = { borderColor: primaryColor };

    return (
      <View style={[styles.mainView, backgroundColor]}>
        <View style={[styles.rowView]}>
          <Image
            source={portraitElise}
            containerStyle={[styles.articleImage, pictureBorderColor]}
          />
          <SecondaryText style={styles.textStyle}>
            {Labels.epdsSurveyLight.textesExplication.contactParElise}
            <SecondaryText style={styles.fontBold}>
              {Labels.epdsSurveyLight.textesExplication.contactParEliseBold}
            </SecondaryText>
          </SecondaryText>
        </View>
        <View style={[styles.beContactedButton]}>
          <Button
            buttonStyle={buttonColor}
            title={Labels.epdsSurvey.beContacted.button}
            titleStyle={styles.fontButton}
            rounded={true}
            disabled={false}
            action={() => {
              trackScreenView(TrackerUtils.TrackingEvent.EPDS_BE_CONTACTED);
              setShowBeContactedModal(true);
            }}
          />
        </View>
        <BeContacted
          visible={showBeContactedModal}
          hideModal={(showSB: boolean) => {
            setShowBeContactedModal(false);
            showSnackBar(showSB);
          }}
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
    maxWidth: "70%",
  },
});

export default EpdsResultContactMamanBlues;
