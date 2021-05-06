import * as React from "react";
import { Linking } from "react-native";
import { StyleSheet } from "react-native";

import Button from "../../../components/form/Button";
import { CommonText } from "../../../components/StyledText";
import { View } from "../../../components/Themed";
import { Colors, FontWeight, Labels, Margins, Sizes } from "../../../constants";
import type { EpdsResultContactInformation } from "../../../type";

interface EpdsResultContactParagraphProps {
  paragraph: EpdsResultContactInformation;
  titleColor: string;

}

const EpdsResultContactParagraph: React.FC<EpdsResultContactParagraphProps> = ({
  paragraph,
  titleColor,
}) => {
  const titleColorStyle = { color: titleColor };

  const callContact = (phoneNumber: string) => {
    // Delete spaces
    phoneNumber = phoneNumber.replace(/ /g, "");
    void Linking.openURL("tel:" + phoneNumber);
  };

  return (
    <View style={styles.itemBorder}>
      <CommonText style={[styles.paragraphTitle, titleColorStyle]}>
        {paragraph.contactName}
      </CommonText>
      <CommonText style={styles.paragraphDescription}>
        {paragraph.thematic}
      </CommonText>
      <CommonText style={[styles.paragraphDescription, styles.fontBold]}>
        {paragraph.openingTime}
      </CommonText>
      <CommonText style={[styles.paragraphDescription, styles.fontBold]}>
        {paragraph.phoneNumber}
      </CommonText>
      <Button
        buttonStyle={styles.callButton}
        title={Labels.epdsSurvey.resultats.call}
        rounded={true}
        disabled={false}
        action={() => {
          callContact(paragraph.phoneNumber);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  callButton: {
    alignSelf: "flex-end",
  },
  fontBold: {
    fontWeight: FontWeight.bold,
  },
  itemBorder: {
    borderBottomColor: Colors.disabled,
    borderBottomWidth: 1,
    paddingBottom: Margins.smaller,
    paddingTop: Margins.smallest,
  },
  paragraphDescription: {
    color: Colors.commonText,
    fontSize: Sizes.xxs,
    lineHeight: Sizes.mmd,
  },
  paragraphTitle: {
    color: Colors.commonText,
    fontSize: Sizes.xxs,
    fontWeight: FontWeight.bold,
    lineHeight: Sizes.mmd,
  },
});

export default EpdsResultContactParagraph;
