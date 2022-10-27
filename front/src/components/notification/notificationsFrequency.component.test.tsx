import AsyncStorage from "@react-native-async-storage/async-storage";
import type { RenderAPI } from "@testing-library/react-native";
import { render, waitFor } from "@testing-library/react-native";
import * as React from "react";

import { StorageKeysConstants } from "../../constants";
import { NotificationUtils, StorageUtils } from "../../utils";
import { NotificationType } from "../../utils/notifications/notification.util";
import NotificationsFrequency from "./notificationsFrequency.component";

describe("Notification Frenquency", () => {
  describe("UI", () => {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let screen: RenderAPI;

    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("moodboard frequency init state should be twice a week", async () => {
      screen = render(
        <NotificationsFrequency type={NotificationType.moodboard} />
      );

      await waitFor(() => {
        expect(screen.getAllByRole("radio")).toHaveLength(2);

        // Example 1 : find by TestId + look at checked state
        const radioOnceADay = screen.getByTestId(
          NotificationUtils.Frequencies.onceADay
        );
        expect(radioOnceADay.props.accessibilityState.checked).toBeFalsy();

        // Example 2 : find the checked state + verify TestId
        const radioTwiceWeek = screen.getByA11yState({ checked: true });
        expect(radioTwiceWeek.props.testID).toEqual(
          NotificationUtils.Frequencies.twiceAWeek
        );
      });
    });

    it("moodboard frequency state should match localStorage when value is once a day", async () => {
      await StorageUtils.storeStringValue(
        StorageKeysConstants.notifToggleMoodboardFrequency,
        NotificationUtils.Frequencies.onceADay
      );

      screen = render(
        <NotificationsFrequency type={NotificationType.moodboard} />
      );

      await waitFor(() => {
        expect(screen.getAllByRole("radio")).toHaveLength(2);

        // Example 1 : find by TestId + look at checked state
        const radioOnceADay = screen.getByTestId(
          NotificationUtils.Frequencies.onceADay
        );
        expect(radioOnceADay.props.accessibilityState.checked).toBeTruthy();

        // Example 2 : find the checked state + verify TestId
        const radioTwiceWeek = screen.getByA11yState({ checked: false });
        expect(radioTwiceWeek.props.testID).toEqual(
          NotificationUtils.Frequencies.twiceAWeek
        );
      });
    });
  });
});
