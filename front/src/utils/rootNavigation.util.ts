/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export const navigate = async (name: string, params: any): Promise<void> => {
  let stop = false;
  while (!stop) {
    if (navigationRef.isReady()) {
      stop = true;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }

  // Information : Pour naviguer vers une page depuis n'importe où
  // Il faut passer par les screens du Stack.Navigator, ensuite passer par les BottomTab.Navigator puis par les BottomTab.Screen.
  // Ex : root > tabCalendar > tabCalendarScreen

  let screen = name;
  switch (name) {
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

  navigationRef.navigate(screen, params);
};
