import { Linking } from "react-native";

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
  await Linking.openURL(
    website.includes("www") ? `https://${website}` : `https://www.${website}`
  );
};
