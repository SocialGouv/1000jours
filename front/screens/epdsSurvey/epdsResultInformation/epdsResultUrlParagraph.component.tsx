import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { SecondaryText } from "../../../components/StyledText";
import { View } from "../../../components/Themed";
import { Colors, FontWeight, Margins, Sizes } from "../../../constants";
import { LinkingUtils } from "../../../utils";

interface EpdsResultUrlParagraphProps {
  paragraphTitle?: string;
  urls: string[];
}

const EpdsResultUrlParagraph: React.FC<EpdsResultUrlParagraphProps> = ({
  paragraphTitle,
  urls,
}) => {
  return (
    <View style={styles.itemBorder}>
      {paragraphTitle && paragraphTitle.length > 0 && (
        <SecondaryText style={styles.paragraphTitle}>
          {paragraphTitle}
        </SecondaryText>
      )}
      {urls.map((url, index) => (
        <View key={index}>
          <TouchableOpacity onPress={async () => LinkingUtils.openWebsite(url)}>
            <SecondaryText style={[styles.urls, styles.underline]}>
              {url}
            </SecondaryText>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  callButton: {
    alignSelf: "flex-end",
  },
  itemBorder: {
    borderBottomColor: Colors.disabled,
    borderBottomWidth: 1,
    padding: Margins.smaller,
  },
  paragraphTitle: {
    color: Colors.commonText,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.bold,
    lineHeight: Sizes.mmd,
  },
  underline: { textDecorationLine: "underline" },
  urls: {
    color: Colors.primaryBlue,
    fontSize: Sizes.sm,
    lineHeight: Sizes.mmd,
  },
});

export default EpdsResultUrlParagraph;
