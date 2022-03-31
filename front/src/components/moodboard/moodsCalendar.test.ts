import type { MoodStorageItem } from "../../type/moodboard.types";
import { buildMarkedDatesForCalendar } from "./moodsCalendar.component";

describe("MoodCalendar component", () => {
  describe("buildMarkedDatesForCalendar", () => {
    it("convert undefined mood list to marked date => emprty list", () => {
      const moods: MoodStorageItem[] = undefined;
      const expected = {};

      expect(buildMarkedDatesForCalendar(moods)).toEqual(expected);
    });

    it("convert mood list to marked date with colors", () => {
      const moods: MoodStorageItem[] = [
        { date: "2022-03-05", title: "Bien" },
        { date: "2022-03-06", title: "Très bien" },
        { date: "2022-03-07", title: "Mal" },
      ];

      const expected = {
        "2022-03-05": { selected: true, selectedColor: "#5770BE" },
        "2022-03-06": { selected: true, selectedColor: "#739C88" },
        "2022-03-07": { selected: true, selectedColor: "#E86405" },
      };

      expect(buildMarkedDatesForCalendar(moods)).toEqual(expected);
    });
  });
});
