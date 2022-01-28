import type { FC } from "react";
import { useState } from "react";
import * as React from "react";
import { Linking, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

import { Labels } from "../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type { Document } from "../../types";
import { TrackerUtils } from "../../utils";
import { reportError } from "../../utils/logging.util";
import {
  CommonText,
  CustomButton,
  IcomoonIcons,
  SecondaryText,
  View,
} from "../baseComponents";
import StepIconLibrary from "../timeline/stepIconLibrary.component";
import TrackerHandler from "../tracker/trackerHandler.component";

interface Props {
  document: Document;
}

function openFile(url: string) {
  Linking.openURL(url).catch((err: unknown) => {
    reportError(err);
  });
}

const DocumentCard: FC<Props> = ({ document }) => {
  const [trackerAction, setTrackerAction] = useState("");

  return (
    <ListItem
      bottomDivider
      pad={0}
      containerStyle={[styles.listItemContainer, styles.borderLeftRadius]}
      style={[styles.listItem, styles.borderLeftRadius]}
    >
      <TrackerHandler actionName={trackerAction} />
      <View style={styles.documentImage}>
        <StepIconLibrary name={IcomoonIcons.stepParentheque} />
      </View>
      <ListItem.Content style={styles.documentContent}>
        <ListItem.Title style={styles.documentTitleContainer}>
          <CommonText style={styles.documentTitle}>{document.nom}</CommonText>
        </ListItem.Title>
        <ListItem.Subtitle style={styles.documentDescription}>
          <SecondaryText
            style={styles.documentDescriptionFont}
            numberOfLines={3}
            allowFontScaling={true}
          >
            {document.description}
          </SecondaryText>
        </ListItem.Subtitle>
        <View style={styles.contentButton}>
          <CustomButton
            title={Labels.timeline.library.download}
            titleStyle={styles.fontButton}
            rounded={true}
            disabled={false}
            action={() => {
              setTrackerAction(
                `${TrackerUtils.TrackingEvent.PARENTHEQUE} - Téléchargement du doc "${document.nom}"`
              );
              openFile(document.fichier.url);
            }}
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
  documentContent: {
    justifyContent: "center",
    padding: Paddings.default,
  },
  documentDescription: {
    color: Colors.commonText,
  },
  documentDescriptionFont: {
    color: Colors.commonText,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.medium,
    lineHeight: Sizes.lg,
  },
  documentImage: {
    marginStart: Margins.smaller,
  },
  documentTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.md,
    fontWeight: FontWeight.bold,
  },
  documentTitleContainer: {
    paddingBottom: Paddings.light,
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
});

export default DocumentCard;
