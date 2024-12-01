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

    spy = vi.spyOn(IORedis.prototype, "del").mockResolvedValue(1);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("del()", () => {
    it("success", async () => {
      expect(await instance.del("test")).toBe(1);
      expect(spy).toHaveBeenCalledWith("test");
    });
  });
});
