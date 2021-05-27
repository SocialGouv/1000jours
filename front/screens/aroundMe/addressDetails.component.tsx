import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import DetailsAddressIcon from "../../assets/images/carto/details_adresse.svg";
import DetailsMailIcon from "../../assets/images/carto/details_mail.svg";
import DetailsPhoneIcon from "../../assets/images/carto/details_tel.svg";
import DetailsWebIcon from "../../assets/images/carto/details_web.svg";
import HealthProfessionalIcon from "../../assets/images/carto/thematique_professionnel.svg";
import { CommonText, View } from "../../components";
import {
  AroundMeConstants,
  Colors,
  FontWeight,
  Margins,
  Sizes,
} from "../../constants";
import type { AddressDetailsType } from "../../type";
import { LinkingUtils } from "../../utils";

interface AddressDetailsProps {
  details: AddressDetailsType;
}

const AddressDetails: React.FC<AddressDetailsProps> = ({ details }) => {
  const getIcon = (icone: AroundMeConstants.PoiTypeEnum) => {
    const iconsMap = new Map<AroundMeConstants.PoiTypeEnum, React.ReactNode>();
    iconsMap.set(
      AroundMeConstants.PoiTypeEnum.healthProfessional,
      <HealthProfessionalIcon />
    );
    iconsMap.set(
      AroundMeConstants.PoiTypeEnum.healthStructure,
      <HealthProfessionalIcon />
    );
    return iconsMap.get(icone);
  };

  return (
    <View style={styles.rowContainer}>
      <View style={styles.icon}>{getIcon(details.poiType)}</View>
      <View style={styles.addressDetails}>
        <CommonText style={styles.professionalName}>
          {details.professionalName}
        </CommonText>
        <View style={styles.rowView}>
          <DetailsAddressIcon />
          <CommonText style={styles.text}>{details.postalAddress}</CommonText>
        </View>
        <TouchableOpacity
          style={styles.rowView}
          onPress={async () => LinkingUtils.callContact(details.phoneNumber)}
        >
          <DetailsPhoneIcon />
          <CommonText style={styles.contact}>{details.phoneNumber}</CommonText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rowView}
          onPress={async () => LinkingUtils.sendEmail(details.emailAddress)}
        >
          <DetailsMailIcon />
          <CommonText style={styles.contact}>{details.emailAddress}</CommonText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rowView}
          onPress={async () => LinkingUtils.openWebsite(details.website)}
        >
          <DetailsWebIcon />
          <CommonText style={styles.contact}>{details.website}</CommonText>
        </TouchableOpacity>
        <CommonText style={styles.text}>{details.accessibilityInfo}</CommonText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addressDetails: {
    marginHorizontal: Margins.smaller,
    marginVertical: Margins.smaller,
  },
  contact: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xs,
    marginLeft: Margins.smaller,
  },
  icon: {
    marginLeft: Margins.smaller,
    marginTop: Margins.default,
  },
  professionalName: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.bold,
  },
  rowContainer: {
    bottom: 0,
    flexDirection: "row",
    left: 0,
    marginHorizontal: Margins.default,
    marginVertical: Margins.smaller,
    position: "absolute",
    right: 0,
  },
  rowView: {
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    color: Colors.commonText,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.bold,
    marginLeft: Margins.smaller,
  },
});

export default AddressDetails;
