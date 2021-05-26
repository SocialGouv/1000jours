import * as React from "react";
import { StyleSheet } from "react-native";

import { CommonText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../constants";
import type { AddressDetailsType } from "../../type";

interface AddressDetailsProps {
  details: AddressDetailsType;
}

const AddressDetails: React.FC<AddressDetailsProps> = ({ details }) => {
  return (
    <View style={styles.addressDetails}>
      <CommonText style={styles.professionalName}>
        {details.professionalName}
      </CommonText>
      <CommonText style={styles.text}>{details.postalAddress}</CommonText>
      <CommonText style={styles.text}>{details.phoneNumber}</CommonText>
      <CommonText style={styles.text}>{details.accessibilityInfo}</CommonText>
    </View>
  );
};

const styles = StyleSheet.create({
  addressDetails: {
    bottom: 0,
    left: 0,
    marginHorizontal: Margins.default,
    marginVertical: Margins.smaller,
    padding: Paddings.default,
    position: "absolute",
    right: 0,
  },
  professionalName: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.bold,
  },
  text: {
    color: Colors.commonText,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.bold,
  },
});

export default AddressDetails;
