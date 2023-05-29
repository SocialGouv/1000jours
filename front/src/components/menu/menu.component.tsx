import Constants from "expo-constants";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { Linking, Modal, ScrollView, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import GestureRecognizer from "react-native-swipe-gestures";
import BottomSheet from "reanimated-bottom-sheet";

import { Labels, PlatformConstants } from "../../constants";
import { emailContact } from "../../constants/email.constants";
import { SCREEN_HEIGHT } from "../../constants/platform.constants";
import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
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

interface Props {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
}

const MAX_HEIGHT = SCREEN_HEIGHT * 0.9;
const NB_PRESS_TO_UNLOCK_ACTION = 5;

const Menu: React.FC<Props> = ({ showMenu, setShowMenu }) => {
  const [showInformation, setShowInformation] = useState(false);
  const [counterPressVersion, setCounterPressVersion] = useState(0);
  const [trackerEventObject, setTrackerEventObject] = useState<TrackerEvent>();

  const menuItems: MenuItem[] = useMemo(() => {
    return [
      {
        icon: IcomoonIcons.modifier,
        onPress: () => {
          void LinkingUtils.goToStore();
        },
        title: Labels.menu.addReview,
      },
      {
        icon: IcomoonIcons.partager,
        onPress: () => {
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
          void RootNavigation.navigate("profile");
        },
        title: Labels.menu.myProfil,
      },
      {
        icon: IcomoonIcons.postPartum,
        onPress: () => {
          void RootNavigation.navigate("tndSurvey");
        },
        title: Labels.menu.tndSurvey,
      },
      {
        icon: IcomoonIcons.favoris,
        onPress: () => {
          void RootNavigation.navigate("articleFavorites");
        },
        title: Labels.menu.myFavorites,
      },
      {
        icon: IcomoonIcons.bebe,
        onPress: () => {
          void RootNavigation.navigate("moodboard");
        },
        title: Labels.menu.moodboard,
      },
      {
        icon: IcomoonIcons.stepParentheque,
        onPress: () => {
          void RootNavigation.navigate("parentheque");
        },
        title: Labels.menu.parentheque,
      },
      {
        icon: IcomoonIcons.notification,
        onPress: () => {
          void RootNavigation.navigate("notificationsCenter");
        },
        title: Labels.menu.notificationsCenter,
      },
      {
        icon: IcomoonIcons.email,
        onPress: () => {
          void Linking.openURL(`mailto:${emailContact}`);
        },
        title: Labels.menu.contactUs,
      },
      {
        icon: IcomoonIcons.politiquesConfidentialite,
        onPress: () => {
          setShowInformation(true);
        },
        subItems: [
          {
            onPress: () => {
              void RootNavigation.navigate("legalNotice");
            },
            title: Labels.menu.legalNotice,
          },
          {
            onPress: () => {
              void RootNavigation.navigate("conditionsOfUse");
            },
            title: Labels.menu.conditionsOfUse,
          },
          {
            onPress: () => {
              void RootNavigation.navigate("accessibility");
            },
            title: Labels.menu.accessibility,
          },
          {
            onPress: () => {
              void RootNavigation.navigate("newFeatures");
            },
            title: Labels.menu.newFeatures,
          },
        ],
        title: Labels.menu.information,
      },
    ];
  }, []);

  const updateShowMenu = useCallback(
    (showM: boolean) => () => {
      setShowMenu(showM);
    },
    [setShowMenu]
  );

  const updateShowInformation = useCallback(() => {
    setShowInformation(!showInformation);
  }, [showInformation]);

  const onListItemPressed = useCallback(
    (menuItem: MenuItem | MenuSubItem) => () => {
      setShowMenu(false);
      // Sur iOS, sans le "setTimeout" la modal n'apparaît pas, il faut attendre la fermeture du menu.
      setTimeout(menuItem.onPress, PlatformConstants.TIMEOUT_ON_DISMISS_MENU);
    },
    [setShowMenu]
  );

  const onVersionPress = useCallback(() => {
    if (counterPressVersion > NB_PRESS_TO_UNLOCK_ACTION) {
      setCounterPressVersion(0);
      setShowMenu(false);
      // Sur iOS, sans le "setTimeout" la modal n'apparaît pas, il faut attendre la fermeture du menu.
      setTimeout(() => {
        void RootNavigation.navigate("infosDev");
      }, PlatformConstants.TIMEOUT_ON_DISMISS_MENU);
    } else {
      setCounterPressVersion(counterPressVersion + 1);
    }
  }, [counterPressVersion, setShowMenu]);

  const listItemAccordion = useCallback(
    (menuItem: MenuItem) => (
      <ListItem.Accordion
        accessibilityLabel={menuItem.title}
        accessibilityRole="button"
        accessibilityState={{
          expanded: showInformation,
        }}
        content={
          <>
            <View style={styles.menuItemIcon}>
              <Icomoon
                name={menuItem.icon}
                size={Sizes.xl}
                color={Colors.primaryBlueDark}
              />
            </View>
            <ListItem.Content>
              <ListItem.Title
                style={[styles.menuItemTitle, { marginStart: Margins.default }]}
                allowFontScaling={false}
              >
                {menuItem.title}
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={showInformation}
        onPress={updateShowInformation}
      >
        {menuItem.subItems?.map((subItem, subIndex) => (
          <ListItem key={`sub${subIndex}`} onPress={onListItemPressed(subItem)}>
            <ListItem.Content>
              <ListItem.Title
                style={styles.menuItemSubTitle}
                allowFontScaling={false}
              >
                {subItem.title}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ListItem.Accordion>
    ),
    [onListItemPressed, showInformation, updateShowInformation]
  );

  const listItem = useCallback(
    (menuItem: MenuItem) => (
      <ListItem
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
          <ListItem.Title style={styles.menuItemTitle} allowFontScaling={false}>
            {menuItem.title}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    ),
    [onListItemPressed]
  );

  const renderContent = useCallback(
    () => (
      <Modal animationType="slide" transparent={true} visible={showMenu}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <GestureRecognizer
              onSwipeUp={updateShowMenu(true)}
              onSwipeDown={updateShowMenu(false)}
            >
              <View
                style={styles.swipeIndicatorContainer}
                accessibilityRole="button"
                accessible
                accessibilityLabel={Labels.accessibility.closeMenu}
                onTouchEnd={updateShowMenu(false)}
              >
                <View style={styles.swipeIndicator} />
              </View>
            </GestureRecognizer>
            <ScrollView style={styles.scrollView}>
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
                <View key={index}>
                  {menuItem.subItems
                    ? listItemAccordion(menuItem)
                    : listItem(menuItem)}
                </View>
              ))}
              {/* App Version */}
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title
                    style={styles.version}
                    accessibilityLabel={`${Labels.accessibility.version}${Constants.expoConfig?.version}`}
                    onPress={onVersionPress}
                  >
                    {`${Labels.version}${Constants.expoConfig?.version}`}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </ScrollView>
          </View>
        </View>
      </Modal>
    ),
    [
      showMenu,
      updateShowMenu,
      menuItems,
      onVersionPress,
      listItemAccordion,
      listItem,
    ]
  );

  const snapPoints = [MAX_HEIGHT, MAX_HEIGHT / 1.5, 0];
  const sheetRef = React.useRef<BottomSheet>(null);

  return showMenu ? (
    <>
      <TrackerHandler eventObject={trackerEventObject} />
      <BottomSheet
        ref={sheetRef}
        initialSnap={0}
        snapPoints={snapPoints}
        borderRadius={Sizes.xl}
        renderContent={renderContent}
        onCloseEnd={updateShowMenu(false)}
        enabledContentTapInteraction={false}
      />
    </>
  ) : null;
};

const styles = StyleSheet.create({
  menuItemIcon: {
    backgroundColor: "transparent",
    paddingLeft: Paddings.default,
    paddingRight: Paddings.smallest,
  },
  menuItemSubTitle: {
    color: Colors.primaryBlueDark,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.medium),
    paddingLeft: Paddings.subItemMenu,
  },
  menuItemTitle: {
    color: Colors.primaryBlueDark,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.medium),
  },
  menuItemToto: {
    color: Colors.primaryBlueDark,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.medium),
  },
  modalContent: {
    backgroundColor: "transparent",
    maxHeight: MAX_HEIGHT,
  },
  modalView: {
    backgroundColor: Colors.transparentGrey,
    flex: 1,
    justifyContent: "flex-end",
  },
  scrollView: { backgroundColor: "white" },
  swipeIndicator: {
    alignSelf: "center",
    backgroundColor: Colors.navigation,
    borderRadius: Sizes.xs,
    height: Sizes.xxxxxxs,
    marginBottom: Margins.light,
    marginTop: Margins.larger,
    width: Sizes.xxxl,
  },
  swipeIndicatorContainer: {
    borderTopLeftRadius: Sizes.mmd,
    borderTopRightRadius: Sizes.mmd,
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
