import {
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { Redis } from "@/index";

const counter: {
  ioredis: {
    set: Array<{
      key: string;
      value: string;
      expireType?: string;
      expires?: number;
    }>;
  };
  reset: Function;
} = {
  ioredis: {
    set: [],
  },
  reset: () => {
    counter.ioredis.set = [];
  },
};

jest.mock(
  "ioredis",
  () =>
    class IORedis {
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
        expires?: number
      ): Promise<"OK"> {
        counter.ioredis.set.push({
          key,
          value,
          expireType,
          expires,
        });
        return await Promise.resolve("OK");
      }
    }
);

describe("Redis class", () => {
  describe("set()", () => {
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
      counter.reset();
    });

    it("expires", async () => {
      expect(await instance.set("key", { message: "test" }, 2)).toBe("OK");
      expect(counter.ioredis.set.length).toBe(1);
      expect(counter.ioredis.set.slice(-1)[0]).toEqual({
        key: "key",
        value: JSON.stringify({ message: "test" }),
        expireType: "EX",
        expires: 2,
      });
    });

    it("not expires", async () => {
      expect(await instance.set("key", { message: "test" })).toBe("OK");
      expect(counter.ioredis.set.length).toBe(1);
      expect(counter.ioredis.set.slice(-1)[0]).toEqual({
        key: "key",
        value: JSON.stringify({ message: "test" }),
      });
    });
  });
});
