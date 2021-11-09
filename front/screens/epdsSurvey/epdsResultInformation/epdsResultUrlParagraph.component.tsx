import * as React from "react";
import {
  AccessibilityInfo,
  findNodeHandle,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { SecondaryText } from "../../../components/StyledText";
import { View } from "../../../components/Themed";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
  Sizes,
} from "../../../constants";
import { LinkingUtils } from "../../../utils";

interface EpdsResultUrlParagraphProps {
  paragraphTitle?: string;
  urls: string[];
  isFocusOnFirstElement: boolean;
}

const EpdsResultUrlParagraph: React.FC<EpdsResultUrlParagraphProps> = ({
  paragraphTitle,
  urls,
  isFocusOnFirstElement,
}) => {
  const titleRef = React.useRef<Text>(null);
  const setAccessibilityFocus = () => {
    if (titleRef.current) {
      const reactTag = findNodeHandle(titleRef.current);
      if (reactTag) {
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    }
  };

  if (isFocusOnFirstElement) {
    setTimeout(() => {
      setAccessibilityFocus();
    }, 300);
  }

  return (
    <View style={styles.itemBorder}>
      {paragraphTitle && paragraphTitle.length > 0 && (
        <Text style={styles.paragraphTitle} ref={titleRef}>
          {paragraphTitle}
        </Text>
      )}
      {urls.map((url, index) => (
        <TouchableOpacity
          key={index}
          onPress={async () => LinkingUtils.openWebsite(url)}
          accessibilityRole="link"
        >
          <SecondaryText style={[styles.urls, styles.underline]}>
            {url}
          </SecondaryText>
        </TouchableOpacity>
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
    marginVertical: Margins.smaller,
  },
  paragraphTitle: {
    color: Colors.commonText,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.bold),
    fontSize: Sizes.sm,
    fontWeight: FontWeight.bold,
    lineHeight: Sizes.mmd,
  },
  underline: { textDecorationLine: "underline" },
  urls: {
    color: Colors.primaryBlue,
    fontSize: Sizes.sm,
    lineHeight: Sizes.lg,
  },
});

export default EpdsResultUrlParagraph;
