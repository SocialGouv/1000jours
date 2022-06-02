import type { FC } from "react";
import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";

import { Labels } from "../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import type { TrackerEventLight } from "../../type";
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

const ARTICLE_IS_USEFUL = 1;
const ARTICLE_IS_NOT_USEFUL = 0;

const UsefulArticle: FC<Props> = ({ articleName }) => {
  const [trackerEventObject, setTrackerEventObject] = useState<TrackerEventLight>();
  const [isButtonsDisabled, setButtonsDisabled] = useState(false);

  const setUsefulArticleForTracker = useCallback(
    (value: number) => () => {
      setTrackerEventObject({
        action: "UsefulArticle",
        name: `${TrackerUtils.TrackingEvent.ARTICLE} : ${articleName}`,
        value: value,
      });
      setButtonsDisabled(true);
    },
    [articleName]
  );

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
          action={setUsefulArticleForTracker(ARTICLE_IS_USEFUL)}
          disabled={isButtonsDisabled}
          icon={
            <Icomoon
              name={IcomoonIcons.valider}
              size={Sizes.xs}
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
          action={setUsefulArticleForTracker(ARTICLE_IS_NOT_USEFUL)}
          disabled={isButtonsDisabled}
          icon={
            <Icomoon
              name={IcomoonIcons.annuler}
              size={Sizes.xs}
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
    backgroundColor: "transparent",
  },
  buttonStyle: {
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    height: Sizes.accessibilityMinButton,
    marginHorizontal: Sizes.xxxxxs,
  },
  buttonTitle: {
    color: Colors.black,
    fontSize: Sizes.xs,
    paddingBottom: Paddings.smallest,
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
  },
});
export default UsefulArticle;
