import * as React from "react";
import { StyleSheet } from "react-native";

import Button from "../../../components/base/button.component";
import { CommonText } from "../../../components/StyledText";
import { View } from "../../../components/Themed";
import { Colors, FontWeight, Labels, Margins, Sizes } from "../../../constants";
import type { EpdsResultContactInformation } from "../../../type";
import { LinkingUtils } from "../../../utils";

interface EpdsResultContactParagraphProps {
  paragraphTitle?: string;
  contacts: EpdsResultContactInformation[];
  titleColor: string;
}

const EpdsResultContactParagraph: React.FC<EpdsResultContactParagraphProps> = ({
  paragraphTitle,
  contacts,
  titleColor,
}) => {
  const titleColorStyle = { color: titleColor };

  const titleStyle = [styles.contactName, { fontSize: Sizes.xs }];
  return (
    <View style={styles.itemBorder}>
      {paragraphTitle && paragraphTitle.length > 0 && (
        <CommonText style={titleStyle}>{paragraphTitle}</CommonText>
      )}
      {contacts.map((contact, index) => (
        <View
          style={index !== contacts.length - 1 && styles.itemBorder}
          key={index}
        >
          <CommonText style={[styles.contactName, titleColorStyle]}>
            {contact.contactName}
          </CommonText>
          <CommonText style={styles.contactDescription}>
            {contact.thematic}
          </CommonText>
          <CommonText style={[styles.contactDescription, styles.fontBold]}>
            {contact.openingTime}
          </CommonText>
          <CommonText style={[styles.contactDescription, styles.fontBold]}>
            {contact.phoneNumber}
          </CommonText>
          <Button
            buttonStyle={styles.callButton}
            title={Labels.epdsSurvey.resultats.call}
            titleStyle={styles.fontButton}
            rounded={true}
            disabled={false}
            action={async () => {
              await LinkingUtils.callContact(contact.phoneNumber);
            }}
          />
        </View>
      ))}
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
  contactName: {
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
