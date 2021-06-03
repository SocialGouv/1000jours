import type { NavigationContainerRef } from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import BottomSheet from "reanimated-bottom-sheet";

import {
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
} from "../constants";
import { ConditionsOfUse, LegalNotice } from "../screens";
import type { MenuItem } from "../types";
import { Icomoon } from ".";
import { IcomoonIcons } from "./icomoon.component";
import { FontNames, getFontFamilyName } from "./StyledText";
import { View } from "./Themed";

interface Props {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
  navigation: NavigationContainerRef | null;
}

const Menu: React.FC<Props> = ({ showMenu, setShowMenu, navigation }) => {
  const [showLegalNotice, setShowLegalNotice] = React.useState(false);
  const [showConditionsOfUse, setShowConditionsOfUse] = React.useState(false);

  const menuItems: MenuItem[] = [
    {
      icon: IcomoonIcons.profil,
      onPress: () => {
        navigation?.navigate("profile");
      },
      title: Labels.menu.myProfil,
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
  ];

  const renderContent = () => (
    <View style={styles.menuContainer}>
      <View>
        <View style={styles.swipeIndicator}></View>
      </View>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={styles.title}>
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
            <ListItem.Title style={styles.menuItemTitle}>
              {menuItem.title}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
  const sheetRef = React.useRef<BottomSheet>(null);

  useEffect(() => {
    if (showMenu && sheetRef.current) sheetRef.current.snapTo(0);
  }, [showMenu]);

  return showMenu ? (
    <BottomSheet
      ref={sheetRef}
      snapPoints={["50%", "25%", 0]}
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
  ) : null;
};

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: "white",
    height: "100%",
    opacity: 1,
  },
  menuItemIcon: {
    paddingLeft: Paddings.default,
    paddingRight: Paddings.smallest,
  },
  menuItemTitle: {
    color: Colors.primaryBlueDark,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.medium),
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
});

export default Menu;
