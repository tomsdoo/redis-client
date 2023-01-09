import {
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { Redis } from "@/index";

describe("Redis class", () => {
  let instance: Redis;

  beforeEach(() => {
    instance = new Redis(6379, "localhost");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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
