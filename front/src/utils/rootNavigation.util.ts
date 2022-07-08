/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createNavigationContainerRef } from "@react-navigation/native";

import type { RootNavigationParams } from "../types";

export const navigationRef = createNavigationContainerRef();

/**
 * Information : Pour naviguer vers une page depuis n'importe où,
 * il faut passer par les screens du Stack.Navigator, ensuite passer par les BottomTab.Navigator puis par les BottomTab.Screen.
 * Ex : root > tabCalendar > tabCalendarScreen
 * @param name
 * @param params
 * @param stayOnCurrentTab
 */
export const navigate = async (
  name: string,
  params?: unknown,
  stayOnCurrentTab?: boolean
): Promise<void> => {
  let stop = false;
  while (!stop) {
    if (navigationRef.isReady()) {
      stop = true;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }

  if (!params) params = {};
  let screen = (params as RootNavigationParams).screen ?? name;

  if (!stayOnCurrentTab) {
    switch (screen) {
      case "articleList":
        screen = "root";
        params = {
          params: {
            params: params,
            screen: "articleList",
          },
          screen: "tabHome",
        };
        break;
      case "article":
        screen = "root";
        params = {
          params: {
            params: params,
            screen: "article",
          },
          screen: "tabHome",
        };
        break;
      case "event":
        screen = "root";
        params = {
          params: {
            params: params,
            screen: "tabCalendarScreen",
          },
          screen: "tabCalendar",
        };
        break;
      default:
        break;
    }
  }

  navigationRef.navigate(screen as never, params as never);
};
