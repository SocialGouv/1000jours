import { Linking } from "react-native";

import { PLATFORM_IS_ANDROID } from "../constants/platform.constants";

export const callContact = async (
  phoneNumber: string | null | undefined
): Promise<void> => {
  if (!phoneNumber) return;
  // Delete spaces
  phoneNumber = phoneNumber.replace(/ /g, "");
  await Linking.openURL("tel:" + phoneNumber);
};

export const sendEmail = async (
  email: string | null | undefined
): Promise<void> => {
  if (!email) return;
  await Linking.openURL(`mailto:${email}`);
};

export const openWebsite = async (
  website: string | null | undefined
): Promise<void> => {
  if (!website) return;
  let completeWebsite = undefined;
  if (!website.includes("https://")) {
    const websiteWithWww = website.includes("www") ? website : `www.${website}`;
    completeWebsite = websiteWithWww.includes("https://")
      ? websiteWithWww
      : `https://${websiteWithWww}`;
  } else {
    completeWebsite = website;
  }

  await Linking.openURL(completeWebsite);
};

export const openNavigationApp = async (
  lat: number,
  long: number
): Promise<void> => {
  const url = PLATFORM_IS_ANDROID
    ? `google.navigation:q=${lat}+${long}`
    : `maps://app?daddr=${lat}+${long}`;
  await Linking.openURL(url);
};
