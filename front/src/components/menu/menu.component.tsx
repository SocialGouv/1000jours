import type { BottomSheetFlatListMethods } from "@gorhom/bottom-sheet";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import type { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import Constants from "expo-constants";
import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { Linking, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

import { Labels, PlatformConstants } from "../../constants";
import { emailContact } from "../../constants/email.constants";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Paddings,
  Sizes,
} from "../../styles";
import type { TrackerEvent } from "../../type";
import type { MenuItem, MenuSubItem } from "../../types";
import {
  LinkingUtils,
  RootNavigation,
  ShareUtils,
  TrackerUtils,
} from "../../utils";
import { Icomoon, IcomoonIcons, View } from "../baseComponents";
import TrackerHandler from "../tracker/trackerHandler.component";
import MenuAccordionItem from "./menuItem.component";

interface Props {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
}

const NB_PRESS_TO_UNLOCK_ACTION = 5;

const Menu: React.FC<Props> = ({ showMenu, setShowMenu }) => {
  const counterPressVersion = useRef(0);
  const [trackerEventObject, setTrackerEventObject] = useState<TrackerEvent>();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const flatListRef = useRef<BottomSheetFlatListMethods>(null);

  const closeMenu = useCallback(() => {
    counterPressVersion.current = 0;
    bottomSheetRef.current?.close();
  }, []);

  const onVersionPress = useCallback(() => {
    if (counterPressVersion.current > NB_PRESS_TO_UNLOCK_ACTION) {
      counterPressVersion.current = 0;
      closeMenu();
      // Sur iOS, sans le "setTimeout" la modal n'apparaît pas, il faut attendre la fermeture du menu.
      setTimeout(() => {
        void RootNavigation.navigate("infosDev");
      }, PlatformConstants.TIMEOUT_ON_DISMISS_MENU);
    } else {
      counterPressVersion.current++;
    }
  }, [closeMenu]);

  const menuItems: MenuItem[] = useMemo(() => {
    return [
      {
        accessibilityRole: "header",
        style: styles.title,
        title: Labels.menu.title,
      },
      {
        icon: IcomoonIcons.modifier,
        onPress: () => {
          closeMenu();
          void LinkingUtils.goToStore();
        },
        title: Labels.menu.addReview,
      },
      {
        icon: IcomoonIcons.partager,
        onPress: () => {
          closeMenu();
          void ShareUtils.share(
            Labels.share.app.title,
            Labels.share.app.message,
            undefined,
            () => {
              setTrackerEventObject({
                action: TrackerUtils.TrackingEvent.SHARE,
                name: `${Labels.menu.title} : ${Labels.menu.recommendApp}`,
              });
            }
          );
        },
        title: Labels.menu.recommendApp,
      },
      {
        icon: IcomoonIcons.profil,
        onPress: () => {
          closeMenu();
          void RootNavigation.navigate("profile");
        },
        title: Labels.menu.myProfil,
      },
      {
        icon: IcomoonIcons.postPartum,
        onPress: () => {
          closeMenu();
          void RootNavigation.navigate("tndSurvey");
        },
        title: Labels.menu.tndSurvey,
      },
      {
        icon: IcomoonIcons.favoris,
        onPress: () => {
          closeMenu();
          void RootNavigation.navigate("articleFavorites");
        },
        title: Labels.menu.myFavorites,
      },
      {
        icon: IcomoonIcons.bebe,
        onPress: () => {
          closeMenu();
          void RootNavigation.navigate("moodboard");
        },
        title: Labels.menu.moodboard,
      },
      {
        icon: IcomoonIcons.stepParentheque,
        onPress: () => {
          closeMenu();
          void RootNavigation.navigate("parentheque");
        },
        title: Labels.menu.parentheque,
      },
      {
        icon: IcomoonIcons.notification,
        onPress: () => {
          closeMenu();
          void RootNavigation.navigate("notificationsCenter");
        },
        title: Labels.menu.notificationsCenter,
      },
      // {
      //   icon: IcomoonIcons.email,
      //   onPress: () => {
      //     closeMenu();
      //     void Linking.openURL(`mailto:${emailContact}`);
      //   },
      //   title: Labels.menu.contactUs,
      // },
      {
        icon: IcomoonIcons.politiquesConfidentialite,
        subItems: [
          {
            onPress: () => {
              closeMenu();
              void RootNavigation.navigate("legalNotice");
            },
            title: Labels.menu.legalNotice,
          },
          {
            onPress: () => {
              closeMenu();
              void RootNavigation.navigate("conditionsOfUse");
            },
            title: Labels.menu.conditionsOfUse,
          },
          {
            onPress: () => {
              closeMenu();
              void RootNavigation.navigate("accessibility");
            },
            title: Labels.menu.accessibility,
          },
          {
            onPress: () => {
              closeMenu();
              void RootNavigation.navigate("newFeatures");
            },
            title: Labels.menu.newFeatures,
          },
        ],
        title: Labels.menu.information,
      },
      {
        accessibilityLabel: `${Labels.accessibility.version}${Constants.expoConfig?.version}`,
        noBottomDivider: true,
        onPress: () => {
          onVersionPress();
        },
        style: styles.version,
        title: `${Labels.version}${Constants.expoConfig?.version}`,
      },
    ];
  }, [closeMenu, onVersionPress]);

  const updateShowMenu = useCallback(
    (showM: boolean) => () => {
      setShowMenu(showM);
    },
    [setShowMenu]
  );

  const onListItemPressed = useCallback(
    (menuItem: MenuItem | MenuSubItem) => () => {
      if (menuItem.onPress) {
        // Sur iOS, sans le "setTimeout" la modal n'apparaît pas, il faut attendre la fermeture du menu.
        setTimeout(menuItem.onPress, PlatformConstants.TIMEOUT_ON_DISMISS_MENU);
      }
    },
    []
  );

  const listItem = useCallback(
    (menuItem: MenuItem) => (
      <ListItem
        onPress={onListItemPressed(menuItem)}
        accessibilityRole={menuItem.accessibilityRole ?? "button"}
        accessibilityLabel={menuItem.accessibilityLabel ?? menuItem.title}
        bottomDivider={menuItem.noBottomDivider ? false : true}
      >
        {menuItem.icon && (
          <View style={styles.menuItemIcon}>
            <Icomoon
              name={menuItem.icon}
              size={Sizes.xl}
              color={Colors.primaryBlueDark}
            />
          </View>
        )}
        <ListItem.Content>
          <ListItem.Title
            style={menuItem.style ?? styles.menuItemTitle}
            allowFontScaling={false}
          >
            {menuItem.title}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    ),
    [onListItemPressed]
  );

  const keyExtractor = useCallback((item: MenuItem) => item.title, []);
  const renderItem = useCallback(
    ({ item }: { item: MenuItem }) =>
      item.subItems ? (
        <MenuAccordionItem
          accordionItem={item}
          onListItemPressed={onListItemPressed}
        />
      ) : (
        listItem(item)
      ),
    [listItem, onListItemPressed]
  );

  const renderContent = useCallback(
    () => (
      <BottomSheetFlatList
        ref={flatListRef}
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
      />
    ),
    [menuItems, renderItem, keyExtractor]
  );

  const snapPoints = ["60%", "90%"];

  const renderBackdrop = useCallback(
    (
      props: BottomSheetDefaultBackdropProps & React.JSX.IntrinsicAttributes
    ) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return showMenu ? (
    <>
      <TrackerHandler eventObject={trackerEventObject} />
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onClose={updateShowMenu(false)}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >
        {renderContent}
      </BottomSheet>
    </>
  ) : null;
};

const styles = StyleSheet.create({
  contentContainer: { backgroundColor: "white" },
  menuItemIcon: {
    backgroundColor: "transparent",
    paddingLeft: Paddings.default,
    paddingRight: Paddings.smallest,
  },
  menuItemTitle: {
    color: Colors.primaryBlueDark,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.medium),
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
