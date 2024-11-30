import { Redis } from "@/index";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { spy } = vi.hoisted(() => ({
  spy: vi.fn(() => ({
    name: "dummy",
  })),
}));

vi.mock("ioredis", () => ({
  default: spy,
}));

describe("Redis class", () => {
  let instance: Redis;
  beforeEach(() => {
    instance = new Redis({
      options: {
        port: 6379,
        host: "localhost",
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("getRedis()", () => {
    it("call once", () => {
      expect(instance.getRedis()).not.toBeUndefined();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        host: "localhost",
        port: 6379,
      });
    });

    it("cache is used on call twice", () => {
      expect(instance.getRedis()).not.toBeUndefined();
      expect(instance.getRedis()).not.toBeUndefined();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        host: "localhost",
        port: 6379,
      });
    });
  });
});
