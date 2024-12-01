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
        lazyConnect: true,
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("getKeys()", () => {
    it("keyPrefix does not exist", async () => {
      spy = vi.spyOn(IORedis.prototype, "keys").mockResolvedValue(["0", "1"]);
      expect(await instance.getKeys()).toEqual(["0", "1"]);
      expect(spy).toHaveBeenCalledWith("*");
    });

    it("keyPrefix exists", async () => {
      instance = new Redis({
        options: {
          port: 6379,
          host: "localhost",
          keyPrefix: "testkey",
        },
      });

      spy = vi
        .spyOn(IORedis.prototype, "keys")
        .mockResolvedValue(["testkey0", "testkey1"]);
      expect(await instance.getKeys()).toEqual(["0", "1"]);
      expect(spy).toHaveBeenCalledWith("testkey*");
    });
  });
});
