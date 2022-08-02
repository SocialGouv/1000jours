import type { FC } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";

import { Labels } from "../../constants";
import { Colors, FontWeight, Margins, Sizes } from "../../styles";
import { CommonText } from "../baseComponents";

interface Props {
  numberOfPoisFound: number;
}

const AroundMePoiResultInformation: FC<Props> = ({ numberOfPoisFound }) => {
  return (
    <CommonText style={styles.addressesListLabel} accessibilityRole="header">
      {Labels.aroundMe.addressesListLabelStart} {numberOfPoisFound}{" "}
      {Labels.aroundMe.addressesListLabelEnd}
    </CommonText>
  );
};

const styles = StyleSheet.create({
  addressesListLabel: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.bold,
    marginHorizontal: Margins.default,
    marginVertical: Margins.smaller,
  },
});

export default AroundMePoiResultInformation;
