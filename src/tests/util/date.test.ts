import { expect, test } from "vitest";
import { minutesToHours } from "../../util/date.ts";

test("minutesToHours", () => {
  expect(minutesToHours(1)).toBe("1 minute");
  expect(minutesToHours(45)).toBe("45 minutes");
  expect(minutesToHours(60)).toBe("1 hour");
  expect(minutesToHours(61)).toBe("1 hour 1 minute");
  expect(minutesToHours(72)).toBe("1 hour 12 minutes");
  expect(minutesToHours(120)).toBe("2 hours");
  expect(minutesToHours(121)).toBe("2 hours 1 minute");
  expect(minutesToHours(153)).toBe("2 hours 33 minutes");
  expect(minutesToHours(179)).toBe("2 hours 59 minutes");
  expect(minutesToHours(180)).toBe("3 hours");
});
