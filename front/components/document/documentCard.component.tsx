import * as FileSystem from "expo-file-system";
import type { FC } from "react";
import * as React from "react";
import { PermissionsAndroid, Platform, StyleSheet } from "react-native";
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
import { Button, IcomoonIcons } from "..";
import { CommonText, SecondaryText } from "../StyledText";
import StepIconLibrary from "../timeline/stepIconLibrary.component";

interface Props {
  document: Document;
}

function checkPermission(url: string) {
  if (Platform.OS === "ios") {
    downloadFile(url);
  } else {
    try {
      void PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ).then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Storage Permission Granted.");
          downloadFile(url);
        } else {
          console.warn("Storage Permission Not Granted");
        }
      });
    } catch (err: unknown) {
      console.log("error", err);
    }
  }
}

function downloadFile(url: string) {
  // Downloading the file
  const fileLocation = `${FileSystem.documentDirectory}test.png`;
  FileSystem.downloadAsync(url, fileLocation)
    .then(({ uri }) => {
      console.log("OK : " + uri);
      //FileSystem.readDirectoryAsync(fileLocation);
    })
    .catch((error) => {
      console.error(error);
    });
}

const DocumentCard: FC<Props> = ({ document }) => {
  return (
    <ListItem
      bottomDivider
      pad={0}
      containerStyle={[styles.listItemContainer, styles.borderLeftRadius]}
      style={[styles.listItem, styles.borderLeftRadius]}
    >
      <StepIconLibrary name={IcomoonIcons.stepParentheque} />

      <ListItem.Content style={styles.articleContent}>
        <ListItem.Title style={styles.articleTitleContainer}>
          <CommonText style={styles.articleTitle}>{document.nom}</CommonText>
        </ListItem.Title>
        <ListItem.Subtitle style={styles.articleDescription}>
          <SecondaryText
            style={styles.articleDescriptionFont}
            numberOfLines={3}
            allowFontScaling={true}
          >
            {document.description}
          </SecondaryText>
        </ListItem.Subtitle>
      </ListItem.Content>

      <Button
        title={Labels.timeline.library.download}
        titleStyle={styles.fontButton}
        rounded={true}
        disabled={false}
        action={() => {
          checkPermission(document.fichier.url);
        }}
      />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  articleContent: {
    justifyContent: "center",
    padding: Paddings.default,
  },
  articleDescription: {
    color: Colors.commonText,
  },
  articleDescriptionFont: {
    color: Colors.commonText,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.medium,
    lineHeight: Sizes.lg,
  },
  articleImage: {
    height: "100%",
    resizeMode: "contain",
    width: Sizes.thumbnail,
  },
  articleTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.md,
    fontWeight: FontWeight.bold,
  },
  articleTitleContainer: {
    paddingBottom: Paddings.light,
  },
  borderLeftRadius: {
    borderBottomLeftRadius: Sizes.xxxxxs,
    borderTopLeftRadius: Sizes.xxxxxs,
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
