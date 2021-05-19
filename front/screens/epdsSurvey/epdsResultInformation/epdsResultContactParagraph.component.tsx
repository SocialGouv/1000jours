import * as React from "react";
import { Linking, StyleSheet } from "react-native";

import Button from "../../../components/form/Button";
import { CommonText } from "../../../components/StyledText";
import { View } from "../../../components/Themed";
import { Colors, FontWeight, Labels, Margins, Sizes } from "../../../constants";
import type { EpdsResultContactInformation } from "../../../type";

interface EpdsResultContactParagraphProps {
  paragraphTitle?: string;
  paragraph: EpdsResultContactInformation;
  titleColor: string;
}

const EpdsResultContactParagraph: React.FC<EpdsResultContactParagraphProps> = ({
  paragraphTitle,
  paragraph,
  titleColor,
}) => {
  const titleColorStyle = { color: titleColor };

  const callContact = (phoneNumber: string) => {
    // Delete spaces
    phoneNumber = phoneNumber.replace(/ /g, "");
    void Linking.openURL("tel:" + phoneNumber);
  };

  const titleStyle = [styles.contactTitle, { fontSize: Sizes.xs }];
  return (
    <View style={styles.itemBorder}>
      {paragraphTitle && paragraphTitle.length > 0 && (
        <CommonText style={titleStyle}>{paragraphTitle}</CommonText>
      )}
      <CommonText style={[styles.contactTitle, titleColorStyle]}>
        {paragraph.contactName}
      </CommonText>
      <CommonText style={styles.contactDescription}>
        {paragraph.thematic}
      </CommonText>
      <CommonText style={[styles.contactDescription, styles.fontBold]}>
        {paragraph.openingTime}
      </CommonText>
      <CommonText style={[styles.contactDescription, styles.fontBold]}>
        {paragraph.phoneNumber}
      </CommonText>
      <Button
        buttonStyle={styles.callButton}
        title={Labels.epdsSurvey.resultats.call}
        titleStyle={styles.fontButton}
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
  contactDescription: {
    color: Colors.commonText,
    fontSize: Sizes.xxs,
    lineHeight: Sizes.mmd,
  },
  contactTitle: {
    color: Colors.commonText,
    fontSize: Sizes.xxs,
    fontWeight: FontWeight.bold,
    lineHeight: Sizes.mmd,
  },
  fontBold: {
    fontWeight: FontWeight.bold,
  },
  fontButton: {
    fontSize: Sizes.xs,
  },
  itemBorder: {
    borderBottomColor: Colors.disabled,
    borderBottomWidth: 1,
    paddingBottom: Margins.smaller,
    paddingTop: Margins.smallest,
  },
});

export default EpdsResultContactParagraph;
