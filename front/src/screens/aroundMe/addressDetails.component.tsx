import type { Poi } from "@socialgouv/nos1000jours-lib";
import { useMatomo } from "matomo-tracker-react-native";
import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { TouchableOpacity as TouchableOpacityAndroid } from "react-native-gesture-handler";

import CategorieProSanteIcon from "../../assets/images/carto/categorie_pro_sante.svg";
import DetailsAddressIcon from "../../assets/images/carto/details_adresse.svg";
import DetailsMailIcon from "../../assets/images/carto/details_mail.svg";
import DetailsPhoneIcon from "../../assets/images/carto/details_tel.svg";
import DetailsWebIcon from "../../assets/images/carto/details_web.svg";
import TypeBibliothequeMediatheque from "../../assets/images/carto/type_bibliotheque_mediatheque.svg";
import TypeDefaut from "../../assets/images/carto/type_defaut.svg";
import TypeMairieIcon from "../../assets/images/carto/type_mairie.svg";
import TypeMaisonNaissanceIcon from "../../assets/images/carto/type_maison_naissance.svg";
import TypeMaterniteIcon from "../../assets/images/carto/type_maternite.svg";
import TypePlanningFamilialIcon from "../../assets/images/carto/type_planning_familial.svg";
import TypePmiCafCpamIcon from "../../assets/images/carto/type_pmi_caf_cpam.svg";
import TypeSaadIcon from "../../assets/images/carto/type_saad.svg";
import {
  CommonText,
  CustomButton,
  Icomoon,
  IcomoonIcons,
  SecondaryText,
  View,
} from "../../components";
import {
  AroundMeConstants,
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../constants";
import {
  PLATFORM_IS_IOS,
  SCREEN_WIDTH,
} from "../../constants/platform.constants";
import { LinkingUtils, StringUtils, TrackerUtils } from "../../utils";

interface AddressDetailsProps {
  details: Poi;
  isClickedMarker?: boolean;
  hideDetails?: () => void;
}

enum ContactType {
  telephone = "telephone",
  courriel = "courriel",
  siteInternet = "siteInternet",
}

const AddressDetails: React.FC<AddressDetailsProps> = ({
  details,
  isClickedMarker,
  hideDetails,
}) => {
  const { trackScreenView } = useMatomo();
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
      iconsMap.set(
        poiTypeLabels.bibliothequePublique,
        <TypeBibliothequeMediatheque />
      );
      iconsMap.set(poiTypeLabels.mediatheque, <TypeBibliothequeMediatheque />);

      iconType = iconsMap.get(typePoi);
      if (!iconType) iconType = <TypeDefaut />;
    }
    return iconType;
  };

  details.categorie = AroundMeConstants.PoiCategorieEnum[details.categorie];

  const getContactIcon = (contactType: ContactType) => {
    const iconsMap = new Map<ContactType, React.ReactNode>();
    iconsMap.set(ContactType.telephone, <DetailsPhoneIcon />);
    iconsMap.set(ContactType.courriel, <DetailsMailIcon />);
    iconsMap.set(ContactType.siteInternet, <DetailsWebIcon />);
    return iconsMap.get(contactType);
  };

  const renderTouchableView = (
    contactType: ContactType,
    contactLabel?: string
  ) => {
    /* Pour le volet déroulant du bas (dans la carto), on utilise la lib reanimated-bottom-sheet
       Le souci est que sur Android, le TouchableOpacity de react-native ne répond pas, on est donc obligés d'utiliser celui de react-native-gesture-handler */
    return PLATFORM_IS_IOS ? (
      <TouchableOpacity
        style={[styles.rowView, styles.marginRight]}
        onPress={async () => getLinkingFunction(contactType, contactLabel)}
      >
        {renderContactLink(contactType, contactLabel)}
      </TouchableOpacity>
    ) : (
      <TouchableOpacityAndroid
        style={[styles.rowView, styles.marginRight]}
        onPress={async () => getLinkingFunction(contactType, contactLabel)}
      >
        {renderContactLink(contactType, contactLabel)}
      </TouchableOpacityAndroid>
    );
  };

  const getLinkingFunction = async (
    contactType: ContactType,
    contactLabel?: string
  ) => {
    if (contactType === ContactType.telephone)
      return LinkingUtils.callContact(contactLabel);
    else if (contactType === ContactType.courriel)
      return LinkingUtils.sendEmail(contactLabel);
    else return LinkingUtils.openWebsite(contactLabel);
  };

  const renderContactLink = (
    contactType: ContactType,
    contactLabel?: string
  ) => {
    return (
      <>
        {getContactIcon(contactType)}
        <CommonText style={styles.contact}>{contactLabel}</CommonText>
      </>
    );
  };

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
            {StringUtils.stringIsNotNullNorEmpty(details.telephone) &&
              renderTouchableView(ContactType.telephone, details.telephone)}
            {StringUtils.stringIsNotNullNorEmpty(details.courriel) &&
              renderTouchableView(ContactType.courriel, details.courriel)}
          </View>
        )}
        {StringUtils.stringIsNotNullNorEmpty(details.site_internet) &&
          renderTouchableView(ContactType.siteInternet, details.site_internet)}
      </View>
      <View style={styles.goThereView}>
        <CustomButton
          title={Labels.aroundMe.goThere}
          titleStyle={styles.fontButton}
          rounded={true}
          disabled={false}
          onPressIn={async () => {
            trackScreenView(
              `${TrackerUtils.TrackingEvent.CARTO} - Clic sur le bouton "M'y rendre"`
            );
            await LinkingUtils.openNavigationApp(
              details.position_latitude,
              details.position_longitude
            );
          }}
        />
      </View>
      {isClickedMarker && (
        <TouchableOpacity
          style={styles.closeModalView}
          onPress={() => {
            hideDetails?.();
          }}
        >
          <Icomoon
            name={IcomoonIcons.fermer}
            size={Sizes.sm}
            color={Colors.primaryBlue}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addressDetails: {
    alignItems: "flex-start",
    marginHorizontal: Margins.smaller,
    marginVertical: Margins.smaller,
  },
  closeModalView: {
    marginRight: Margins.smaller,
    marginTop: Margins.smaller,
    position: "absolute",
    right: 0,
  },
  columnView: {
    flexDirection: "column",
    width: SCREEN_WIDTH / 2.4,
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
