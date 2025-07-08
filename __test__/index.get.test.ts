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
  let instance: Redis<{ message: string }>;
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

  it("undefined will be returned if value is null", async () => {
    spy = vi.spyOn(IORedis.prototype, "get").mockResolvedValue(null);
    expect(await instance.get("wantNull")).toBe(undefined);
    expect(spy).toHaveBeenCalledWith("wantNull");
  });

  it("object will be returned if value is not null", async () => {
    spy = vi.spyOn(IORedis.prototype, "get").mockResolvedValue(
      JSON.stringify({
        message: "test",
      }),
    );
    expect(await instance.get("some")).toHaveProperty("message", "test");
    expect(spy).toHaveBeenCalledWith("some");
  });

  it("error will be rejected if value is broken object", async () => {
    spy = vi.spyOn(IORedis.prototype, "get").mockResolvedValue("brokenObject");
    await expect(instance.get("brokenObject")).rejects.toBeInstanceOf(Error);
    expect(spy).toHaveBeenCalledWith("brokenObject");
  });
});
