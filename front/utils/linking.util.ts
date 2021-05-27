import { Linking } from "react-native";

export const callContact = async (phoneNumber: string): Promise<void> => {
  // Delete spaces
  phoneNumber = phoneNumber.replace(/ /g, "");
  await Linking.openURL("tel:" + phoneNumber);
};

export const sendEmail = async (email: string): Promise<void> => {
  await Linking.openURL(`mailto:${email}`);
};

export const openWebsite = async (website: string): Promise<void> => {
  await Linking.openURL(
    website.includes("www") ? `https://${website}` : `https://www.${website}`
  );
};
