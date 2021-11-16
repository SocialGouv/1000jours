import * as React from "react";
import { StyleSheet, Text } from "react-native";

import Button from "../../../components/base/button.component";
import { SecondaryText } from "../../../components/StyledText";
import { View } from "../../../components/Themed";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../../constants";
import type { EpdsResultContactInformation } from "../../../type";
import { LinkingUtils } from "../../../utils";
import { setAccessibilityFocusOnText } from "../../../utils/accessibility.util";
import { TIMEOUT_FOCUS } from "./epdsResultInformation.component";

interface EpdsResultContactParagraphProps {
  paragraphTitle?: string;
  contacts: EpdsResultContactInformation[];
  titleColor: string;
  isFocusOnFirstElement: boolean;
}

const EpdsResultContactParagraph: React.FC<EpdsResultContactParagraphProps> = ({
  paragraphTitle,
  contacts,
  titleColor,
  isFocusOnFirstElement,
}) => {
  const titleColorStyle = { color: titleColor };
  const titleStyle = [styles.contactName, { fontSize: Sizes.sm }];
  const titleRef = React.useRef<Text>(null);

  if (isFocusOnFirstElement) {
    setTimeout(() => {
      setAccessibilityFocusOnText(titleRef);
    }, TIMEOUT_FOCUS);
  }

  return (
    <View style={styles.itemBorder}>
      {paragraphTitle && paragraphTitle.length > 0 && (
        <Text style={titleStyle} ref={titleRef}>
          {paragraphTitle}
        </Text>
      )}
      {contacts.map((contact, index) => (
        <View
          style={[
            index !== contacts.length - 1 && styles.itemBorder,
            styles.paddingVertical,
          ]}
          key={index}
        >
          {/* Utiliser la ligne ci-dessous pour afficher le nom du contact en couleur selon le résultat EPDS */}
          {/* <SecondaryText style={[styles.contactName, titleColorStyle]}> */}
          <SecondaryText style={styles.contactName} accessibilityRole="header">
            {contact.contactName}
          </SecondaryText>
          <SecondaryText style={styles.contactDescription}>
            {contact.thematic}
          </SecondaryText>
          <SecondaryText style={[styles.contactDescription, styles.fontBold]}>
            {contact.openingTime}
          </SecondaryText>
          <SecondaryText
            style={[styles.contactDescription, styles.fontBold]}
            accessibilityLabel={contact.phoneNumberVoice}
          >
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
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.bold),
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
    paddingRight: Paddings.smaller,
    paddingVertical: Paddings.smaller,
  },
  paddingVertical: {
    paddingVertical: Paddings.default,
  },
});

export default EpdsResultContactParagraph;
