import * as React from "react";
import { useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Share, StyleSheet } from "react-native";

import { Labels } from "../../constants";
import { deepLinkUrl } from "../../constants/links.constants";
import { PLATFORM_IS_ANDROID } from "../../constants/platform.constants";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
  Paddings,
  Sizes,
} from "../../styles";
import TrackerHandler from "../tracker/trackerHandler.component";
import CustomButton from "./customButton.component";
import Icomoon, { IcomoonIcons } from "./icomoon.component";

export enum SharePageType {
  article = "article",
  event = "event",
}

interface Props {
  buttonTitle: string;
  title: string;
  message: string;
  page: SharePageType;
  id: number | string;
  buttonStyle?: StyleProp<ViewStyle>;
}

const ShareButton: React.FC<Props> = ({
  buttonTitle,
  title,
  message,
  page,
  id,
  buttonStyle,
}) => {
  const [trackerEventName, setTrackerEventName] = useState("");
  const [trackerEventAction, setTrackerEventAction] = useState("");

  const share = async () => {
    try {
      const url = `${deepLinkUrl}?page=${page}&id=${id}`;
      message += ` ${Labels.toAccessCickHere}`;

      // Le paramètre url (Share) ne fonctionne que sur iOS
      // Nous le rajoutons directement dans le message sous format texte.
      if (PLATFORM_IS_ANDROID) {
        message += url;
      }

      const result = await Share.share(
        { message, title, url },
        { subject: title }
      );
      if (result.action === Share.sharedAction) {
        setTrackerEventName(`${page} : ${id}`);
        setTrackerEventAction("Share");
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <>
      <TrackerHandler
        eventName={trackerEventName}
        eventAction={trackerEventAction}
      />
      <CustomButton
        title={buttonTitle}
        icon={
          <Icomoon
            name={IcomoonIcons.partager}
            size={Sizes.md}
            color={Colors.primaryBlue}
          />
        }
        rounded={true}
        disabled={false}
        action={share}
        titleStyle={styles.buttonTitleStyle}
        buttonStyle={[styles.defaultButtonStyle, buttonStyle]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonTitleStyle: {
    color: Colors.primaryBlue,
    fontFamily: getFontFamilyName(FontNames.comfortaa, FontWeight.bold),
    fontSize: Sizes.xs,
    textAlign: "left",
  },
  defaultButtonStyle: {
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    marginBottom: Margins.default,
    paddingBottom: Paddings.smaller,
  },
});

export default ShareButton;
