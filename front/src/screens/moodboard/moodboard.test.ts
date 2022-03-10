import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

import { Formats, StorageKeysConstants } from "../../constants";
import { StorageUtils } from "../../utils";
import * as Moodboard from "./moodboard.component";

describe("Moodboard component", () => {
  describe("saveMood", () => {
    const today: string = format(new Date(), Formats.dateISO);

    afterEach(() => {
      void AsyncStorage.clear();
    });

    it("setItem is called with StorageKeysConstants.moodsByDate and without old mood", async () => {
      await Moodboard.saveMood("Bien");
      const expected = [{ date: today, title: "Bien" }];
      await StorageUtils.getObjectValue(StorageKeysConstants.moodsByDate).then((data) => {
        expect(data).toEqual(expected)
      });
    });

    it("setItem is called with StorageKeysConstants.moodsByDate and with old mood", async () => {
      const items = [{ date: "2022-01-01", title: "Très bien" }];
      void AsyncStorage.setItem(
        StorageKeysConstants.moodsByDate,
        JSON.stringify(items)
      );

      await Moodboard.saveMood("Bien");
      const expected = [
        { date: "2022-01-01", title: "Très bien" },
        { date: today, title: "Bien" },
      ];
      await StorageUtils.getObjectValue(StorageKeysConstants.moodsByDate).then((data) => {
        expect(data).toEqual(expected)
      });
    });

    it("setItem is called with StorageKeysConstants.moodsByDate for same date", async () => {
      const items = [
        { date: "2022-01-01", title: "Très bien" },
        { date: today, title: "Mal" }
      ];
      await AsyncStorage.setItem(
        StorageKeysConstants.moodsByDate,
        JSON.stringify(items)
      );

      await Moodboard.saveMood("Bien");
      const expected = [
        { date: "2022-01-01", title: "Très bien" },
        { date: today, title: "Bien" },
      ];
      await StorageUtils.getObjectValue(StorageKeysConstants.moodsByDate).then((data) => {
        expect(data).toEqual(expected)
      });
    });
  });
});
