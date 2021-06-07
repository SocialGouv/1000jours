import * as React from "react";
import { Linking, StyleSheet, TouchableOpacity } from "react-native";

import { CommonText } from "../../../components/StyledText";
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
  const titleStyle = [styles.paragraphTitle, { fontSize: Sizes.xs }];
  return (
    <View style={styles.itemBorder}>
      {paragraphTitle && paragraphTitle.length > 0 && (
        <CommonText style={titleStyle}>{paragraphTitle}</CommonText>
      )}
      {urls.map((url, index) => (
        <View key={index}>
          <TouchableOpacity onPress={async () => LinkingUtils.openWebsite(url)}>
            <CommonText style={[styles.urls, styles.underline]}>
              {url}
            </CommonText>
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
    paddingBottom: Margins.smaller,
    paddingTop: Margins.smallest,
  },
  paragraphTitle: {
    color: Colors.commonText,
    fontSize: Sizes.xxs,
    fontWeight: FontWeight.bold,
    lineHeight: Sizes.mmd,
  },
  underline: { textDecorationLine: "underline" },
  urls: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xxs,
    lineHeight: Sizes.mmd,
  },
});

export default EpdsResultUrlParagraph;
