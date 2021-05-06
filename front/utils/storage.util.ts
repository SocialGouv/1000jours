/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStringValue = async (
  storageKey: string
): Promise<string | null> => {
  return AsyncStorage.getItem(storageKey);
};

export const getObjectValue = async (storageKey: string): Promise<any> => {
  const jsonValue = await AsyncStorage.getItem(storageKey);
  return jsonValue !== null ? JSON.parse(jsonValue) : null;
};

export const storeStringValue = async (
  storageKey: string,
  value: string
): Promise<void> => {
  return AsyncStorage.setItem(storageKey, value);
};

export const storeObjectValue = async (
  storageKey: string,
  value: any
): Promise<void> => {
  return storeStringValue(storageKey, JSON.stringify(value));
};

export const multiRemove = async (storageKeys: string[]): Promise<void> => {
  return AsyncStorage.multiRemove(storageKeys);
};
