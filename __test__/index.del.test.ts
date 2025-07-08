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
