import * as React from "react";
import { Linking, StyleSheet, TouchableOpacity } from "react-native";

import { CommonText } from "../../../components/StyledText";
import { View } from "../../../components/Themed";
import { Colors, FontWeight, Margins, Sizes } from "../../../constants";

interface EpdsResultUrlParagraphProps {
  urlsTitle?: string;
  urls: string[];
}

const EpdsResultUrlParagraph: React.FC<EpdsResultUrlParagraphProps> = ({
  urlsTitle,
  urls,
}) => {
  const titleStyle = [styles.urlsTitle, { fontSize: Sizes.xs }];
  return (
    <View style={styles.itemBorder}>
      {urlsTitle && urlsTitle.length > 0 && (
        <CommonText style={titleStyle}>{urlsTitle}</CommonText>
      )}
      {urls.map((url, index) => (
        <View key={index}>
          <TouchableOpacity
            onPress={async () => Linking.openURL(`http://www.${url}`)}
          >
            <CommonText style={[styles.urlDescription, styles.underline]}>
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
  underline: { textDecorationLine: "underline" },
  urlDescription: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xxs,
    lineHeight: Sizes.mmd,
  },
  urlsTitle: {
    color: Colors.commonText,
    fontSize: Sizes.xxs,
    fontWeight: FontWeight.bold,
    lineHeight: Sizes.mmd,
  },
});

export default EpdsResultUrlParagraph;
