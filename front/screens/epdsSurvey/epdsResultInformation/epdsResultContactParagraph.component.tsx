import * as React from "react";
import { StyleSheet } from "react-native";

import Button from "../../../components/base/button.component";
import { SecondaryText } from "../../../components/StyledText";
import { View } from "../../../components/Themed";
import {
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../../constants";
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

  const titleStyle = [styles.contactName, { fontSize: Sizes.sm }];
  return (
    <View style={styles.itemBorder}>
      {paragraphTitle && paragraphTitle.length > 0 && (
        <SecondaryText style={titleStyle}>{paragraphTitle}</SecondaryText>
      )}
      {contacts.map((contact, index) => (
        <View
          style={index !== contacts.length - 1 && styles.itemBorder}
          key={index}
        >
          <SecondaryText style={[styles.contactName, titleColorStyle]}>
            {contact.contactName}
          </SecondaryText>
          <SecondaryText style={styles.contactDescription}>
            {contact.thematic}
          </SecondaryText>
          <SecondaryText style={[styles.contactDescription, styles.fontBold]}>
            {contact.openingTime}
          </SecondaryText>
          <SecondaryText style={[styles.contactDescription, styles.fontBold]}>
            {contact.phoneNumber}
          </SecondaryText>
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
    fontSize: Sizes.sm,
    lineHeight: Sizes.mmd,
    marginVertical: Margins.smallest,
  },
  contactName: {
    color: Colors.commonText,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.bold,
    lineHeight: Sizes.mmd,
  },
  fontBold: {
    fontWeight: FontWeight.bold,
  },
  fontButton: {
    fontSize: Sizes.xs,
    textTransform: "uppercase",
  },
  itemBorder: {
    borderBottomColor: Colors.disabled,
    borderBottomWidth: 1,
    paddingHorizontal: Paddings.smaller,
    paddingVertical: Paddings.default,
  },
});

export default EpdsResultContactParagraph;
