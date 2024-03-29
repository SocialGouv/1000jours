import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet, Text } from "react-native";

import { Labels } from "../../../../constants";
import { TIMEOUT_FOCUS } from "../../../../constants/accessibility.constants";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
  Paddings,
  Sizes,
} from "../../../../styles";
import type {
  EpdsResultContactInformation,
  TrackerEvent,
} from "../../../../type";
import { LinkingUtils, TrackerUtils } from "../../../../utils";
import { setAccessibilityFocusOnText } from "../../../../utils/accessibility/accessibility.util";
import { CustomButton, SecondaryText, View } from "../../../baseComponents";
import TrackerHandler from "../../../tracker/trackerHandler.component";

interface EpdsResultContactParagraphProps {
  paragraphTitle?: string;
  contacts: EpdsResultContactInformation[];
  isFocusOnFirstElement: boolean;
}

const EpdsResultContactParagraph: React.FC<EpdsResultContactParagraphProps> = ({
  paragraphTitle,
  contacts,
  isFocusOnFirstElement,
}) => {
  const titleStyle = [styles.contactName, { fontSize: Sizes.sm }];
  const titleRef = React.useRef<Text>(null);
  const [trackerEventObject, setTrackerEventObject] = useState<TrackerEvent>();

  if (isFocusOnFirstElement) {
    setTimeout(() => {
      setAccessibilityFocusOnText(titleRef);
    }, TIMEOUT_FOCUS);
  }

  const onCallButtonPressed = useCallback(
    (phoneNumber: string, phoneName: string) => async () => {
      await LinkingUtils.callContact(phoneNumber);
      setTrackerEventObject({
        action: TrackerUtils.TrackingEvent.RESSOURCES,
        name: `appeler_${phoneName}`,
      });
    },
    []
  );

  return (
    <View style={styles.itemBorder}>
      <TrackerHandler eventObject={trackerEventObject} />
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
          <CustomButton
            buttonStyle={styles.callButton}
            title={Labels.epdsSurvey.resultats.call}
            titleStyle={styles.fontButton}
            rounded={true}
            disabled={false}
            action={onCallButtonPressed(
              contact.phoneNumber,
              contact.contactName
            )}
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
