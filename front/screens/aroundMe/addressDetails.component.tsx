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
import type { CartographiePoisFromDB } from "../../type";
import { LinkingUtils, StringUtils } from "../../utils";

interface AddressDetailsProps {
  details: CartographiePoisFromDB;
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
      {/* <View style={styles.icon}>{getIcon(details.poiType)}</View> */}
      <View style={styles.addressDetails}>
        {StringUtils.stringIsNotNullNorEmpty(details.nom) && (
          <CommonText style={styles.professionalName}>{details.nom}</CommonText>
        )}
        <View style={styles.rowView}>
          <DetailsAddressIcon />
          <View style={styles.columnView}>
            <CommonText style={styles.text}>
              {details.geocode_adresse}
            </CommonText>
            <CommonText style={styles.text}>
              {details.geocode_code_postal} {details.geocode_commune}
            </CommonText>
          </View>
        </View>
        {StringUtils.stringIsNotNullNorEmpty(details.telephone) && (
          <TouchableOpacity
            style={styles.rowView}
            onPress={async () => LinkingUtils.callContact(details.telephone)}
          >
            <DetailsPhoneIcon />
            <CommonText style={styles.contact}>{details.telephone}</CommonText>
          </TouchableOpacity>
        )}
        {StringUtils.stringIsNotNullNorEmpty(details.courriel) && (
          <TouchableOpacity
            style={styles.rowView}
            onPress={async () => LinkingUtils.sendEmail(details.courriel)}
          >
            <DetailsMailIcon />
            <CommonText style={styles.contact}>{details.courriel}</CommonText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addressDetails: {
    marginHorizontal: Margins.smaller,
    marginVertical: Margins.smaller,
  },
  columnView: {
    flexDirection: "column",
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
