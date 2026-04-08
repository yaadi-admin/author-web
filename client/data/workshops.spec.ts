import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getWorkshopTemporalStatus,
  sortWorkshopsByRelevance,
  type Workshop,
} from "./workshops";

const makeWorkshop = (overrides: Partial<Workshop>): Workshop => ({
  id: 1,
  date: "April 20, 2026",
  title: "Workshop",
  description: "Description",
  image: "https://example.com/workshop.jpg",
  isActive: true,
  url: "https://example.com",
  comingSoon: false,
  ...overrides,
});

afterEach(() => {
  vi.useRealTimers();
});

describe("sortWorkshopsByRelevance", () => {
  it("places the nearest upcoming event first and keeps past events below upcoming ones", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-15T12:00:00Z"));

    const workshops = sortWorkshopsByRelevance([
      makeWorkshop({ id: 1, date: "May 20, 2026", title: "Later upcoming" }),
      makeWorkshop({ id: 2, date: "April 18, 2026", title: "Soon upcoming" }),
      makeWorkshop({ id: 3, date: "March 12, 2026", title: "Recent past" }),
      makeWorkshop({ id: 4, date: "January 08, 2026", title: "Older past" }),
    ]);

    expect(workshops.map((workshop) => workshop.title)).toEqual([
      "Soon upcoming",
      "Later upcoming",
      "Recent past",
      "Older past",
    ]);
  });
});

describe("getWorkshopTemporalStatus", () => {
  it("marks items before today as past and items on/after today as upcoming", () => {
    const referenceDate = new Date("2026-04-15T12:00:00Z");

    expect(
      getWorkshopTemporalStatus(
        makeWorkshop({ date: "April 14, 2026" }),
        referenceDate,
      ),
    ).toBe("past");

    expect(
      getWorkshopTemporalStatus(
        makeWorkshop({ date: "April 15, 2026" }),
        referenceDate,
      ),
    ).toBe("upcoming");
  });
});
