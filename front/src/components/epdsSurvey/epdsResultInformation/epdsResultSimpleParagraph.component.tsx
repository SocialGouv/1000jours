import * as React from "react";
import { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Labels } from "../../../constants";
import { TIMEOUT_FOCUS } from "../../../constants/accessibility.constants";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
  Paddings,
  Sizes,
} from "../../../styles";
import type { EpdsResultSimpleInformation } from "../../../type";
import { LinkingUtils } from "../../../utils";
import { setAccessibilityFocusOnText } from "../../../utils/accessibility.util";
import { CustomButton, SecondaryText, View } from "../../baseComponents";

interface EpdsResultSimpleParagraphProps {
  paragraph: EpdsResultSimpleInformation;
  isFocusOnFirstElement: boolean;
}

const EpdsResultSimpleParagraph: React.FC<EpdsResultSimpleParagraphProps> = ({
  paragraph,
  isFocusOnFirstElement,
}) => {
  const titleRef = React.useRef<Text>(null);

  if (isFocusOnFirstElement) {
    setTimeout(() => {
      setAccessibilityFocusOnText(titleRef);
    }, TIMEOUT_FOCUS);
  }

  const onPdfUrlButtonPressed = useCallback(
    (pdfUrl: string) => async () => LinkingUtils.openWebsite(pdfUrl),
    []
  );

  const onContactButtonPressed = useCallback(
    async () =>
      LinkingUtils.sendEmail(
        Labels.epdsSurvey.mailContact,
        Labels.epdsSurvey.mailSubject
      ),
    []
  );
  return (
    <View style={styles.itemBorder}>
      {paragraph.title && (
        <Text
          style={styles.paragraphTitle}
          accessibilityRole="header"
          ref={titleRef}
        >
          {paragraph.title}
        </Text>
      )}
      {paragraph.description && (
        <SecondaryText style={styles.paragraphDescription}>
          {paragraph.description}
        </SecondaryText>
      )}
      {paragraph.pdfUrl && (
        <TouchableOpacity
          onPress={onPdfUrlButtonPressed(paragraph.pdfUrl)}
          accessibilityRole="link"
        >
          <SecondaryText style={[styles.pdfUrl, styles.underline]}>
            ({paragraph.pdfUrl})
          </SecondaryText>
        </TouchableOpacity>
      )}
      {paragraph.title === "Contacter" && (
        <View style={styles.validateButton}>
          <CustomButton
            title={Labels.buttons.contact}
            titleStyle={styles.fontButton}
            rounded={true}
            disabled={false}
            action={onContactButtonPressed}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fontButton: {
    fontSize: Sizes.xs,
    textTransform: "uppercase",
  },
  itemBorder: {
    borderBottomColor: Colors.disabled,
    borderBottomWidth: 1,
    paddingVertical: Paddings.smaller,
  },
  paragraphDescription: {
    color: Colors.commonText,
    fontSize: Sizes.sm,
    lineHeight: Sizes.mmd,
  },
  paragraphTitle: {
    color: Colors.commonText,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.bold),
    fontSize: Sizes.sm,
    fontWeight: FontWeight.bold,
    lineHeight: Sizes.mmd,
  },
  pdfUrl: {
    color: Colors.primaryBlue,
    fontSize: Sizes.sm,
    lineHeight: Sizes.mmd,
  },
  underline: { textDecorationLine: "underline" },
  validateButton: {
    alignItems: "center",
    marginBottom: Margins.smallest,
    marginTop: Margins.default,
  },
});

export default EpdsResultSimpleParagraph;
