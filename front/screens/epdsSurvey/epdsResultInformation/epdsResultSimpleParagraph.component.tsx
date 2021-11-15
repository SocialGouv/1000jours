import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Button } from "../../../components";
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
import type { EpdsResultSimpleInformation } from "../../../type";
import { LinkingUtils } from "../../../utils";
import { setAccessibilityFocusOnText } from "../../../utils/accessibility.util";

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
    }, 300);
  }

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
          onPress={async () => LinkingUtils.openWebsite(paragraph.pdfUrl)}
          accessibilityRole="link"
        >
          <SecondaryText style={[styles.pdfUrl, styles.underline]}>
            ({paragraph.pdfUrl})
          </SecondaryText>
        </TouchableOpacity>
      )}
      {paragraph.title === "Contacter" && (
        <View style={styles.validateButton}>
          <Button
            title={Labels.buttons.contact}
            titleStyle={styles.fontButton}
            rounded={true}
            disabled={false}
            action={async () =>
              LinkingUtils.sendEmail(
                Labels.epdsSurvey.mailContact,
                Labels.epdsSurvey.mailSubject
              )
            }
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
