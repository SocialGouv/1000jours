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

  let screen = name;
  switch (name) {
    case "article":
      screen = "tabHome";
      params = {
        params,
        screen: name,
      };
      break;
    case "event":
      screen = "tabCalendar";
      params = {
        params,
        screen: name,
      };
      break;
    default:
      break;
  }
  navigationRef.navigate(screen, params);
};
