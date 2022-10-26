import type { FC } from "react";
import { useCallback, useState } from "react";
import * as React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

import BgImage from "../../assets/images/bg-icon-event-type.png";
import { Labels } from "../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type { Document } from "../../types";
import { LinkingUtils, TrackerUtils } from "../../utils";
import {
  CommonText,
  CustomButton,
  Icomoon,
  IcomoonIcons,
  SecondaryText,
  View,
} from "../baseComponents";
import TrackerHandler from "../tracker/trackerHandler.component";

interface Props {
  document: Document;
}

const DocumentCard: FC<Props> = ({ document }) => {
  const [trackerAction, setTrackerAction] = useState("");

  const onDownloadButtonPressed = useCallback(() => {
    setTrackerAction(
      `${TrackerUtils.TrackingEvent.PARENTHEQUE} - Téléchargement du doc "${document.nom}"`
    );
    if (document.fichier)
      void LinkingUtils.openWebsite(document.fichier.url, false);
  }, [document.fichier, document.nom]);

  return (
    <ListItem
      bottomDivider
      pad={0}
      containerStyle={[styles.listItemContainer, styles.borderLeftRadius]}
      style={[styles.listItem, styles.borderLeftRadius]}
    >
      <TrackerHandler actionName={trackerAction} />
      <View
        style={styles.documentImage}
        accessibilityElementsHidden={true}
        importantForAccessibility="no-hide-descendants"
        accessible={false}
      >
        <ImageBackground
          source={BgImage}
          imageStyle={styles.parenthequeIcon}
          style={styles.parenthequeIconBackground}
        >
          <Icomoon
            name={IcomoonIcons.stepParentheque}
            size={Sizes.xxxl}
            color={Colors.primaryBlue}
          />
        </ImageBackground>
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
            title={Labels.parentheque.download}
            accessibilityLabel={Labels.parentheque.download + document.nom}
            titleStyle={styles.fontButton}
            rounded={true}
            disabled={false}
            action={onDownloadButtonPressed}
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
    paddingEnd: Paddings.default,
    paddingVertical: Paddings.default,
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
    alignSelf: "flex-start",
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
  parenthequeIcon: {
    marginBottom: Margins.smaller,
    marginStart: Margins.smallest,
    resizeMode: "contain",
  },
  parenthequeIconBackground: {
    alignItems: "center",
    backgroundColor: "transparent",
    height: Sizes.xxxxl + Paddings.default,
    justifyContent: "center",
    marginEnd: Margins.default,
    paddingTop: Margins.light,
    width: Sizes.xxxxl + Paddings.light,
  },
  titleRow: {
    flex: 1,
    flexDirection: "row",
    marginStart: 0,
  },
});

export default DocumentCard;
