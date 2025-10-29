import type { RedisOptions } from "ioredis";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Redis } from "@/index";

const { spy } = vi.hoisted(() => ({
  spy: vi.fn(),
}));

vi.mock("ioredis", () => ({
  default: class {
    constructor(options: RedisOptions) {
      spy(options);
    }
  },
}));

describe("Redis class", () => {
  let instance: Redis;
  beforeEach(() => {
    instance = new Redis({
      options: {
        port: 6379,
        host: "localhost",
        lazyConnect: true,
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
        lazyConnect: true,
      });
    });

    it("cache is used on call twice", () => {
      expect(instance.getRedis()).not.toBeUndefined();
      expect(instance.getRedis()).not.toBeUndefined();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        host: "localhost",
        port: 6379,
        lazyConnect: true,
      });
    });
  });
});
