import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

import { Formats, StorageKeysConstants } from "../constants";
import { MoodboardUtils, StorageUtils } from ".";

describe("Moodboard utils", () => {
  describe("saveMood", () => {
    const today: string = format(new Date(), Formats.dateISO);

    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("setItem is called with StorageKeysConstants.moodsByDate and without old mood", async () => {
      await MoodboardUtils.saveMood("Bien");
      const expected = [{ date: today, title: "Bien" }];
      await StorageUtils.getObjectValue(StorageKeysConstants.moodsByDate).then(
        (data) => {
          expect(data).toEqual(expected);
        }
      );
    });

    it("setItem is called with StorageKeysConstants.moodsByDate and with old mood", async () => {
      const items = [{ date: "2022-01-01", title: "Très bien" }];
      void AsyncStorage.setItem(
        StorageKeysConstants.moodsByDate,
        JSON.stringify(items)
      );

      await MoodboardUtils.saveMood("Bien");
      const expected = [
        { date: "2022-01-01", title: "Très bien" },
        { date: today, title: "Bien" },
      ];
      await StorageUtils.getObjectValue(StorageKeysConstants.moodsByDate).then(
        (data) => {
          expect(data).toEqual(expected);
        }
      );
    });

    it("setItem is called with StorageKeysConstants.moodsByDate for same date", async () => {
      const items = [
        { date: "2022-01-01", title: "Très bien" },
        { date: today, title: "Mal" },
      ];
      await AsyncStorage.setItem(
        StorageKeysConstants.moodsByDate,
        JSON.stringify(items)
      );

      await MoodboardUtils.saveMood("Bien");
      const expected = [
        { date: "2022-01-01", title: "Très bien" },
        { date: today, title: "Bien" },
      ];
      await StorageUtils.getObjectValue(StorageKeysConstants.moodsByDate).then(
        (data) => {
          expect(data).toEqual(expected);
        }
      );
    });

    it("setItem is called with StorageKeysConstants.moodsByDate and specific date", async () => {
      const items = [{ date: "2022-01-01", title: "Très bien" }];
      void AsyncStorage.setItem(
        StorageKeysConstants.moodsByDate,
        JSON.stringify(items)
      );

      await MoodboardUtils.saveMood("Bien", "2011-01-01");
      const expected = [
        { date: "2022-01-01", title: "Très bien" },
        { date: "2011-01-01", title: "Bien" },
      ];
      await StorageUtils.getObjectValue(StorageKeysConstants.moodsByDate).then(
        (data) => {
          expect(data).toEqual(expected);
        }
      );
    });
  });
});
