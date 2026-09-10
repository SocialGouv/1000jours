import type { FC, PropsWithChildren } from "react";
import * as React from "react";
import { useCallback, useState } from "react";
import {
  Modal as RNModal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Labels, Links } from "../../constants";
import { Colors, FontWeight, Margins, Paddings, Sizes } from "../../styles";
import { LinkingUtils } from "../../utils";
import { CloseButton, SecondaryText, View } from "../baseComponents";

/**
 * Bandeau d'annonce de la fermeture du service, affiché en haut de toutes les
 * pages de l'application. Le bandeau prend en charge la zone de la barre de
 * statut (safe area) et remet l'inset haut à zéro pour ses enfants, afin que
 * les en-têtes de navigation ne l'ajoutent pas une seconde fois.
 */
const ClosureBanner: FC<PropsWithChildren> = ({ children }) => {
  const insets = useSafeAreaInsets();
  const [showDetails, setShowDetails] = useState(false);

  const onLearnMorePressed = useCallback(() => {
    setShowDetails(true);
  }, []);

  const onCloseDetails = useCallback(() => {
    setShowDetails(false);
  }, []);

  return (
    <>
      <View
        style={[styles.banner, { paddingTop: insets.top + Paddings.smaller }]}
      >
        <SecondaryText style={styles.bannerTitle} accessibilityRole="header">
          {Labels.closure.banner.title}
        </SecondaryText>
        <SecondaryText style={styles.bannerText}>
          {Labels.closure.banner.text}
        </SecondaryText>
        <TouchableOpacity
          onPress={onLearnMorePressed}
          accessibilityRole="button"
          accessibilityLabel={Labels.closure.banner.learnMore}
          style={styles.learnMoreButton}
        >
          <SecondaryText style={styles.learnMoreText}>
            {Labels.closure.banner.learnMore}
          </SecondaryText>
        </TouchableOpacity>
      </View>
      <SafeAreaInsetsContext.Provider value={{ ...insets, top: 0 }}>
        {children}
      </SafeAreaInsetsContext.Provider>
      {showDetails && <ClosureDetailsModal onClose={onCloseDetails} />}
    </>
  );
};

interface ClosureDetailsModalProps {
  onClose: () => void;
}

const ClosureDetailsModal: FC<ClosureDetailsModalProps> = ({ onClose }) => {
  const openMillePremiersJours = useCallback(() => {
    void LinkingUtils.openWebsite(Links.millePremiersJoursUrl);
  }, []);

  const openMonEspaceSante = useCallback(() => {
    void LinkingUtils.openWebsite(Links.monEspaceSanteUrl);
  }, []);

  const message = Labels.closure.message;

  return (
    <RNModal
      animationType="slide"
      visible={true}
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalSafeArea}>
        <View style={styles.modalHeader}>
          <CloseButton onPress={onClose} clear={false} />
        </View>
        <ScrollView contentContainerStyle={styles.modalContent}>
          <SecondaryText style={styles.modalTitle} accessibilityRole="header">
            {message.title}
          </SecondaryText>
          <SecondaryText style={styles.paragraph}>
            {message.paragraph1}
          </SecondaryText>
          <SecondaryText style={styles.paragraph}>
            {message.paragraph2}
          </SecondaryText>
          <SecondaryText style={styles.paragraph}>
            {message.paragraph3Start}
            <SecondaryText
              style={styles.link}
              onPress={openMillePremiersJours}
              accessibilityRole="link"
            >
              {message.paragraph3Link}
            </SecondaryText>
            {message.paragraph3End}
          </SecondaryText>
          <SecondaryText style={styles.paragraph}>
            {message.paragraph4Start}
            <SecondaryText
              style={styles.link}
              onPress={openMonEspaceSante}
              accessibilityRole="link"
            >
              {message.paragraph4Link}
            </SecondaryText>
            {message.paragraph4End}
          </SecondaryText>
          <SecondaryText style={styles.paragraph}>
            {message.paragraph5}
          </SecondaryText>
          <SecondaryText style={[styles.paragraph, styles.signature]}>
            {message.signature}
          </SecondaryText>
        </ScrollView>
      </SafeAreaView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: Colors.primaryYellowLight,
    borderBottomColor: Colors.primaryYellowVeryDark,
    borderBottomWidth: 2,
    paddingBottom: Paddings.smaller,
    paddingHorizontal: Paddings.default,
  },
  bannerText: {
    color: Colors.commonText,
    fontSize: Sizes.xs,
  },
  bannerTitle: {
    color: Colors.primaryYellowVeryDark,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.bold,
    paddingBottom: Paddings.smallest,
  },
  learnMoreButton: {
    alignSelf: "flex-start",
    paddingVertical: Paddings.smallest,
  },
  learnMoreText: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.xs,
    fontWeight: FontWeight.bold,
    textDecorationLine: "underline",
  },
  link: {
    color: Colors.primaryBlue,
    fontWeight: FontWeight.bold,
    textDecorationLine: "underline",
  },
  modalContent: {
    paddingBottom: Paddings.largest,
    paddingHorizontal: Paddings.default,
  },
  modalHeader: {
    alignItems: "flex-end",
    borderBottomColor: Colors.borderGrey,
    borderBottomWidth: 1,
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.smaller,
  },
  modalSafeArea: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  modalTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.mmd,
    fontWeight: FontWeight.bold,
    paddingVertical: Paddings.default,
  },
  paragraph: {
    color: Colors.commonText,
    fontSize: Sizes.sm,
    lineHeight: Sizes.xl,
    marginBottom: Margins.default,
  },
  signature: {
    fontWeight: FontWeight.bold,
  },
});

export default ClosureBanner;
