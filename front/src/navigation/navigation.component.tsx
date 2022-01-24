import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import type * as Notifications from "expo-notifications";
import type { FC } from "react";
import { useState } from "react";
import * as React from "react";
import type { ColorSchemeName } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";

import LogoMinistere from "../assets/images/Logo ministere.svg";
import AppLogo from "../assets/images/logo.svg";
import {
  Backdrop,
  ConditionsOfUse,
  Icomoon,
  IcomoonIcons,
  LegalNotice,
  Menu,
  NotificationModal,
  Text,
  View,
} from "../components";
import { Colors, Labels, Paddings, Sizes } from "../constants";
import { LoadingScreen, NotFoundScreen, Onboarding, Profile } from "../screens";
import type { RootStackParamList } from "../types";
import { getAppTheme } from "../utils";
import { navigationRef } from "../utils/rootNavigation.util";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

interface NavigationProps {
  colorScheme: ColorSchemeName;
  notification: Notifications.Notification | null;
  setNotification: (
    value: React.SetStateAction<Notifications.Notification | null>
  ) => void;
}

const Navigation: FC<NavigationProps> = ({
  colorScheme,
  notification,
  setNotification,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={LinkingConfiguration}
      theme={getAppTheme(colorScheme)}
    >
      <RootNavigator onPressMenu={setShowMenu} />
      <Backdrop
        isVisible={showMenu}
        onPress={() => {
          setShowMenu(false);
        }}
      />
      <Menu
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        navigation={navigationRef}
      />
      {notification ? (
        <NotificationModal
          notification={notification}
          onDismiss={() => {
            setNotification(null);
          }}
        />
      ) : null}
    </NavigationContainer>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

interface RootNavigatorProps {
  onPressMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
const RootNavigator: FC<RootNavigatorProps> = ({ onPressMenu }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="loading" component={LoadingScreen} />
    <Stack.Screen name="onboarding" component={Onboarding} />
    <Stack.Screen name="profile" component={Profile} />
    <Stack.Screen name="legalNotice" component={LegalNotice} />
    <Stack.Screen name="conditionsOfUse" component={ConditionsOfUse} />
    <Stack.Screen
      name="root"
      component={BottomTabNavigator}
      options={{
        headerLeft: () => (
          <View style={[styles.headerLeft]}>
            <LogoMinistere height={Sizes.xxxl} style={styles.logoMinistere} />
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity
            style={[styles.headerRight]}
            onPress={() => {
              onPressMenu(true);
            }}
            accessibilityRole="button"
            accessibilityLabel={Labels.menu.title}
          >
            <Icomoon
              name={IcomoonIcons.menu}
              size={Sizes.xxxxxs}
              color={Colors.primaryBlue}
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
        headerTitle: () => <AppLogo height={Sizes.xxxl} width={Sizes.xxxl} />,
        headerTitleAlign: "center",
      }}
    />
    <Stack.Screen
      name="notFound"
      component={NotFoundScreen}
      options={{ title: "Oops!" }}
    />
  </Stack.Navigator>
);

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
});

export default Navigation;