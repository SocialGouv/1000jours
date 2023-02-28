import type { FC } from "react";
import { useCallback } from "react";
import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import MilleJours from "../../assets/images/partners/1000-premiers-jours.png";
import BibaMagazine from "../../assets/images/partners/bibamagazine.jpg";
import Bussy from "../../assets/images/partners/bussy.png";
import Cnaf from "../../assets/images/partners/cnaf.png";
import Doctissimo from "../../assets/images/partners/doctissimo.jpeg";
import EnjoyFamily from "../../assets/images/partners/enjoy-family.jpeg";
import MamanBlues from "../../assets/images/partners/maman-blues.jpeg";
import MonenfantFr from "../../assets/images/partners/monenfant-fr.png";
import Mpedia from "../../assets/images/partners/mpedia.jpeg";
import Orehane from "../../assets/images/partners/orehane.jpeg";
import Parents from "../../assets/images/partners/parents.png";
import Path from "../../assets/images/partners/path.png";
import ProsPetiteEnfance from "../../assets/images/partners/pros-petite-enfance.png";
import Spf from "../../assets/images/partners/spf.jpeg";
import Wemoms from "../../assets/images/partners/wemoms.png";
import { PartnersAssets } from "../../components/assets";
import {
  CommonText,
  CustomButton,
  View,
} from "../../components/baseComponents";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import { Labels } from "../../constants";
import { Colors, Margins, Paddings, Sizes } from "../../styles";
import { LinkingUtils, TrackerUtils } from "../../utils";

const TabEpdsScreen: FC = () => {
  const onOpenWidget = useCallback(() => {
    const EPDS_WIDGET_SOURCE = "1000j-application";

    void LinkingUtils.openWebsite(
      `${process.env.EPDS_WIDGET_URL}/?source=${EPDS_WIDGET_SOURCE}`,
      false
    );
  }, []);

  const getViewToDisplay = () => {
    return (
      <View style={styles.mainView}>
        <CommonText style={styles.textDescription}>
          {Labels.epdsSurvey.epdsPresentation.description}
        </CommonText>
        <View style={styles.logoBlues}>
          <PartnersAssets.MillesJoursBlues
            width={Sizes.xxxxxxl}
            height={Sizes.xxxxxxl}
          />
        </View>
        <CustomButton
          title={Labels.epdsSurvey.epdsPresentation.button}
          rounded
          action={onOpenWidget}
        />
        <CommonText style={styles.textDescription}>
          {Labels.epdsSurvey.epdsPresentation.tools}
        </CommonText>
        {partnersBloc()}
        <CustomButton
          title={Labels.epdsSurvey.epdsPresentation.button}
          rounded
          action={onOpenWidget}
        />
      </View>
    );
  };
  const partnersBloc = () => {
    return (
      <View style={styles.logosPartners}>
        <Image source={MilleJours} style={styles.logoImage} />
        <Image source={Cnaf} style={styles.logoImage} />
        <Image source={Spf} style={styles.logoImage} />
        <Image source={MonenfantFr} style={styles.logoImage} />

        <Image source={MamanBlues} style={styles.logoImage} />
        <Image source={ProsPetiteEnfance} style={styles.logoImage} />
        <Image source={Orehane} style={styles.logoImage} />
        <Image source={EnjoyFamily} style={styles.logoImage} />

        <Image source={Wemoms} style={styles.logoImage} />
        <Image source={BibaMagazine} style={styles.logoImage} />
        <Image source={Bussy} style={styles.logoImage} />
        <Image source={Mpedia} style={styles.logoImage} />
        <Image source={Parents} style={styles.logoImage} />
        <Image source={Doctissimo} style={styles.logoImage} />
        <Image source={Path} style={styles.logoImage} />
      </View>
    );
  };
  return (
    <ScrollView style={styles.mainContainer}>
      <TrackerHandler screenName={TrackerUtils.TrackingEvent.EPDS} />
      {getViewToDisplay()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logoBlues: {
    alignSelf: "center",
    marginBottom: Margins.default,
  },
  logoImage: {
    height: Sizes.xxxxxxxl,
    resizeMode: "contain",
    width: Sizes.xxxxxxxl,
  },
  logosPartners: {
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: Margins.default,
  },
  mainContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: Paddings.larger,
  },
  mainView: {
    marginBottom: Margins.default,
  },
  textDescription: {
    marginVertical: Margins.larger,
  },
});

export default TabEpdsScreen;
