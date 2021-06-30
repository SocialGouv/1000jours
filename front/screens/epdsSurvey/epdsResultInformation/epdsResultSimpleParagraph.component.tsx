import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Button } from "../../../components";
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
import type { EpdsResultSimpleInformation } from "../../../type";
import { LinkingUtils } from "../../../utils";

interface EpdsResultSimpleParagraphProps {
  paragraph: EpdsResultSimpleInformation;
}

const EpdsResultSimpleParagraph: React.FC<EpdsResultSimpleParagraphProps> = ({
  paragraph,
}) => {
  return (
    <View style={styles.itemBorder}>
      {paragraph.title && (
        <SecondaryText style={styles.paragraphTitle}>
          {paragraph.title}
        </SecondaryText>
      )}
      {paragraph.description && (
        <SecondaryText style={styles.paragraphDescription}>
          {paragraph.description}
        </SecondaryText>
      )}
      {paragraph.pdfUrl && (
        <TouchableOpacity
          onPress={async () => LinkingUtils.openWebsite(paragraph.pdfUrl)}
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
    marginLeft: -Margins.epdsResultLeftMargin,
    marginRight: Margins.smaller,
    paddingVertical: Paddings.smaller,
  },
  paragraphDescription: {
    color: Colors.commonText,
    fontSize: Sizes.sm,
    lineHeight: Sizes.mmd,
  },
  paragraphTitle: {
    color: Colors.commonText,
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
