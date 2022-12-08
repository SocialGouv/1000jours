import { Linking } from "react-native";

import { Links } from "../../constants";
import { PLATFORM_IS_ANDROID } from "../../constants/platform.constants";

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
  shouldChangeUrl = true
): Promise<void> => {
  if (!website) return;
  const formattedURL = _formatURL(website, shouldChangeUrl);

  const isURLSupported = await Linking.canOpenURL(formattedURL);
  if (isURLSupported) {
    await Linking.openURL(formattedURL);
  }
};

export const openNavigationApp = async (
  lat: number,
  long: number
): Promise<void> => {
  const webUrl = `https://maps.google.com?q=${lat}+${long}`;
  const url = PLATFORM_IS_ANDROID
    ? `google.navigation:q=${lat}+${long}`
    : `maps://app?daddr=${lat}+${long}`;

  const supported = await Linking.canOpenURL(url);
  await Linking.openURL(supported ? url : webUrl);
};

export const goToStore = async (): Promise<void> => {
  const storeUrl = PLATFORM_IS_ANDROID
    ? Links.appUrlAndroid
    : Links.httpsiOSAppUrl;

  await Linking.openURL(storeUrl);
};

const _formatURL = (website: string, shouldChangeUrl = true): string => {
  let completeWebsite = undefined;
  if (
    !website.includes(PREFIX_HTTP) &&
    !website.includes(PREFIX_HTTPS) &&
    shouldChangeUrl
  ) {
    const websiteWithWww = website.includes(WWW)
      ? website
      : `${WWW}.${website}`;
    completeWebsite = `${PREFIX_HTTP}${websiteWithWww}`;
  } else {
    completeWebsite = website;
  }

  return completeWebsite;
};
