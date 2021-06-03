import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import CategorieProSanteIcon from "../../assets/images/carto/categorie_pro_sante.svg";
import DetailsAddressIcon from "../../assets/images/carto/details_adresse.svg";
import DetailsMailIcon from "../../assets/images/carto/details_mail.svg";
import DetailsPhoneIcon from "../../assets/images/carto/details_tel.svg";
import DetailsWebIcon from "../../assets/images/carto/details_web.svg";
import TypeMaisonNaissanceIcon from "../../assets/images/carto/type_maison_naissance.svg";
import TypeMaterniteIcon from "../../assets/images/carto/type_maternite.svg";
import TypePlanningFamilialIcon from "../../assets/images/carto/type_planning_familial.svg";
import TypeSaadIcon from "../../assets/images/carto/type_saad.svg";
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
  const getIcon = (
    categoriePoi: AroundMeConstants.PoiCategorieEnum,
    typePoi: AroundMeConstants.PoiTypeEnum
  ) => {
    if (categoriePoi === AroundMeConstants.PoiCategorieEnum.professionnels)
      return <CategorieProSanteIcon />;

    const iconsMap = new Map<AroundMeConstants.PoiTypeEnum, React.ReactNode>();
    iconsMap.set(
      AroundMeConstants.PoiTypeEnum.planning_familial,
      <TypePlanningFamilialIcon />
    );
    iconsMap.set(
      AroundMeConstants.PoiTypeEnum.maison_de_naissance,
      <TypeMaisonNaissanceIcon />
    );
    iconsMap.set(
      AroundMeConstants.PoiTypeEnum.maternite,
      <TypeMaterniteIcon />
    );
    iconsMap.set(
      AroundMeConstants.PoiTypeEnum.maternite,
      <TypeMaterniteIcon />
    );
    iconsMap.set(AroundMeConstants.PoiTypeEnum.saad, <TypeSaadIcon />);
    const icon = iconsMap.get(typePoi);
    if (!icon) return <CategorieProSanteIcon />;
    return icon;
  };

  details.cartographie_categorie =
    AroundMeConstants.PoiCategorieEnum[details.cartographie_categorie];
  details.type = AroundMeConstants.PoiTypeEnum[details.type];
  return (
    <View style={styles.rowContainer}>
      <View style={styles.icon}>
        {getIcon(details.cartographie_categorie, details.type)}
      </View>
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
        {(StringUtils.stringIsNotNullNorEmpty(details.telephone) ||
          StringUtils.stringIsNotNullNorEmpty(details.courriel)) && (
          <View style={styles.rowView}>
            {StringUtils.stringIsNotNullNorEmpty(details.telephone) && (
              <TouchableOpacity
                style={[styles.rowView, styles.marginRight]}
                onPress={async () =>
                  LinkingUtils.callContact(details.telephone)
                }
              >
                <DetailsPhoneIcon />
                <CommonText style={styles.contact}>
                  {details.telephone}
                </CommonText>
              </TouchableOpacity>
            )}
            {StringUtils.stringIsNotNullNorEmpty(details.courriel) && (
              <TouchableOpacity
                style={styles.rowView}
                onPress={async () => LinkingUtils.sendEmail(details.courriel)}
              >
                <DetailsMailIcon />
                <CommonText style={styles.contact}>
                  {details.courriel}
                </CommonText>
              </TouchableOpacity>
            )}
          </View>
        )}
        {StringUtils.stringIsNotNullNorEmpty(details.site_internet) && (
          <TouchableOpacity
            style={styles.rowView}
            onPress={async () =>
              LinkingUtils.openWebsite(details.site_internet)
            }
          >
            <DetailsWebIcon />
            <CommonText style={styles.contact}>
              {details.site_internet}
            </CommonText>
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
    fontSize: Sizes.xxs,
    marginLeft: Margins.smaller,
  },
  icon: {
    marginLeft: Margins.smaller,
    marginTop: Margins.default,
  },
  marginRight: {
    marginRight: Margins.smaller,
  },
  professionalName: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.xs,
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
    marginVertical: Margins.evenMoreSmallest,
  },
  text: {
    color: Colors.commonText,
    fontSize: Sizes.xxs,
    fontWeight: FontWeight.bold,
    marginLeft: Margins.smaller,
  },
});

export default AddressDetails;
