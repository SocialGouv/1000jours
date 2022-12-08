import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import type { FC } from "react";
import { useCallback, useState } from "react";
import * as React from "react";
import type { ColorSchemeName } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ConditionsOfUse, InfosDev, LegalNotice, Menu } from "../components";
import { BaseAssets } from "../components/assets";
import {
  Backdrop,
  Icomoon,
  IcomoonIcons,
  Text,
  View,
} from "../components/baseComponents";
import NotificationHandler from "../components/notification/notificationHandler.component";
import { Labels } from "../constants";
import { LoadingScreen, Moodboard, Onboarding, Profile } from "../screens";
import RecosanteWidget from "../screens/recosante/recosanteWidget.component";
import { Colors, Paddings, Sizes } from "../styles";
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

  const onBackdropPressed = useCallback(() => {
    setShowMenu(false);
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={LinkingConfiguration}
      theme={getAppTheme(colorScheme)}
    >
      <RootNavigator onPressMenu={setShowMenu} />
      <Backdrop isVisible={showMenu} onPress={onBackdropPressed} />
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
  return (
    <Stack.Navigator
      initialRouteName="loading"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="loading" component={LoadingScreen} />
      <Stack.Screen name="onboarding" component={Onboarding} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="recosante" component={RecosanteWidget} />
      <Stack.Screen name="moodboard" component={Moodboard} />
      <Stack.Screen name="legalNotice" component={LegalNotice} />
      <Stack.Screen name="conditionsOfUse" component={ConditionsOfUse} />
      <Stack.Screen name="infosDev" component={InfosDev} />
      <Stack.Screen
        name="root"
        component={BottomTabNavigator}
        options={{
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
              <Text
                style={[styles.headerRightButtonText]}
                allowFontScaling={false}
              >
                {Labels.menu.title}
              </Text>
            </TouchableOpacity>
          ),
          headerShown: true,
          headerTitle: () => (
            <BaseAssets.AppLogo height={Sizes.xxxl} width={Sizes.xxxl} />
          ),
          headerTitleAlign: "center",
        }}
      />
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
