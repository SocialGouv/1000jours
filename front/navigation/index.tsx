import type { NavigationContainerRef } from "@react-navigation/native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import type { ColorSchemeName } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";

import LogoMinistere from "../assets/images/Logo ministere.svg";
import AppLogo from "../assets/images/logo.svg";
import Backdrop from "../components/Backdrop";
import Icomoon, { IcomoonIcons } from "../components/Icomoon";
import Menu from "../components/Menu";
import { Text, View } from "../components/Themed";
import { Sizes } from "../constants";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import ConditionsOfUse from "../screens/ConditionsOfUse";
import LegalNotice from "../screens/LegalNotice";
import LoadingScreen from "../screens/LoadingScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import Onboarding from "../screens/Onboarding";
import Profile from "../screens/Profile";
import type { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

interface NavigationProps {
  colorScheme: ColorSchemeName;
}

const Navigation: FC<NavigationProps> = ({ colorScheme }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const navigationRef = React.useRef<NavigationContainerRef>(null);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
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
        navigation={navigationRef.current}
      />
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
            <LogoMinistere />
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity
            style={[styles.headerRight]}
            onPress={() => {
              onPressMenu(true);
            }}
          >
            <Icomoon
              name={IcomoonIcons.menu}
              size={Sizes.xxxxxxs}
              color={Colors.primaryBlue}
            />
            <Text style={[styles.headerRightButtonText]}>
              {Labels.menu.title}
            </Text>
          </TouchableOpacity>
        ),
        headerShown: true,
        headerTitle: () => (
          <View
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <AppLogo height={30} />
          </View>
        ),
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
    paddingLeft: 15,
  },
  headerRight: {
    alignItems: "center",
    paddingRight: 15,
  },
  headerRightButtonText: {
    color: Colors.primaryBlue,
    paddingTop: 5,
  },
});

export default Navigation;
