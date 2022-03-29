import type { FC } from "react";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { Labels } from "../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type { TrackerEvent } from "../../type";
import { TrackerUtils } from "../../utils";
import {
  CustomButton,
  Icomoon,
  IcomoonIcons,
  SecondaryText,
  View,
} from "../baseComponents";
import TrackerHandler from "../tracker/trackerHandler.component";

interface Props {
  articleName: string;
}

const UsefulArticle: FC<Props> = ({ articleName }) => {
  const [trackerEventObject, setTrackerEventObject] = useState<TrackerEvent>();
  const [isUsefulArticle, setUsefulArticle] = useState<number>();
  const [isButtonsDisabled, setButtonsDisabled] = useState<boolean>(false);

  useEffect(() => {
    // La valeur est 1 si l'article a été jugé utile, et 0 s'il ne l'a pas été
    if (isUsefulArticle !== undefined) {
      setTrackerEventObject({
        action: "UsefulArticle",
        name: `${TrackerUtils.TrackingEvent.ARTICLE} : ${articleName}`,
        value: isUsefulArticle,
      });
      setButtonsDisabled(true);
    }
  }, [articleName, isUsefulArticle]);

  const clickAndUseful = useCallback(() => {
    setUsefulArticle(1);
  }, []);

  const clickAndNotUseful = useCallback(() => {
    setUsefulArticle(0);
  }, []);

  return (
    <View style={styles.usefulContainer}>
      <TrackerHandler eventObject={trackerEventObject} />
      <SecondaryText style={[styles.usefulContent]}>
        {Labels.article.usefulTitle}
      </SecondaryText>
      <View style={styles.buttonsBloc}>
        <CustomButton
          title={Labels.buttons.yes}
          rounded={false}
          buttonStyle={styles.buttonStyle}
          disabledStyle={styles.buttonDisabledStyle}
          titleStyle={styles.buttonTitle}
          action={clickAndUseful}
          disabled={isButtonsDisabled}
          icon={
            <Icomoon
              name={IcomoonIcons.valider}
              size={14}
              color={Colors.secondaryGreenDark}
            />
          }
        />
        <CustomButton
          title={Labels.buttons.no}
          rounded={false}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitle}
          disabledStyle={styles.buttonDisabledStyle}
          action={clickAndNotUseful}
          disabled={isButtonsDisabled}
          icon={
            <Icomoon
              name={IcomoonIcons.annuler}
              size={14}
              color={Colors.secondaryRedMiddle}
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonDisabledStyle: {
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    height: Sizes.accessibilityMinButton,
    marginHorizontal: Sizes.xxxxxs,
  },
  buttonStyle: {
    backgroundColor: "transparent",
  },
  buttonTitle: {
    color: Colors.black,
    fontSize: Sizes.xs,
    paddingBottom: 5,
    paddingTop: 0,
  },
  buttonsBloc: {
    flexDirection: "row",
  },
  usefulContainer: {
    alignItems: "center",
    backgroundColor: Colors.cardWhite,
    borderBottomColor: Colors.borderGrey,
    borderLeftColor: Colors.primaryBlue,
    borderLeftWidth: 4,
    borderRightColor: Colors.borderGrey,
    borderTopColor: Colors.borderGrey,
    borderWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: Margins.default,
    paddingVertical: Paddings.smaller,
  },
  usefulContent: {
    fontSize: Sizes.sm,
    fontWeight: FontWeight.medium,
    lineHeight: Sizes.lg,
    paddingHorizontal: Paddings.default,
    paddingTop: 0,
  },
});
export default UsefulArticle;
