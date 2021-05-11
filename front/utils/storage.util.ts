import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStringValue = async (
  storageKey: string
): Promise<string | null | undefined> => {
  try {
    return await AsyncStorage.getItem(storageKey);
  } catch (error: unknown) {
    console.error(error);
  }
};

export const getObjectValue = async (storageKey: string): Promise<unknown> => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
  value: unknown
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
