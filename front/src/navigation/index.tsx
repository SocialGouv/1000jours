import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import type * as Notifications from "expo-notifications";
import type { FC } from "react";
import * as React from "react";
import type { ColorSchemeName } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";

import LogoMinistere from "../assets/images/Logo ministere.svg";
import AppLogo from "../assets/images/logo.svg";
import {
  Backdrop,
  Icomoon,
  IcomoonIcons,
  Menu,
  Text,
  View,
} from "../components";
import Notification from "../components/base/notification.component";
import ConditionsOfUse from "../components/menu/conditionsOfUse.component";
import LegalNotice from "../components/menu/legalNotice.component";
import { Colors, Labels, Paddings, Sizes } from "../constants";
import LoadingScreen from "../screens/LoadingScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import Onboarding from "../screens/Onboarding";
import Profile from "../screens/Profile";
import type { RootStackParamList } from "../../types";
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
  const [showMenu, setShowMenu] = React.useState(false);

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
        navigation={navigationRef}
      />
      {notification ? (
        <Notification
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
