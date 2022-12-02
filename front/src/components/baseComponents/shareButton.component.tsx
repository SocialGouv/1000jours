import * as React from "react";
import { useCallback, useRef, useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";

import { Labels, Links } from "../../constants";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
  Paddings,
  Sizes,
} from "../../styles";
import type { TrackerEvent } from "../../type";
import { ShareUtils, TrackerUtils } from "../../utils";
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
  const [trackerEventObject, setTrackerEventObject] = useState<TrackerEvent>();
  const messageRef = useRef(message);

  const share = useCallback(() => {
    const url = `${Links.deepLinkUrl}?page=${page}&id=${id}`;
    messageRef.current += ` ${Labels.toAccessClickHere}`;

    void ShareUtils.share(title, messageRef.current, url, () => {
      setTrackerEventObject({
        action: TrackerUtils.TrackingEvent.SHARE,
        name: `${page} : ${id}`,
      });
    });
  }, [id, page, title]);

  return (
    <>
      <TrackerHandler eventObject={trackerEventObject} />
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
