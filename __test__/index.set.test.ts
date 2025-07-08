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

vi.mock("uuid", () => ({
  v4: () => "dummyId",
}));

describe("Redis class", () => {
  describe("set()", () => {
    interface TestType {
      key: string;
      message: string;
    }

    let instance: Redis<TestType>;
    let spy: MockInstance;

    describe("expireSeconds is not set", () => {
      beforeEach(() => {
        instance = new Redis({
          options: {
            port: 6379,
            host: "localhost",
            lazyConnect: true,
          },
          keyProp: "key",
        });

        spy = vi.spyOn(IORedis.prototype, "set").mockResolvedValue("OK");
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it("not expires", async () => {
        expect(await instance.set({ message: "test" })).toEqual({
          key: "dummyId",
          message: "test",
        });
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(
          "dummyId",
          JSON.stringify({
            key: "dummyId",
            message: "test",
          }),
        );
      });
    });

    describe("expireSeconds is set", () => {
      beforeEach(() => {
        instance = new Redis({
          options: {
            port: 6379,
            host: "localhost",
            lazyConnect: true,
          },
          expireSeconds: 10,
          keyProp: "key",
        });
      });

      it("expires", async () => {
        expect(await instance.set({ message: "test" })).toEqual({
          key: "dummyId",
          message: "test",
        });
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(
          "dummyId",
          JSON.stringify({
            key: "dummyId",
            message: "test",
          }),
          "EX",
          10,
        );
      });
    });
  });
});
