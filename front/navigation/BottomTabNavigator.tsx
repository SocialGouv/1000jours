import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";

import Icomoon, { IcomoonIcons } from "../components/icomoon.component";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import {
  ArticleDetail,
  EpdsSurveyScreen,
  ListArticles,
  TabAroundMeScreen,
  TabCalendarScreen,
  TabFavoritesScreen,
  TabHomeScreen,
} from "../screens";
import type {
  BottomTabParamList,
  TabAroundMeParamList,
  TabCalendarParamList,
  TabFavoritesParamList,
  TabHomeParamList,
  TabItem,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: FC = () => {
  const iconSize = 22;
  const tabItems: TabItem[] = [
    {
      component: TabHomeNavigator,
      getIcon: (tintColor) => (
        <Icomoon
          name={IcomoonIcons.accueil}
          color={tintColor}
          size={iconSize}
        />
      ),
      name: "tabHome",
      title: Labels.tabs.homeTitle,
    },
    {
      component: TabCalendarNavigator,
      getIcon: (tintColor) => (
        <Icomoon
          name={IcomoonIcons.calendrier}
          color={tintColor}
          size={iconSize}
        />
      ),
      name: "tabCalendar",
      title: Labels.tabs.calendarTitle,
    },
    {
      component: TabFavoritesNavigator,
      getIcon: (tintColor) => (
        <Icomoon
          name={IcomoonIcons.favoris}
          color={tintColor}
          size={iconSize}
        />
      ),
      name: "tabFavorites",
      title: Labels.tabs.favoritesTitle,
    },
    {
      component: TabAroundMeNavigator,
      getIcon: (tintColor) => (
        <Icomoon
          name={IcomoonIcons.autourDeMoi}
          color={tintColor}
          size={iconSize}
        />
      ),
      name: "tabAroundMe",
      title: Labels.tabs.aroundMeTitle,
    },
  ];

  return (
    <BottomTab.Navigator
      initialRouteName="tabHome"
      tabBarOptions={{
        activeTintColor: Colors.primaryBlue,
        inactiveTintColor: Colors.navigation,
      }}
    >
      {tabItems.map((tabItem, index) => (
        <BottomTab.Screen
          key={index}
          name={tabItem.name}
          component={tabItem.component}
          options={{
            tabBarIcon: ({ color }) => tabItem.getIcon(color),
            title: tabItem.title,
          }}
        />
      ))}
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
    <TabHomeStack.Screen name="listArticles" component={ListArticles} />
    <TabHomeStack.Screen name="article" component={ArticleDetail} />
    <TabHomeStack.Screen name="epdsSurvey" component={EpdsSurveyScreen} />
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
