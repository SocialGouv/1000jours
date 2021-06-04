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
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../constants";
import type { CartographiePoisFromDB } from "../../type";
import { LinkingUtils, StringUtils } from "../../utils";

interface AddressDetailsProps {
  details: CartographiePoisFromDB;
}

const AddressDetails: React.FC<AddressDetailsProps> = ({ details }) => {
  const getIconAndLabel = (
    categoriePoi: AroundMeConstants.PoiCategorieEnum,
    typePoi: AroundMeConstants.PoiTypeEnum
  ) => {
    const poiTypeLabels = Labels.aroundMe.poiType;
    const labelsMap = new Map<AroundMeConstants.PoiTypeEnum, string>();
    labelsMap.set(
      AroundMeConstants.PoiTypeEnum.planning_familial,
      poiTypeLabels.planningFamilial
    );
    labelsMap.set(
      AroundMeConstants.PoiTypeEnum.maison_de_naissance,
      poiTypeLabels.maisonDeNaissance
    );
    labelsMap.set(
      AroundMeConstants.PoiTypeEnum.maternite,
      poiTypeLabels.maternite
    );
    labelsMap.set(AroundMeConstants.PoiTypeEnum.pmi, poiTypeLabels.pmi);
    labelsMap.set(AroundMeConstants.PoiTypeEnum.saad, poiTypeLabels.saad);
    labelsMap.set(AroundMeConstants.PoiTypeEnum.cpam, poiTypeLabels.cpam);
    labelsMap.set(AroundMeConstants.PoiTypeEnum.caf, poiTypeLabels.caf);
    labelsMap.set(AroundMeConstants.PoiTypeEnum.mairie, poiTypeLabels.mairie);

    const label = labelsMap.get(typePoi);

    let icon = null;
    if (categoriePoi === AroundMeConstants.PoiCategorieEnum.professionnels) {
      icon = <CategorieProSanteIcon />;
    } else {
      const iconsMap = new Map<
        AroundMeConstants.PoiTypeEnum,
        React.ReactNode
      >();
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
      icon = iconsMap.get(typePoi);
      // Si la catégorie n'a pas d'icône, en attendant de les recevoir, on affiche celle des pros de santé
      if (!icon) icon = <CategorieProSanteIcon />;
    }
    return { icon, label };
  };

  details.cartographie_categorie =
    AroundMeConstants.PoiCategorieEnum[details.cartographie_categorie];
  details.type = AroundMeConstants.PoiTypeEnum[details.type];

  const { icon: iconType, label: labelType } = getIconAndLabel(
    details.cartographie_categorie,
    details.type
  );
  return (
    <View style={styles.rowContainer}>
      <View style={styles.icon}>{iconType}</View>
      <View style={styles.addressDetails}>
        {StringUtils.stringIsNotNullNorEmpty(details.nom) && (
          <CommonText style={styles.name}>{details.nom}</CommonText>
        )}
        <CommonText style={styles.type}>{labelType}</CommonText>
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
    alignItems: "flex-start",
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
  name: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.bold,
  },
  rowContainer: {
    flexDirection: "row",
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
  type: {
    backgroundColor: Colors.primaryBlueLight,
    color: Colors.primaryBlueDark,
    fontSize: Sizes.xxs,
    paddingHorizontal: Paddings.smaller,
    textAlign: "center",
  },
});

export default AddressDetails;
