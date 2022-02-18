import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";

import { Icomoon, IcomoonIcons } from "../components/baseComponents";
import Labels from "../constants/Labels";
import {
  AroundMeMapAndList,
  AroundMeScreen,
  ArticleDetail,
  EventDetails,
  ListArticles,
  Parentheque,
  TabCalendarScreen,
  TabEpdsScreen,
  TabHomeScreen,
  TabSearchScreen,
} from "../screens";
import { Colors } from "../styles";
import type {
  BottomTabParamList,
  TabCalendarParamList,
  TabEpdsParamList,
  TabHomeParamList,
  TabItem,
  TabSearchParamList,
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
      name: "tabEpds",
      title: Labels.tabs.testEpds,
    },
    {
      component: TabSearchNavigator,
      getIcon: (tintColor, focused) => (
        <Icomoon
          name={
            focused
              ? IcomoonIcons.tabRechercheActive
              : IcomoonIcons.tabRecherche
          }
          color={tintColor}
          size={iconSize}
        />
      ),
      name: "tabSearch",
      title: Labels.tabs.helpTitle,
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
    <TabHomeStack.Screen name="parentheque" component={Parentheque} />
    <TabHomeStack.Screen name="article" component={ArticleDetail} />
    <TabHomeStack.Screen name="epdsSurvey" component={TabEpdsScreen} />
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
    <TabHomeStack.Screen name="parentheque" component={Parentheque} />
    <TabCalendarStack.Screen name="aroundMeScreen" component={AroundMeScreen} />
  </TabCalendarStack.Navigator>
);

const TabEpdsStack = createStackNavigator<TabEpdsParamList>();
const TabEpdsNavigator: FC = () => (
  <TabEpdsStack.Navigator screenOptions={{ headerShown: false }}>
    <TabEpdsStack.Screen
      name="tabEpdsScreen"
      component={TabEpdsScreen}
      options={{}}
    />
    <TabHomeStack.Screen name="parentheque" component={Parentheque} />
  </TabEpdsStack.Navigator>
);

const TabSearchStack = createStackNavigator<TabSearchParamList>();
const TabSearchNavigator: FC = () => (
  <TabSearchStack.Navigator screenOptions={{ headerShown: false }}>
    <TabSearchStack.Screen
      name="tabSearchScreen"
      component={TabSearchScreen}
      options={{}}
    />
    <TabSearchStack.Screen
      name="aroundMeMapAndList"
      component={AroundMeMapAndList}
    />
    <TabHomeStack.Screen name="parentheque" component={Parentheque} />
  </TabSearchStack.Navigator>
);

export default BottomTabNavigator;
