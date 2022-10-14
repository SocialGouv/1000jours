import type { Event } from "../../types";
import { formattedEvents } from "./event.util";

describe("Event utils", () => {
  describe("formattedEvents function", () => {
    const childBirthday = "2022-12-08";
    const event1: Event = {
      debut: 0,
      fin: 8,
      id: 1,
      nom: "événement",
    };

    it("should get events formatted with no events", () => {
      const result = formattedEvents([], childBirthday);
      const expected: Event[] = [];
      expect(result).toEqual(expected);
    });

    it("should get events formatted witout childBirthday", () => {
      // TODO: je renvoie an array vide, mais pas spur que ce soit la meilleure des solutions
      const result = formattedEvents([event1], "");
      const expected: Event[] = [];
      expect(result).toEqual(expected);
    });

    it("should get events formatted with childBirthday", () => {
      const result = formattedEvents([event1], childBirthday);
      const expected: Event[] = [
        {
          date: childBirthday,
          debut: 0,
          fin: 8,
          id: 1,
          nom: "événement",
        },
      ];
      expect(result).toEqual(expected);
    });
  });
});
