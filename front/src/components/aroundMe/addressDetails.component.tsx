import type { Poi } from "@socialgouv/nos1000jours-lib";
import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { TouchableOpacity as TouchableOpacityAndroid } from "react-native-gesture-handler";

import { AroundMeConstants, Labels } from "../../constants";
import {
  PLATFORM_IS_IOS,
  SCREEN_WIDTH,
} from "../../constants/platform.constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import { LinkingUtils, StringUtils, TrackerUtils } from "../../utils";
import { AddressDetailsAssets } from "../assets";
import {
  CommonText,
  CustomButton,
  Icomoon,
  IcomoonIcons,
  SecondaryText,
  View,
} from "../baseComponents";
import TrackerHandler from "../tracker/trackerHandler.component";

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
  const [trackerAction, setTrackerAction] = useState("");
  const getIcon = (
    categoriePoi: AroundMeConstants.PoiCategorieEnum,
    typePoi: AroundMeConstants.PoiTypeEnum
  ) => {
    const poiTypeLabels = Labels.aroundMe.poiType;
    let iconType = null;
    if (categoriePoi === AroundMeConstants.PoiCategorieEnum.professionnel) {
      iconType = <AddressDetailsAssets.CategorieProSanteIcon />;
    } else {
      const iconsMap = new Map<string, React.ReactNode>();
      iconsMap.set(
        poiTypeLabels.planningFamilial,
        <AddressDetailsAssets.TypePlanningFamilialIcon />
      );
      iconsMap.set(
        poiTypeLabels.maisonDeNaissance,
        <AddressDetailsAssets.TypeMaisonNaissanceIcon />
      );
      iconsMap.set(
        poiTypeLabels.maternite,
        <AddressDetailsAssets.TypeMaterniteIcon />
      );

      iconsMap.set(poiTypeLabels.saad, <AddressDetailsAssets.TypeSaadIcon />);
      iconsMap.set(
        poiTypeLabels.pmi,
        <AddressDetailsAssets.TypePmiCafCpamIcon />
      );
      iconsMap.set(
        poiTypeLabels.caf,
        <AddressDetailsAssets.TypePmiCafCpamIcon />
      );
      iconsMap.set(
        poiTypeLabels.cpam,
        <AddressDetailsAssets.TypePmiCafCpamIcon />
      );
      iconsMap.set(
        poiTypeLabels.mairie,
        <AddressDetailsAssets.TypeMairieIcon />
      );
      iconsMap.set(
        poiTypeLabels.bibliothequePublique,
        <AddressDetailsAssets.TypeBibliothequeMediatheque />
      );
      iconsMap.set(
        poiTypeLabels.mediatheque,
        <AddressDetailsAssets.TypeBibliothequeMediatheque />
      );

      iconType = iconsMap.get(typePoi);
      if (!iconType) iconType = <AddressDetailsAssets.TypeDefaut />;
    }
    return iconType;
  };

  details.categorie = AroundMeConstants.PoiCategorieEnum[details.categorie];

  const getContactIcon = (contactType: ContactType) => {
    const iconsMap = new Map<ContactType, React.ReactNode>();
    iconsMap.set(
      ContactType.telephone,
      <AddressDetailsAssets.DetailsPhoneIcon />
    );
    iconsMap.set(
      ContactType.courriel,
      <AddressDetailsAssets.DetailsMailIcon />
    );
    iconsMap.set(
      ContactType.siteInternet,
      <AddressDetailsAssets.DetailsWebIcon />
    );
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
        onPress={getLinkingFunction(contactType, contactLabel)}
      >
        {renderContactLink(contactType, contactLabel)}
      </TouchableOpacity>
    ) : (
      <TouchableOpacityAndroid
        style={[styles.rowView, styles.marginRight]}
        onPress={getLinkingFunction(contactType, contactLabel)}
      >
        {renderContactLink(contactType, contactLabel)}
      </TouchableOpacityAndroid>
    );
  };

  const getLinkingFunction = useCallback(
    (contactType: ContactType, contactLabel?: string) => async () => {
      if (contactType === ContactType.telephone)
        return LinkingUtils.callContact(contactLabel);
      else if (contactType === ContactType.courriel)
        return LinkingUtils.sendEmail(contactLabel);
      else return LinkingUtils.openWebsite(contactLabel);
    },
    []
  );

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

  const onOpenNavigationButtonPressed = useCallback(async () => {
    setTrackerAction(
      `${TrackerUtils.TrackingEvent.CARTO} - Clic sur le bouton "M'y rendre"`
    );
    await LinkingUtils.openNavigationApp(
      details.position_latitude,
      details.position_longitude
    );
  }, [details.position_latitude, details.position_longitude]);

  const onClickedMarkerPressed = useCallback(() => {
    hideDetails?.();
  }, [hideDetails]);

  return (
    <View style={styles.rowContainer}>
      <TrackerHandler actionName={trackerAction} />
      <View style={styles.icon}>{iconType}</View>
      <View style={styles.addressDetails}>
        {StringUtils.isNotNullNorEmpty(details.nom) && (
          <CommonText style={styles.name}>{details.nom}</CommonText>
        )}
        <CommonText style={styles.type}>{details.type}</CommonText>
        <View style={styles.rowView}>
          <AddressDetailsAssets.DetailsAddressIcon />
          <View style={styles.columnView}>
            <SecondaryText style={styles.text}>{details.adresse}</SecondaryText>
            <SecondaryText style={styles.text}>
              {details.code_postal} {details.commune}
            </SecondaryText>
          </View>
        </View>
        {(StringUtils.isNotNullNorEmpty(details.telephone) ||
          StringUtils.isNotNullNorEmpty(details.courriel)) && (
          <View style={styles.phoneAndMail}>
            {StringUtils.isNotNullNorEmpty(details.telephone) &&
              renderTouchableView(ContactType.telephone, details.telephone)}
            {StringUtils.isNotNullNorEmpty(details.courriel) &&
              renderTouchableView(ContactType.courriel, details.courriel)}
          </View>
        )}
        {StringUtils.isNotNullNorEmpty(details.site_internet) &&
          renderTouchableView(ContactType.siteInternet, details.site_internet)}
      </View>
      <View style={styles.goThereView}>
        <CustomButton
          title={Labels.aroundMe.goThere}
          titleStyle={styles.fontButton}
          rounded={true}
          disabled={false}
          onPressIn={onOpenNavigationButtonPressed}
        />
      </View>
      {isClickedMarker && (
        <TouchableOpacity
          style={styles.closeModalView}
          onPress={onClickedMarkerPressed}
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
