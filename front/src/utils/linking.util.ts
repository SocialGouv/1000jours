import { Linking } from "react-native";

import { PLATFORM_IS_ANDROID } from "../constants/platform.constants";

const PREFIX_HTTP = "http://";
const PREFIX_HTTPS = "https://";
const WWW = "www";

export const callContact = async (
  phoneNumber: string | null | undefined
): Promise<void> => {
  if (!phoneNumber) return;
  // Delete spaces
  phoneNumber = phoneNumber.replace(/ /g, "");
  await Linking.openURL("tel:" + phoneNumber);
};

export const sendEmail = async (
  email: string | null | undefined,
  subject?: string
): Promise<void> => {
  if (!email) return;
  await Linking.openURL(
    subject ? `mailto:${email}?subject=${subject}` : `mailto:${email}`
  );
};
export const openWebsite = async (
  website: string | null | undefined,
  dontChangeUrl = false
): Promise<void> => {
  if (!website) return;
  let completeWebsite = undefined;
  if (!website.includes(PREFIX_HTTP) && !website.includes(PREFIX_HTTPS) && !dontChangeUrl) {
    const websiteWithWww = website.includes(WWW) ? website : `${WWW}.${website}`;
    completeWebsite = `${PREFIX_HTTP}${websiteWithWww}`;
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
