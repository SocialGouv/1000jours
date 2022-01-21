import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import * as React from "react";
import { Linking, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

import {
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../constants";
import type { Document } from "../../types";
import { TrackerUtils } from "../../utils";
import { reportError } from "../../utils/logging.util";
import { Button, IcomoonIcons, View } from "..";
import { CommonText, SecondaryText } from "../StyledText";
import StepIconLibrary from "../timeline/stepIconLibrary.component";

interface Props {
  document: Document;
}

function openFile(url: string) {
  Linking.openURL(url).catch((err: unknown) => {
    reportError(err);
  });
}

const DocumentCard: FC<Props> = ({ document }) => {
  const { trackScreenView } = useMatomo();

  return (
    <ListItem
      bottomDivider
      pad={0}
      containerStyle={[styles.listItemContainer, styles.borderLeftRadius]}
      style={[styles.listItem, styles.borderLeftRadius]}
    >
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
          <Button
            title={Labels.timeline.library.download}
            titleStyle={styles.fontButton}
            rounded={true}
            disabled={false}
            action={() => {
              trackScreenView(
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
