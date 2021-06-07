import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { CommonText } from "../../../components/StyledText";
import { View } from "../../../components/Themed";
import { Colors, FontWeight, Margins, Sizes } from "../../../constants";
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
        <CommonText style={styles.paragraphTitle}>{paragraph.title}</CommonText>
      )}
      {paragraph.description && (
        <CommonText style={styles.paragraphDescription}>
          {paragraph.description}
        </CommonText>
      )}
      {paragraph.pdfUrl && (
        <TouchableOpacity
          onPress={async () => LinkingUtils.openWebsite(paragraph.pdfUrl)}
        >
          <CommonText style={[styles.pdfUrl, styles.underline]}>
            ({paragraph.pdfUrl})
          </CommonText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: Sizes.xs,
    fontWeight: FontWeight.bold,
    lineHeight: Sizes.mmd,
  },
  pdfUrl: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xxs,
    lineHeight: Sizes.mmd,
  },
  underline: { textDecorationLine: "underline" },
});

export default EpdsResultSimpleParagraph;
