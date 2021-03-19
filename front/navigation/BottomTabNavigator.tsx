import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";

import IconeAccueil from "../assets/images/icone accueil.svg";
import IconeAutourDeMoi from "../assets/images/icone autour de moi.svg";
import IconeCalendrier from "../assets/images/icone calendrier.svg";
import IconeFavoris from "../assets/images/icone favoris.svg";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabAroundMeScreen from "../screens/TabAroundMeScreen";
import TabCalendarScreen from "../screens/TabCalendarScreen";
import TabFavoritesScreen from "../screens/TabFavoritesScreen";
import TabHomeScreen from "../screens/TabHomeScreen";
import type {
  BottomTabParamList,
  TabAroundMeParamList,
  TabCalendarParamList,
  TabFavoritesParamList,
  TabHomeParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: FC = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="tabHome"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="tabHome"
        component={TabHomeNavigator}
        options={{
          tabBarIcon: () => <IconeAccueil height={30} />,
          title: "Accueil",
        }}
      />
      <BottomTab.Screen
        name="tabCalendar"
        component={TabCalendarNavigator}
        options={{
          tabBarIcon: () => <IconeCalendrier height={30} />,
          title: "Calendrier",
        }}
      />
      <BottomTab.Screen
        name="tabFavorites"
        component={TabFavoritesNavigator}
        options={{
          tabBarIcon: () => <IconeFavoris height={30} />,
          title: "Favoris",
        }}
      />
      <BottomTab.Screen
        name="tabAroundMe"
        component={TabAroundMeNavigator}
        options={{
          tabBarIcon: () => <IconeAutourDeMoi height={30} />,
          title: "Autour de moi",
        }}
      />
    </BottomTab.Navigator>
  );
};

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const TabHomeStack = createStackNavigator<TabHomeParamList>();
const TabHomeNavigator: FC = () => (
  <TabHomeStack.Navigator screenOptions={{ headerShown: false }}>
    <TabHomeStack.Screen
      name="tabHomeScreen"
      component={TabHomeScreen}
      options={{}}
    />
  </TabHomeStack.Navigator>
);

const TabCalendarStack = createStackNavigator<TabCalendarParamList>();
const TabCalendarNavigator: FC = () => (
  <TabCalendarStack.Navigator screenOptions={{ headerShown: false }}>
    <TabCalendarStack.Screen
      name="tabCalendarScreen"
      component={TabCalendarScreen}
      options={{}}
    />
  </TabCalendarStack.Navigator>
);

const TabFavoritesStack = createStackNavigator<TabFavoritesParamList>();
const TabFavoritesNavigator: FC = () => (
  <TabFavoritesStack.Navigator screenOptions={{ headerShown: false }}>
    <TabFavoritesStack.Screen
      name="tabFavoritesScreen"
      component={TabFavoritesScreen}
      options={{}}
    />
  </TabFavoritesStack.Navigator>
);

const TabAroundMeStack = createStackNavigator<TabAroundMeParamList>();
const TabAroundMeNavigator: FC = () => (
  <TabAroundMeStack.Navigator screenOptions={{ headerShown: false }}>
    <TabAroundMeStack.Screen
      name="tabAroundMeScreen"
      component={TabAroundMeScreen}
      options={{}}
    />
  </TabAroundMeStack.Navigator>
);

export default BottomTabNavigator;
