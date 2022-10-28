import type { FC } from "react";
import { useCallback, useState } from "react";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Image, ListItem } from "react-native-elements";

import { Labels } from "../../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../../styles";
import type { Video } from "../../../types";
import { LinkingUtils, TrackerUtils } from "../../../utils";
import {
  CommonText,
  CustomButton,
  IcomoonIcons,
  IconWithBackground,
  SecondaryText,
} from "../../baseComponents";
import TrackerHandler from "../../tracker/trackerHandler.component";

interface Props {
  video: Video;
}

const VideoCard: FC<Props> = ({ video }) => {
  const [trackerAction, setTrackerAction] = useState("");

  const onSeeVideoButtonPressed = useCallback(() => {
    setTrackerAction(
      `${TrackerUtils.TrackingEvent.PARENTHEQUE} - Visualisation de la vidéo "${video.nom}"`
    );
    void LinkingUtils.openWebsite(video.url, false);
  }, [video.nom, video.url]);

  return (
    <ListItem
      bottomDivider
      pad={0}
      containerStyle={[styles.listItemContainer, styles.borderLeftRadius]}
      style={[styles.listItem, styles.borderLeftRadius]}
    >
      <TrackerHandler actionName={trackerAction} />
      <View
        style={styles.videoImage}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        accessible={false}
      >
        <IconWithBackground iconName={IcomoonIcons.video} />
      </View>
      <ListItem.Content style={styles.videoContent}>
        <ListItem.Title style={styles.videoTitleContainer}>
          <CommonText style={styles.videoTitle}>{video.nom}</CommonText>
        </ListItem.Title>
        <ListItem.Subtitle style={styles.videoDescription}>
          <SecondaryText
            style={styles.videoDescriptionFont}
            numberOfLines={3}
            allowFontScaling
          >
            {video.description}
          </SecondaryText>
        </ListItem.Subtitle>
        <Image
          source={{ uri: video.miniature?.url }}
          containerStyle={styles.videoMiniature}
        />
        <View style={styles.contentButton}>
          <CustomButton
            title={Labels.parentheque.video}
            accessibilityLabel={Labels.parentheque.video + video.nom}
            titleStyle={styles.fontButton}
            rounded
            disabled={false}
            action={onSeeVideoButtonPressed}
          />
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  borderLeftRadius: {
    borderBottomLeftRadius: Sizes.xxxxxs,
    borderTopLeftRadius: Sizes.xxxxxs,
  },
  contentButton: {
    alignSelf: "flex-end",
    marginTop: Margins.smaller,
  },
  fontButton: {
    fontSize: Sizes.xxs,
    textTransform: "uppercase",
  },
  listItem: {
    marginVertical: Margins.smallest,
  },
  listItemContainer: {
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    padding: 0,
  },
  titleRow: {
    flex: 1,
    flexDirection: "row",
    marginStart: 0,
  },
  videoContent: {
    justifyContent: "center",
    paddingEnd: Paddings.default,
    paddingVertical: Paddings.default,
  },
  videoDescription: {
    color: Colors.commonText,
    marginBottom: Margins.smallest,
  },
  videoDescriptionFont: {
    color: Colors.commonText,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.medium,
    lineHeight: Sizes.lg,
  },
  videoImage: {
    alignSelf: "flex-start",
    marginStart: Margins.smaller,
  },
  videoMiniature: {
    height: 150,
    width: "100%",
  },
  videoTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.md,
    fontWeight: FontWeight.bold,
  },
  videoTitleContainer: {
    paddingBottom: Paddings.light,
  },
});

export default VideoCard;
