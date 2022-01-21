/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export const navigate = (name: string, params: any): void => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};
