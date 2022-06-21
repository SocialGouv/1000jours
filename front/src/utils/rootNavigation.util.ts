/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createNavigationContainerRef } from "@react-navigation/native";
import { Native } from "sentry-expo";

const WAITING_TIME = 250;
const MAX_WAITING_TIME = 4000;

export const navigationRef = createNavigationContainerRef();

export const navigate = async (
  name: string,
  params: unknown,
  stayOnCurrentTab?: boolean
): Promise<void> => {
  let stop = false;
  setTimeout(function () {
    stop = true;
  }, MAX_WAITING_TIME);
  while (!stop) {
    if (navigationRef.isReady()) {
      stop = true;
    } else {
      await new Promise((resolve) => setTimeout(resolve, WAITING_TIME));
    }
  }

  if (navigationRef.isReady()) {
    // Information : Pour naviguer vers une page depuis n'importe où
    // Il faut passer par les screens du Stack.Navigator, ensuite passer par les BottomTab.Navigator puis par les BottomTab.Screen.
    // Ex : root > tabCalendar > tabCalendarScreen
    let screen = name;
    if (!stayOnCurrentTab) {
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
    }

    navigationRef.navigate(screen as never, params as never);
  } else {
    const errorMessage = `Error from rootNavigation.utils : 'navigationRef is not ready after waiting ${MAX_WAITING_TIME}ms'`;
    Native.captureException(errorMessage);
  }
};
