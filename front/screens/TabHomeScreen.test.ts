import AsyncStorage from "@react-native-async-storage/async-storage";

import { StorageKeysConstants } from "../constants";
import { convertDayInMillis } from "../utils/notification.util";
import * as TabHomeScreen from "./TabHomeScreen";

describe("TabHomeScreen", () => {
  afterEach(() => {
    void AsyncStorage.clear();
  });

  it("All notifs are sent and BeContacted is not completed", async () => {
    const resultEpdsDate = 1637762227304;
    const dateForNotifAfter48hours = 1637935027304;

    await AsyncStorage.setItem(
      StorageKeysConstants.epdsOpenBeContactedReminderKey,
      dateForNotifAfter48hours.toString()
    );
    // Array of notifs
    await AsyncStorage.setItem(
      StorageKeysConstants.notifIdsBeContacted,
      JSON.stringify([
        "6ab1b5e5-db12-4398-a9e5-fa47bacee0ad",
        "b4f46a8c-e56c-4bff-aff2-64cd9732ac29",
      ])
    );

    // Open app 3 days after results
    const result = await TabHomeScreen.sendNewNotifToCompleteBeContacted(
      new Date(resultEpdsDate + convertDayInMillis(3))
    );
    expect(result).toBe(true);
  });

  it("Only first notif is sent and BeContacted is not completed", async () => {
    const resultEpdsDate = 1637762227304;
    const dateForNotifAfter48hours = 1637935027304;

    await AsyncStorage.setItem(
      StorageKeysConstants.epdsOpenBeContactedReminderKey,
      dateForNotifAfter48hours.toString()
    );
    // Array of notifs
    await AsyncStorage.setItem(
      StorageKeysConstants.notifIdsBeContacted,
      JSON.stringify([
        "6ab1b5e5-db12-4398-a9e5-fa47bacee0ad",
        "b4f46a8c-e56c-4bff-aff2-64cd9732ac29",
      ])
    );

    // Open app 1 days after results
    const result = await TabHomeScreen.sendNewNotifToCompleteBeContacted(
      new Date(resultEpdsDate + convertDayInMillis(1))
    );
    expect(result).toBe(false);
  });

  it("BeContacted is completed", async () => {
    const resultEpdsDate = 1637762227304;
    const dateForNotifAfter48hours = 1637935027304;

    // No data in StorageKeysConstants.notifIdsBeContacted

    await AsyncStorage.setItem(
      StorageKeysConstants.epdsOpenBeContactedReminderKey,
      dateForNotifAfter48hours.toString()
    );

    // Open app 1 days after results
    const result = await TabHomeScreen.sendNewNotifToCompleteBeContacted(
      new Date(resultEpdsDate + convertDayInMillis(1))
    );
    expect(result).toBe(false);
  });

  it("Never completed EPDS survey", async () => {
    const resultEpdsDate = new Date().getTime();

    const result = await TabHomeScreen.sendNewNotifToCompleteBeContacted(
      new Date(resultEpdsDate)
    );
    expect(result).toBe(false);
  });
});
