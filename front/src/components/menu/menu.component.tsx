import Constants from "expo-constants";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { Dimensions, Linking, Modal, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import GestureRecognizer from "react-native-swipe-gestures";
import BottomSheet from "reanimated-bottom-sheet";

import { Labels, PlatformConstants } from "../../constants";
import { emailContact } from "../../constants/email.constants";
import { reviewTypeForm } from "../../constants/links.constants";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
  Paddings,
  Sizes,
} from "../../styles";
import type { MenuItem } from "../../types";
import { RootNavigation } from "../../utils";
import { Icomoon, IcomoonIcons, View } from "../baseComponents";
import Accessibility from "./accessibility.component";
import ConditionsOfUse from "./conditionsOfUse.component";
import LegalNotice from "./legalNotice.component";

interface Props {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
}

const Menu: React.FC<Props> = ({ showMenu, setShowMenu }) => {
  const [showLegalNotice, setShowLegalNotice] = React.useState(false);
  const [showConditionsOfUse, setShowConditionsOfUse] = React.useState(false);
  const [showAccessibility, setShowAccessibility] = React.useState(false);

  const menuItems: MenuItem[] = useMemo(() => {
    return [
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
          void RootNavigation.navigate("profile", null);
        },
        title: Labels.menu.myProfil,
      },
      {
        icon: IcomoonIcons.stepParentheque,
        onPress: () => {
          void RootNavigation.navigate("parentheque", undefined);
        },
        title: Labels.timeline.library.nom,
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
  }, []);

  const updateShowMenu = useCallback(
    (showM: boolean) => () => {
      setShowMenu(showM);
    },
    [setShowMenu]
  );

  const onListItemPressed = useCallback(
    (menuItem: MenuItem) => () => {
      setShowMenu(false);
      // Sur iOS, sans le "setTimeout" la modal n'apparaît pas, il faut attendre la fermeture du menu.
      setTimeout(menuItem.onPress, PlatformConstants.PLATFORM_IS_IOS ? 200 : 0);
    },
    [setShowMenu]
  );

  const renderContent = useCallback(
    () => (
      <GestureRecognizer
        style={{ flex: 1 }}
        onSwipeUp={updateShowMenu(true)}
        onSwipeDown={updateShowMenu(false)}
      >
        <Modal animationType="slide" transparent={true} visible={showMenu}>
          <View style={styles.modalView}>
            <View
              style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
              accessibilityRole="button"
              accessible
              accessibilityLabel={Labels.accessibility.closeMenu}
              onTouchEnd={updateShowMenu(false)}
            >
              <View style={styles.swipeIndicator} />
            </View>
            <View>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title
                    style={styles.title}
                    accessibilityRole="header"
                  >
                    {Labels.menu.title}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
              {menuItems.map((menuItem, index) => (
                <ListItem
                  key={index}
                  onPress={onListItemPressed(menuItem)}
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
    ),
    [menuItems, onListItemPressed, showMenu, updateShowMenu]
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
      onCloseEnd={updateShowMenu(false)}
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
    backgroundColor: Colors.transparentGrey,
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
