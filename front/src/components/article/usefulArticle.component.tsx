import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import { Labels } from "../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import {
  CustomButton,
  Icomoon,
  IcomoonIcons,
  SecondaryText,
  View,
} from "../baseComponents";

interface Props {
  idArticle: string;
}

const UsefulArticle: FC<Props> = ({ idArticle }) => {
  return (
    <View style={styles.usefulContainer}>
      <SecondaryText style={[styles.usefulContent]}>
        {Labels.article.usefulTitle}
      </SecondaryText>
      <View style={styles.buttonsBloc}>
        <CustomButton
          title={Labels.buttons.yes}
          rounded={false}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitle}
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
  buttonStyle: {
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    height: Sizes.accessibilityMinButton,
    marginHorizontal: Sizes.xxxxxs,
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
