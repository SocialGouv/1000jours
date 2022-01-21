import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";

import { Icomoon, IcomoonIcons } from "../components";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import {
  ArticleDetail,
  EpdsSurveyScreen,
  EventDetails,
  ListArticles,
  ListParentsDocuments,
  TabAroundMeScreen,
  TabCalendarScreen,
  TabHomeScreen,
} from "../screens";
import type {
  BottomTabParamList,
  TabAroundMeParamList,
  TabCalendarParamList,
  TabEpdsParamList,
  TabHomeParamList,
  TabItem,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: FC = () => {
  const iconSize = 22;
  const tabItems: TabItem[] = [
    {
      component: TabHomeNavigator,
      getIcon: (tintColor, focused) => (
        <Icomoon
          name={focused ? IcomoonIcons.accueilActive : IcomoonIcons.accueil}
          color={tintColor}
          size={iconSize}
        />
      ),
      name: "tabHome",
      title: Labels.tabs.homeTitle,
    },
    {
      component: TabCalendarNavigator,
      getIcon: (tintColor, focused) => (
        <Icomoon
          name={
            focused ? IcomoonIcons.calendrierActive : IcomoonIcons.calendrier
          }
          color={tintColor}
          size={iconSize}
        />
      ),
      name: "tabCalendar",
      title: Labels.tabs.calendarTitle,
    },
    {
      component: TabEpdsNavigator,
      getIcon: (tintColor, focused) => (
        <Icomoon
          name={
            focused ? IcomoonIcons.postPartumActive : IcomoonIcons.postPartum
          }
          color={tintColor}
          size={iconSize}
        />
      ),
      name: "tabFavorites",
      title: Labels.tabs.testEpds,
    },
    {
      component: TabAroundMeNavigator,
      getIcon: (tintColor, focused) => (
        <Icomoon
          name={
            focused ? IcomoonIcons.autourDeMoiActive : IcomoonIcons.autourDeMoi
          }
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
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primaryBlueDark,
        tabBarInactiveTintColor: Colors.primaryBlueDark,
      }}
    >
      {tabItems.map((tabItem, index) => (
        <BottomTab.Screen
          key={index}
          name={tabItem.name}
          component={tabItem.component}
          options={{
            tabBarAllowFontScaling: false,
            tabBarIcon: ({ color, focused }) => tabItem.getIcon(color, focused),
            title: tabItem.title,
            unmountOnBlur: true,
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
    <TabHomeStack.Screen
      name="listParentsDocuments"
      component={ListParentsDocuments}
    />
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
    <TabCalendarStack.Screen name="eventDetails" component={EventDetails} />
    <TabCalendarStack.Screen name="article" component={ArticleDetail} />
  </TabCalendarStack.Navigator>
);

const TabEpdsStack = createStackNavigator<TabEpdsParamList>();
const TabEpdsNavigator: FC = () => (
  <TabEpdsStack.Navigator screenOptions={{ headerShown: false }}>
    <TabEpdsStack.Screen
      name="tabEpdsScreen"
      component={EpdsSurveyScreen}
      options={{}}
    />
  </TabEpdsStack.Navigator>
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
