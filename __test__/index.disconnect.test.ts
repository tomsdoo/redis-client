import IORedis from "ioredis";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type MockInstance,
  vi,
} from "vitest";
import { Redis } from "@/index";

describe("Redis class", () => {
  let instance: Redis;
  let spy: MockInstance;
  beforeEach(() => {
    instance = new Redis({
      options: {
        port: 6379,
        host: "localhost",
        lazyConnect: true,
      },
    });

    spy = vi.spyOn(IORedis.prototype, "disconnect").mockResolvedValue();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("disconnect()", () => {
    it("success", () => {
      instance.disconnect();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("IORedis instance is recreated if disconnected", () => {
      instance.disconnect();
      expect(spy).toHaveBeenCalledTimes(1);
      instance.disconnect();
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });
});
