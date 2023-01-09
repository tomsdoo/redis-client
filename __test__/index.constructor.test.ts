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
    instance = new Redis({
      port: 6379,
      host: "localhost",
      keyPrefix: "some",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("constructor", () => {
    it("instance has config.port", () => {
      expect(instance.config).toHaveProperty("port", 6379);
    });

    it("instance has config.host", () => {
      expect(instance.config).toHaveProperty("host", "localhost");
    });

    it("instance has config.keyPrefix", () => {
      expect(instance.config).toHaveProperty("keyPrefix", "some");
    });

    it("instance has redis", () => {
      expect(instance).toHaveProperty("redis", undefined);
    });
  });
});
