import {
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { Redis, test } from "@/index";

describe("test", () => {
  it("value is 1", () => {
    expect(test).toBe(1);
  });
});

describe("Redis class", () => {
  let instance: Redis;

  beforeEach(() => {
    instance = new Redis(6379, "localhost");
  });

  afterEach(() => {});

  describe("constructor", () => {
    it("instance has port", () => {
      expect(instance).toHaveProperty("port", 6379);
    });

    it("instance has host", () => {
      expect(instance).toHaveProperty("host", "localhost");
    });

    it("instance has redis", () => {
      expect(instance).toHaveProperty("redis", undefined);
    });
  });
});
