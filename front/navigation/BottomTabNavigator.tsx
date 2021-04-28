import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";

import Icomoon, { IcomoonIcons } from "../components/Icomoon";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import ArticleDetail from "../screens/ArticleDetail";
import EpdsSurveyScreen from "../screens/epdsSurvey/epdsSurveyScreen.component";
import ListArticles from "../screens/ListArticles";
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
  TabItem,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: FC = () => {
  const tabItems: TabItem[] = [
    {
      component: TabHomeNavigator,
      icon: (
        <Icomoon
          name={IcomoonIcons.accueil}
          color={Colors.primaryBlue}
          size={30}
        />
      ),
      name: "tabHome",
      title: Labels.tabs.homeTitle,
    },
    {
      component: TabCalendarNavigator,
      icon: (
        <Icomoon
          name={IcomoonIcons.calendrier}
          color={Colors.primaryBlue}
          size={30}
        />
      ),
      name: "tabCalendar",
      title: Labels.tabs.calendarTitle,
    },
    {
      component: TabFavoritesNavigator,
      icon: (
        <Icomoon
          name={IcomoonIcons.favoris}
          color={Colors.primaryBlue}
          size={30}
        />
      ),
      name: "tabFavorites",
      title: Labels.tabs.favoritesTitle,
    },
    {
      component: TabAroundMeNavigator,
      icon: (
        <Icomoon
          name={IcomoonIcons.autourDeMoi}
          color={Colors.primaryBlue}
          size={30}
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
        inactiveTintColor: Colors.disabled,
      }}
    >
      {tabItems.map((tabItem, index) => (
        <BottomTab.Screen
          key={index}
          name={tabItem.name}
          component={tabItem.component}
          options={{
            tabBarIcon: () => tabItem.icon,
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
