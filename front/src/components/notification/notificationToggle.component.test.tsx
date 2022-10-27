import AsyncStorage from "@react-native-async-storage/async-storage";
import type { RenderAPI } from "@testing-library/react-native";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import * as React from "react";

import { StorageKeysConstants } from "../../constants";
import Labels from "../../constants/Labels";
import { StorageUtils } from "../../utils";
import { NotificationType } from "../../utils/notifications/notification.util";
import NotificationToggle from "./notificationToggle.component";

describe("Notification Toggle", () => {
  describe("UI", () => {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let screen: RenderAPI;

    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("buttons yes/no existed", async () => {
      screen = render(
        <NotificationToggle
          title={Labels.notificationsCenter.article.title}
          description={Labels.notificationsCenter.article.decription}
          type={NotificationType.articles}
        />
      );

      await waitFor(() => {
        // Example 1
        expect(screen.getByText("Non")).toBeTruthy();
        // Example 2
        expect(screen.getAllByText("Oui")).toHaveLength(1);
      });
    });

    it("toggle by type is displayed as true for the first time", async () => {
      screen = render(
        <NotificationToggle
          title={Labels.notificationsCenter.article.title}
          description={Labels.notificationsCenter.article.decription}
          type={NotificationType.articles}
        />
      );

      await waitFor(async () => {
        const toggle = screen.getByRole("switch");
        expect(toggle).toBeTruthy();

        // init value : true
        const defaultStorageValue = await StorageUtils.getObjectValue(
          StorageKeysConstants.notifToggleArticles
        );
        expect(defaultStorageValue).toBeNull();
        expect(screen.getByA11yState({ checked: true })).toBeTruthy();
      });
    });

    it("toggle by type is in localStorage at false", async () => {
      await StorageUtils.storeObjectValue(
        StorageKeysConstants.notifToggleArticles,
        false
      );

      screen = render(
        <NotificationToggle
          title={Labels.notificationsCenter.article.title}
          description={Labels.notificationsCenter.article.decription}
          type={NotificationType.articles}
        />
      );

      await waitFor(async () => {
        const toggle = screen.getByRole("switch");
        expect(toggle).toBeTruthy();

        // storage value : false
        const storageValue = await StorageUtils.getObjectValue(
          StorageKeysConstants.notifToggleArticles
        );
        expect(storageValue).toBeFalsy();
        expect(screen.getByA11yState({ checked: false })).toBeTruthy();

        await fireEvent.press(toggle);

        // new value : true
        const storageAfterPress = await StorageUtils.getObjectValue(
          StorageKeysConstants.notifToggleArticles
        );
        expect(storageAfterPress).toBeTruthy();
        expect(screen.getByA11yState({ checked: true })).toBeTruthy();
      });
    });

    // it("toggle by type is in localStorage at true", async () => {
    //   await StorageUtils.storeObjectValue(
    //     StorageKeysConstants.notifToggleArticles,
    //     true
    //   );

    //   screen = render(
    //     <NotificationToggle
    //       title={Labels.notificationsCenter.article.title}
    //       description={Labels.notificationsCenter.article.decription}
    //       type={NotificationType.articles}
    //     />
    //   );

    //   await waitFor(async () => {
    //     const toggle = screen.getByRole("switch");
    //     expect(toggle).toBeTruthy();

    //     // storage value : true
    //     const storageValue = await StorageUtils.getObjectValue(
    //       StorageKeysConstants.notifToggleArticles
    //     );
    //     expect(storageValue).toBeTruthy();
    //     expect(screen.getByA11yState({ checked: true })).toBeTruthy();

    //     await fireEvent.press(toggle);

    //     // new value : false
    //     const storageAfterPress = await StorageUtils.getObjectValue(
    //       StorageKeysConstants.notifToggleArticles
    //     );
    //     expect(storageAfterPress).toBeFalsy();
    //     expect(screen.getByA11yState({ checked: false })).toBeTruthy();
    //   });
    // });

    /*
      // await waitFor(() => {
      //   const toto = screen.queryByText("Oui");
      //   console.log(toto);
      // });

      //expect(screen.getByRole("image")).toBeTruthy();
    */
  });
});
