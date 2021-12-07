import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("expo-notifications", () => ({
  addEventListener: jest.fn(),
  configure: jest.fn(),
  onNotification: jest.fn(),
  onRegister: jest.fn(),
  requestPermissions: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
