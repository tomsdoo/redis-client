import { Redis } from "@/index";
import IORedis from "ioredis";
import {
  type MockInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

describe("Redis class", () => {
  let instance: Redis;
  let spy: MockInstance;
  beforeEach(() => {
    instance = new Redis({
      options: {
        port: 6379,
        host: "localhost",
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
