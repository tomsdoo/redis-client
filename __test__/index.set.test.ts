import { Redis } from "@/index";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const counter: {
  ioredis: {
    set: Array<{
      key: string;
      value: string;
      expireType?: string;
      expires?: number;
    }>;
  };
  reset: () => void;
} = {
  ioredis: {
    set: [],
  },
  reset: () => {
    counter.ioredis.set = [];
  },
};

vi.mock("uuid", () => ({
  v4: () => "dummyId",
}));

vi.mock("ioredis", () => ({
  default: class IORedis {
    protected port: number;
    protected host: string;
    constructor({ port, host }: { port: number; host: string }) {
      this.port = port;
      this.host = host;
    }

    public async set(
      key: string,
      value: string,
      expireType?: string,
      expires?: number,
    ): Promise<"OK"> {
      counter.ioredis.set.push({
        key,
        value,
        expireType,
        expires,
      });
      return await Promise.resolve("OK");
    }
  },
}));

describe("Redis class", () => {
  describe("set()", () => {
    interface TestType {
      key: string;
      message: string;
    }

    let instance: Redis<TestType>;

    describe("expireSeconds is not set", () => {
      beforeEach(() => {
        instance = new Redis({
          options: {
            port: 6379,
            host: "localhost",
          },
          keyProp: "key",
        });
      });

      afterEach(() => {
        counter.reset();
      });

      it("not expires", async () => {
        expect(await instance.set({ message: "test" })).toEqual({
          key: "dummyId",
          message: "test",
        });
        expect(counter.ioredis.set.length).toBe(1);
        expect(counter.ioredis.set.slice(-1)[0]).toEqual({
          key: "dummyId",
          value: JSON.stringify({ key: "dummyId", message: "test" }),
        });
      });
    });

    describe("expireSeconds is set", () => {
      beforeEach(() => {
        instance = new Redis({
          options: {
            port: 6379,
            host: "localhost",
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
        expect(counter.ioredis.set.length).toBe(1);
        expect(counter.ioredis.set.slice(-1)[0]).toEqual({
          key: "dummyId",
          value: JSON.stringify({ key: "dummyId", message: "test" }),
          expireType: "EX",
          expires: 10,
        });
      });
    });
  });
});
