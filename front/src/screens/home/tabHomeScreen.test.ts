import AsyncStorage from "@react-native-async-storage/async-storage";

import { StorageKeysConstants } from "../../constants";
import { StorageUtils } from "../../utils";
import { displayUpdateProfileModal } from "./tabHomeScreen.component";

describe("TabHomeScreen", () => {
  describe("displayUpdateProfileModal", () => {
    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("no date in lastProfileUpdate & no date in userChildBirthday  => not open modal", async () => {
      const today = new Date("2022-01-01");
      const result = await displayUpdateProfileModal(today);
      expect(result).toBeFalsy();
    });

    it("no date in lastProfileUpdate & date in userChildBirthday => open modal", async () => {
      const today = new Date("2022-01-01");
      await StorageUtils.storeStringValue(
        StorageKeysConstants.userChildBirthdayKey,
        "2022-09-20"
      );

      const result = await displayUpdateProfileModal(today);
      expect(result).toBeTruthy();
    });

    it("lastProfileUpdate >= 1 month (month 1 to 8) => open modal", async () => {
      const today = new Date("2022-07-01");
      await StorageUtils.storeStringValue(
        StorageKeysConstants.userChildBirthdayKey,
        "2022-09-20"
      );
      await StorageUtils.storeStringValue(
        StorageKeysConstants.lastProfileUpdate,
        "2022-05-10"
      );

      const result = await displayUpdateProfileModal(today);
      expect(result).toBeTruthy();
    });

    it("lastProfileUpdate < 1 month (month 1 to 8) => not open modal", async () => {
      const today = new Date("2022-07-01");
      await StorageUtils.storeStringValue(
        StorageKeysConstants.userChildBirthdayKey,
        "2022-09-20"
      );
      await StorageUtils.storeStringValue(
        StorageKeysConstants.lastProfileUpdate,
        "2022-06-20"
      );

      const result = await displayUpdateProfileModal(today);
      expect(result).toBeFalsy();
    });

    it("lastProfileUpdate >= 1 week (month 9) => open modal", async () => {
      const today = new Date("2022-07-01");
      await StorageUtils.storeStringValue(
        StorageKeysConstants.userChildBirthdayKey,
        "2022-07-20"
      );
      await StorageUtils.storeStringValue(
        StorageKeysConstants.lastProfileUpdate,
        "2022-06-10"
      );

      const result = await displayUpdateProfileModal(today);
      expect(result).toBeTruthy();
    });

    it("lastProfileUpdate < 1 week (month 9) => not open modal", async () => {
      const today = new Date("2022-07-01");
      await StorageUtils.storeStringValue(
        StorageKeysConstants.userChildBirthdayKey,
        "2022-07-20"
      );
      await StorageUtils.storeStringValue(
        StorageKeysConstants.lastProfileUpdate,
        "2022-06-27"
      );

      const result = await displayUpdateProfileModal(today);
      expect(result).toBeFalsy();
    });

    it("userChildBirthday in past => not open modal", async () => {
      const today = new Date("2022-07-01");
      await StorageUtils.storeStringValue(
        StorageKeysConstants.userChildBirthdayKey,
        "2022-06-20"
      );

      const result = await displayUpdateProfileModal(today);
      expect(result).toBeFalsy();
    });

    it("date in lastProfileUpdate & date in userChildBirthday & userChildBirthday in past => not open modal", async () => {
      const today = new Date("2022-07-01");
      await StorageUtils.storeStringValue(
        StorageKeysConstants.userChildBirthdayKey,
        "2022-06-27"
      );
      await StorageUtils.storeStringValue(
        StorageKeysConstants.lastProfileUpdate,
        "2022-06-20"
      );

      const result = await displayUpdateProfileModal(today);
      expect(result).toBeFalsy();
    });
  });
});
