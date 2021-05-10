/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStringValue = async (storageKey: string): Promise<any> => {
  try {
    return await AsyncStorage.getItem(storageKey);
  } catch (error: unknown) {
    console.error(error);
  }
};

export const getObjectValue = async (storageKey: string): Promise<any> => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (error: unknown) {
    console.error(error);
  }
};

export const storeStringValue = async (
  storageKey: string,
  value: string
): Promise<void> => {
  try {
    await AsyncStorage.setItem(storageKey, value);
  } catch (error: unknown) {
    console.error(error);
  }
};

export const storeObjectValue = async (
  storageKey: string,
  value: any
): Promise<void> => {
  try {
    await storeStringValue(storageKey, JSON.stringify(value));
  } catch (error: unknown) {
    console.error(error);
  }
};

export const multiRemove = async (storageKeys: string[]): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(storageKeys);
  } catch (error: unknown) {
    console.error(error);
  }
};
