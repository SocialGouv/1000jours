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

// react-native-webview requires a native module at import time (RNCWebViewModule),
// which is not available in the Jest environment.
jest.mock("react-native-webview", () => {
  const React = require("react");
  const { View } = require("react-native");
  const WebView = React.forwardRef((props, ref) =>
    React.createElement(View, { ...props, ref })
  );
  WebView.displayName = "WebView";
  return { __esModule: true, default: WebView, WebView };
});
