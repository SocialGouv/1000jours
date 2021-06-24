import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { SecondaryText } from "../../../components/StyledText";
import { View } from "../../../components/Themed";
import {
  Colors,
  FontWeight,
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
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default EpdsResultSimpleParagraph;
