import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("expo-notifications", () => ({
  addEventListener: jest.fn(),
  cancelScheduledNotificationAsync: jest.fn(),
  configure: jest.fn(),
  getAllScheduledNotificationsAsync: jest.fn(),
  onNotification: jest.fn(),
  onRegister: jest.fn(),
  requestPermissions: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
