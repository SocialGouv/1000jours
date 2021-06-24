import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import CategorieProSanteIcon from "../../assets/images/carto/categorie_pro_sante.svg";
import DetailsAddressIcon from "../../assets/images/carto/details_adresse.svg";
import DetailsMailIcon from "../../assets/images/carto/details_mail.svg";
import DetailsPhoneIcon from "../../assets/images/carto/details_tel.svg";
import DetailsWebIcon from "../../assets/images/carto/details_web.svg";
import TypeMairieIcon from "../../assets/images/carto/type_mairie.svg";
import TypeMaisonNaissanceIcon from "../../assets/images/carto/type_maison_naissance.svg";
import TypeMaterniteIcon from "../../assets/images/carto/type_maternite.svg";
import TypePlanningFamilialIcon from "../../assets/images/carto/type_planning_familial.svg";
import TypePmiCafCpamIcon from "../../assets/images/carto/type_pmi_caf_cpam.svg";
import TypeSaadIcon from "../../assets/images/carto/type_saad.svg";
import { Button, CommonText, SecondaryText, View } from "../../components";
import {
  AroundMeConstants,
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../constants";
import { SCREEN_WIDTH } from "../../constants/platform.constants";
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
    const poiTypeLabels = Labels.aroundMe.poiType;
    let iconType = null;
    if (categoriePoi === AroundMeConstants.PoiCategorieEnum.professionnel) {
      iconType = <CategorieProSanteIcon />;
    } else {
      const iconsMap = new Map<string, React.ReactNode>();
      iconsMap.set(
        poiTypeLabels.planningFamilial,
        <TypePlanningFamilialIcon />
      );
      iconsMap.set(
        poiTypeLabels.maisonDeNaissance,
        <TypeMaisonNaissanceIcon />
      );
      iconsMap.set(poiTypeLabels.maternite, <TypeMaterniteIcon />);

      iconsMap.set(poiTypeLabels.saad, <TypeSaadIcon />);
      iconsMap.set(poiTypeLabels.pmi, <TypePmiCafCpamIcon />);
      iconsMap.set(poiTypeLabels.caf, <TypePmiCafCpamIcon />);
      iconsMap.set(poiTypeLabels.cpam, <TypePmiCafCpamIcon />);
      iconsMap.set(poiTypeLabels.mairie, <TypeMairieIcon />);

      iconType = iconsMap.get(typePoi);
      // Au cas où la catégorie n'a pas d'icône, on affiche celle des pros de santé
      if (!iconType) iconType = <CategorieProSanteIcon />;
    }
    return iconType;
  };

  details.categorie = AroundMeConstants.PoiCategorieEnum[details.categorie];

  const iconType = getIcon(details.categorie, details.type);
  return (
    <View style={styles.rowContainer}>
      <View style={styles.icon}>{iconType}</View>
      <View style={styles.addressDetails}>
        {StringUtils.stringIsNotNullNorEmpty(details.nom) && (
          <CommonText style={styles.name}>{details.nom}</CommonText>
        )}
        <CommonText style={styles.type}>{details.type}</CommonText>
        <View style={styles.rowView}>
          <DetailsAddressIcon />
          <View style={styles.columnView}>
            <SecondaryText style={styles.text}>{details.adresse}</SecondaryText>
            <SecondaryText style={styles.text}>
              {details.code_postal} {details.commune}
            </SecondaryText>
          </View>
        </View>
        {(StringUtils.stringIsNotNullNorEmpty(details.telephone) ||
          StringUtils.stringIsNotNullNorEmpty(details.courriel)) && (
          <View style={styles.phoneAndMail}>
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
      <View style={styles.goThereView}>
        <Button
          title={Labels.aroundMe.goThere}
          titleStyle={styles.fontButton}
          rounded={true}
          disabled={false}
          action={async () => {
            await LinkingUtils.openNavigationApp(
              details.position_latitude,
              details.position_longitude
            );
          }}
        />
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
    width: SCREEN_WIDTH / 2.16,
  },
  contact: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xxs,
    marginLeft: Margins.smaller,
  },
  fontButton: {
    fontSize: Sizes.xxs,
  },
  goThereView: {
    alignSelf: "center",
    marginRight: Margins.default,
    position: "absolute",
    right: 0,
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
    width: SCREEN_WIDTH / 1.28,
  },
  phoneAndMail: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: Margins.evenMoreSmallest,
    width: SCREEN_WIDTH / 1.28,
  },
  rowContainer: {
    flexDirection: "row",
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
  type: {
    backgroundColor: Colors.primaryBlueLight,
    color: Colors.primaryBlueDark,
    fontSize: Sizes.xxs,
    marginVertical: Margins.smaller,
    paddingHorizontal: Paddings.smaller,
    textAlign: "center",
  },
});

export default AddressDetails;
