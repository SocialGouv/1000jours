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
import Icomoon, { IcomoonIcons } from "../components/Icomoon";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
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

const Navigation: FC<NavigationProps> = ({ colorScheme }) => (
  <NavigationContainer
    linking={LinkingConfiguration}
    theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
  >
    <RootNavigator />
  </NavigationContainer>
);

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="loading" component={LoadingScreen} />
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
          <TouchableOpacity
            style={[styles.headerRight]}
            onPress={() => {
              console.log("Open menu");
            }}
          >
            <Icomoon
              name={IcomoonIcons.menu}
              size={5}
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
            <Text>{Labels.appName}</Text>
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
