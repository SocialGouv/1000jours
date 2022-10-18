import type { Event } from "../../types";
import { EventUtils } from "..";

describe("Event utils", () => {
  const events: Event[] = [
    {
      debut: 0,
      fin: 8,
      id: 1,
      important: true,
      nom: "événement1",
    },
    {
      debut: 0,
      fin: 8,
      id: 2,
      important: false,
      nom: "événement2",
    },
  ];

  describe("formattedEvents function", () => {
    const childBirthday = "2022-12-08";

    it("should get events formatted with no events", () => {
      const result = EventUtils.formattedEvents([], childBirthday);
      const expected: Event[] = [];
      expect(result).toEqual(expected);
    });

    it("should get events formatted witout childBirthday", () => {
      // TODO: je renvoie an array vide, mais pas sûr que ce soit la meilleure des solutions
      const result = EventUtils.formattedEvents(events, "");
      const expected: Event[] = [];
      expect(result).toEqual(expected);
    });

    it("should get events formatted with childBirthday", () => {
      const result = EventUtils.formattedEvents(events, childBirthday);
      const expected: Event[] = [
        {
          date: childBirthday,
          debut: 0,
          fin: 8,
          id: 1,
          important: true,
          nom: "événement1",
        },
        {
          date: childBirthday,
          debut: 0,
          fin: 8,
          id: 2,
          important: false,
          nom: "événement2",
        },
      ];
      expect(result).toEqual(expected);
    });
  });

  describe("essentialEvents", () => {
    it("should return empty array when there are no events", () => {
      expect(EventUtils.essentialEvents([])).toEqual([]);
    });

    it("should return empty array when there are no essential events", () => {
      const noEssentialEvents: Event[] = [
        {
          debut: 0,
          fin: 8,
          id: 2,
          important: false,
          nom: "événement2",
        },
      ];
      expect(EventUtils.essentialEvents(noEssentialEvents)).toEqual([]);
    });

    it("should return essential events", () => {
      expect(EventUtils.essentialEvents(events)).toEqual([
        {
          debut: 0,
          fin: 8,
          id: 1,
          important: true,
          nom: "événement1",
        },
      ]);
    });
  });
});
