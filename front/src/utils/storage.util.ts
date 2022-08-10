import AsyncStorage from "@react-native-async-storage/async-storage";

import { StorageKeysConstants } from "../constants";
import { reportError } from "./logging.util";

export const getStringValue = async (
  storageKey: string
): Promise<string | null | undefined> => {
  try {
    return await AsyncStorage.getItem(storageKey);
  } catch (error: unknown) {
    reportError((error as Error).message);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getObjectValue = async (storageKey: string): Promise<any> => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (error: unknown) {
    reportError((error as Error).message);
  }
};

export const storeStringValue = async (
  storageKey: string,
  value: string
): Promise<void> => {
  try {
    await AsyncStorage.setItem(storageKey, value);
  } catch (error: unknown) {
    reportError((error as Error).message);
  }
};

export const storeObjectValue = async (
  storageKey: string,
  value: unknown
): Promise<void> => {
  try {
    await storeStringValue(storageKey, JSON.stringify(value));
  } catch (error: unknown) {
    reportError((error as Error).message);
  }
};

export const removeKey = async (storageKey: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(storageKey);
  } catch (error: unknown) {
    reportError((error as Error).message);
  }
};

export const multiRemove = async (storageKeys: string[]): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(storageKeys);
  } catch (error: unknown) {
    reportError((error as Error).message);
  }
};

export const log = async (): Promise<[string, string | null][] | null> => {
  let storage = null;
  try {
    storage = await AsyncStorage.multiGet(StorageKeysConstants.allStorageKeys);
  } catch (error: unknown) {
    reportError((error as Error).message);
  }
  return storage;
};

export const clear = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error: unknown) {
    reportError((error as Error).message);
  }
};
