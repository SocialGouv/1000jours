import { fireEvent, render, waitFor } from "@testing-library/react-native";
import * as React from "react";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Labels } from "../../constants";
import ClosureBanner from "./closureBanner.component";

const initialMetrics = {
  frame: { height: 800, width: 400, x: 0, y: 0 },
  insets: { bottom: 0, left: 0, right: 0, top: 40 },
};

const renderBanner = () =>
  render(
    <SafeAreaProvider initialMetrics={initialMetrics}>
      <ClosureBanner>
        <Text>Contenu de l'application</Text>
      </ClosureBanner>
    </SafeAreaProvider>
  );

describe("ClosureBanner", () => {
  it("should display the closure banner above the app content", () => {
    const screen = renderBanner();

    expect(screen.getByText(Labels.closure.banner.title)).toBeTruthy();
    expect(screen.getByText(Labels.closure.banner.text)).toBeTruthy();
    expect(screen.getByText(Labels.closure.banner.learnMore)).toBeTruthy();
    expect(screen.getByText("Contenu de l'application")).toBeTruthy();
    expect(screen.queryByText(Labels.closure.message.title)).toBeNull();
  });

  it("should open and close the full closure message", async () => {
    const screen = renderBanner();

    fireEvent.press(screen.getByText(Labels.closure.banner.learnMore));

    await waitFor(() => {
      expect(screen.getByText(Labels.closure.message.title)).toBeTruthy();
      expect(screen.getByText(Labels.closure.message.signature)).toBeTruthy();
    });

    fireEvent.press(screen.getByLabelText(Labels.accessibility.close));

    await waitFor(() => {
      expect(screen.queryByText(Labels.closure.message.title)).toBeNull();
    });
  });
});
