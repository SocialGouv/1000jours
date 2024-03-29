import { NavigationContainer } from "@react-navigation/native";
import type { StackNavigationOptions } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";
import type { FC } from "react";
import { useCallback, useState } from "react";
import * as React from "react";
import type { ColorSchemeName } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ConditionsOfUse, InfosDev, LegalNotice, Menu } from "../components";
import NewFeatures from "../components/app/newFeatures.component";
import { BaseAssets } from "../components/assets";
import {
  Icomoon,
  IcomoonIcons,
  Text,
  View,
} from "../components/baseComponents";
import Accessibility from "../components/menu/accessibility.component";
import NotificationHandler from "../components/notification/notificationHandler.component";
import { Labels } from "../constants";
import {
  LoadingScreen,
  Moodboard,
  NotificationsCenter,
  Onboarding,
  Profile,
} from "../screens";
import EpdsSurveyScreen from "../screens/epdsSurvey/epdsScreen.component";
import TndSurveyScreen from "../screens/tndSurvey/tndSurveyScreen.component";
import { Colors, FontWeight, Paddings, Sizes } from "../styles";
import type { RootStackParamList } from "../types";
import { getAppTheme } from "../utils";
import { navigationRef } from "../utils/rootNavigation.util";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

interface NavigationProps {
  colorScheme: ColorSchemeName;
}

const Navigation: FC<NavigationProps> = ({ colorScheme }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={LinkingConfiguration}
      theme={getAppTheme(colorScheme)}
    >
      <RootNavigator onPressMenu={setShowMenu} />
      <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
      <NotificationHandler />
    </NavigationContainer>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

interface RootNavigatorProps {
  onPressMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
const RootNavigator: FC<RootNavigatorProps> = ({ onPressMenu }) => {
  const onHeaderRightPressed = useCallback(() => {
    onPressMenu(true);
  }, [onPressMenu]);

  const rootScreenOptions: StackNavigationOptions = {
    headerLeft: () => (
      <View style={[styles.headerLeft]}>
        <BaseAssets.LogoMinistere
          height={Sizes.xxxl}
          style={styles.logoMinistere}
        />
      </View>
    ),
    headerRight: () => (
      <TouchableOpacity
        style={[styles.headerRight]}
        onPress={onHeaderRightPressed}
        accessibilityRole="button"
        accessibilityLabel={Labels.menu.title}
      >
        <Icomoon
          name={IcomoonIcons.menu}
          size={Sizes.lg}
          color={Colors.primaryBlue}
          style={styles.menuIcon}
        />
        <Text style={[styles.headerRightButtonText]} allowFontScaling={false}>
          {Labels.menu.title}
        </Text>
      </TouchableOpacity>
    ),
    headerShown: true,
    headerTitle: () => (
      <BaseAssets.AppLogo height={Sizes.xxxl} width={Sizes.xxxl} />
    ),
    headerTitleAlign: "center",
  };

  const modalScreenOptions: StackNavigationOptions = {
    headerBackAccessibilityLabel: Labels.buttons.close,
    headerBackImage: () => <Icomoon name={IcomoonIcons.fermer} />,
    headerBackTitle: Labels.buttons.close,
    headerBackTitleStyle: {
      fontWeight: FontWeight.semibold,
      paddingLeft: Paddings.smaller,
    },
    headerBackTitleVisible: true,
    headerLeftContainerStyle: {
      paddingLeft: Paddings.smaller,
    },
    headerTintColor: Colors.primaryBlueDark,
    headerTitle: "",
    presentation: "modal",
  };

  return (
    <Stack.Navigator initialRouteName="loading">
      {/* SCREENS */}
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="loading" component={LoadingScreen} />
        <Stack.Screen name="onboarding" component={Onboarding} />
        <Stack.Screen
          name="root"
          component={BottomTabNavigator}
          options={rootScreenOptions}
        />
      </Stack.Group>

      {/* MODALS */}
      <Stack.Group screenOptions={modalScreenOptions}>
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="moodboard" component={Moodboard} />
        <Stack.Screen name="legalNotice" component={LegalNotice} />
        <Stack.Screen name="conditionsOfUse" component={ConditionsOfUse} />
        <Stack.Screen name="accessibility" component={Accessibility} />
        <Stack.Screen name="infosDev" component={InfosDev} />
        <Stack.Screen
          name="notificationsCenter"
          component={NotificationsCenter}
        />
        <Stack.Screen name="epdsSurvey" component={EpdsSurveyScreen} />
        <Stack.Screen name="tndSurvey" component={TndSurveyScreen} />
        <Stack.Screen name="newFeatures" component={NewFeatures} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    paddingLeft: Paddings.default,
  },
  headerRight: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: Paddings.default,
  },
  headerRightButtonText: {
    color: Colors.primaryBlue,
    fontSize: Sizes.xs,
    paddingTop: Paddings.smallest,
  },
  logoMinistere: {
    aspectRatio: 1,
  },
  menuIcon: {
    height: Sizes.xs,
  },
});

export default Navigation;
