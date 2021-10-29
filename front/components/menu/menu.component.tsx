import type { NavigationContainerRef } from "@react-navigation/native";
import Constants from "expo-constants";
import * as React from "react";
import { Dimensions, Linking, Modal, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import GestureRecognizer from "react-native-swipe-gestures";
import BottomSheet from "reanimated-bottom-sheet";

import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../../constants";
import { emailContact } from "../../constants/email.constants";
import { reviewTypeForm } from "../../constants/links.constants";
import type { MenuItem, RootStackParamList } from "../../types";
import Icomoon, { IcomoonIcons } from "../base/icomoon.component";
import { View } from "../Themed";
import Accessibility from "./accessibility.component";
import ConditionsOfUse from "./conditionsOfUse.component";
import LegalNotice from "./legalNotice.component";

interface Props {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
  navigation: NavigationContainerRef<RootStackParamList> | null;
}

const Menu: React.FC<Props> = ({ showMenu, setShowMenu, navigation }) => {
  const [showLegalNotice, setShowLegalNotice] = React.useState(false);
  const [showConditionsOfUse, setShowConditionsOfUse] = React.useState(false);
  const [showAccessibility, setShowAccessibility] = React.useState(false);

  const menuItems: MenuItem[] = [
    {
      icon: IcomoonIcons.modifier,
      onPress: () => {
        void Linking.openURL(reviewTypeForm);
      },
      title: Labels.menu.addReview,
    },
    {
      icon: IcomoonIcons.profil,
      onPress: () => {
        navigation?.navigate("profile");
      },
      title: Labels.menu.myProfil,
    },
    {
      icon: IcomoonIcons.email,
      onPress: () => {
        void Linking.openURL(`mailto:${emailContact}`);
      },
      title: Labels.menu.contactUs,
    },
    {
      icon: IcomoonIcons.mentionsLegales,
      onPress: () => {
        setShowLegalNotice(true);
      },
      title: Labels.menu.legalNotice,
    },
    {
      icon: IcomoonIcons.politiquesConfidentialite,
      onPress: () => {
        setShowConditionsOfUse(true);
      },
      title: Labels.menu.conditionsOfUse,
    },
    {
      icon: IcomoonIcons.mentionsLegales,
      onPress: () => {
        setShowAccessibility(true);
      },
      title: Labels.menu.accessibility,
    },
  ];

  const renderContent = () => (
    <GestureRecognizer
      style={{ flex: 1 }}
      onSwipeUp={() => {
        setShowMenu(true);
      }}
      onSwipeDown={() => {
        setShowMenu(false);
      }}
    >
      <Modal animationType="slide" transparent={true} visible={showMenu}>
        <View style={styles.modalView}>
          <View
            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
            accessibilityRole="button"
            accessible
            accessibilityLabel={Labels.accessibility.closeMenu}
            onTouchEnd={() => {
              setShowMenu(false);
            }}
          >
            <View style={styles.swipeIndicator}></View>
          </View>
          <View>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title style={styles.title} accessibilityRole="header">
                  {Labels.menu.title}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
            {menuItems.map((menuItem, index) => (
              <ListItem
                key={index}
                onPress={() => {
                  setShowMenu(false);
                  menuItem.onPress();
                }}
                accessibilityRole="button"
                accessibilityLabel={menuItem.title}
                bottomDivider
              >
                <View style={styles.menuItemIcon}>
                  <Icomoon
                    name={menuItem.icon}
                    size={Sizes.xl}
                    color={Colors.primaryBlueDark}
                  />
                </View>
                <ListItem.Content>
                  <ListItem.Title
                    style={styles.menuItemTitle}
                    allowFontScaling={false}
                  >
                    {menuItem.title}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
            {/* App Version */}
            <ListItem>
              <ListItem.Content>
                <ListItem.Title
                  style={styles.version}
                  accessibilityLabel={`${Labels.accessibility.version}${Constants.manifest.version}`}
                >
                  {`${Labels.version}${Constants.manifest.version}`}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </View>
        </View>
      </Modal>
    </GestureRecognizer>
  );
  const sheetRef = React.useRef<BottomSheet>(null);

  const height = Dimensions.get("window").height;
  const snapPoint = height * 0.8;
  const snapPoints = [snapPoint, snapPoint / 1.5, 0];

  return showMenu ? (
    <BottomSheet
      ref={sheetRef}
      initialSnap={0}
      snapPoints={snapPoints}
      borderRadius={Sizes.xl}
      renderContent={renderContent}
      onCloseEnd={() => {
        setShowMenu(false);
      }}
      enabledContentTapInteraction={false}
    />
  ) : showLegalNotice ? (
    <LegalNotice setIsVisible={setShowLegalNotice} />
  ) : showConditionsOfUse ? (
    <ConditionsOfUse setIsVisible={setShowConditionsOfUse} />
  ) : showAccessibility ? (
    <Accessibility setIsVisible={setShowAccessibility} />
  ) : null;
};

const styles = StyleSheet.create({
  menuItemIcon: {
    backgroundColor: "transparent",
    paddingLeft: Paddings.default,
    paddingRight: Paddings.smallest,
  },
  menuItemTitle: {
    color: Colors.primaryBlueDark,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.medium),
  },
  modalView: {
    backgroundColor: "rgba(0,0,0,0.2)",
    flex: 1,
    justifyContent: "flex-end",
  },
  swipeIndicator: {
    alignSelf: "center",
    backgroundColor: Colors.navigation,
    borderRadius: Sizes.xs,
    height: Sizes.xxxxxxs,
    marginBottom: Margins.light,
    marginTop: Margins.larger,
    width: Sizes.xxxl,
  },
  title: {
    color: Colors.primaryBlueDark,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.black),
    paddingHorizontal: Paddings.default,
    textTransform: "uppercase",
  },
  version: {
    alignSelf: "center",
    color: Colors.commonText,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.light),
    fontSize: Sizes.xs,
    paddingBottom: Paddings.default,
  },
});

export default Menu;
