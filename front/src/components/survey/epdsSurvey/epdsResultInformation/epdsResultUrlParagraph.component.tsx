import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { TIMEOUT_FOCUS } from "../../../../constants/accessibility.constants";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
  Sizes,
} from "../../../../styles";
import type { TrackerEvent } from "../../../../type";
import { LinkingUtils, TrackerUtils } from "../../../../utils";
import { setAccessibilityFocusOnText } from "../../../../utils/accessibility/accessibility.util";
import { SecondaryText, View } from "../../../baseComponents";
import TrackerHandler from "../../../tracker/trackerHandler.component";

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
  const [trackerEventObject, setTrackerEventObject] = useState<TrackerEvent>();

  if (isFocusOnFirstElement) {
    setTimeout(() => {
      setAccessibilityFocusOnText(titleRef);
    }, TIMEOUT_FOCUS);
  }

  const onUrlParagraphPressed = useCallback(
    (url: string) => async () => {
      await LinkingUtils.openWebsite(url);
      setTrackerEventObject({
        action: TrackerUtils.TrackingEvent.RESSOURCES,
        name: url,
      });
    },
    []
  );

  return (
    <View style={styles.itemBorder}>
      <TrackerHandler eventObject={trackerEventObject} />
      {paragraphTitle && paragraphTitle.length > 0 && (
        <Text style={styles.paragraphTitle} ref={titleRef}>
          {paragraphTitle}
        </Text>
      )}
      {urls.map((url, index) => (
        <TouchableOpacity
          key={index}
          onPress={onUrlParagraphPressed(url)}
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
