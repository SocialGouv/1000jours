import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import type { ColorSchemeName } from "react-native";
import { StyleSheet } from "react-native";

import IconeMenu from "../assets/images/icone menu.svg";
import LogoMinistere from "../assets/images/Logo ministere.svg";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import NotFoundScreen from "../screens/NotFoundScreen";
import Onboarding from "../screens/Onboarding";
import Profile from "../screens/Profile";
import type { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

interface NavigationProps {
  colorScheme: ColorSchemeName;
}

const Navigation: FC<NavigationProps> = ({ colorScheme }) => {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
};

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="onboarding" component={Onboarding} />
    <Stack.Screen name="profile" component={Profile} />
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
          <View
            style={[styles.headerRight]}
            onTouchEnd={() => {
              console.log("Open menu");
            }}
          >
            <IconeMenu width="28" />
            <Text style={[styles.headerRightButtonText]}>Menu</Text>
          </View>
        ),
        headerShown: true,
        headerTitle: "1000j",
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
