import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import { Redis } from "@/index";

const counter: {
  ioredis: {
    keys: string[];
  };
  reset: Function;
} = {
  ioredis: {
    keys: [],
  },
  reset: () => {
    counter.ioredis.keys = [];
  },
};

jest.mock(
  "ioredis",
  () =>
    class IORedis {
      protected port: number;
      protected host: string;
      protected keyPrefix: string;
      constructor({
        port,
        host,
        keyPrefix,
      }: {
        port: number;
        host: string;
        keyPrefix: string;
      }) {
        this.port = port;
        this.host = host;
        this.keyPrefix = keyPrefix;
      }

      public async keys(filterKey: string): Promise<string[]> {
        counter.ioredis.keys.push(filterKey);
        return await Promise.resolve(
          Array.from(Array(2), (v, i) => i).map(
            (i) => `${filterKey.replace(/\*/g, "")}${i}`
          )
        );
      }
    }
);

describe("Redis class", () => {
  let instance: Redis;
  beforeEach(() => {
    counter.reset();
  });

  describe("getKeys()", () => {
    it("keyPrefix does not exist", async () => {
      instance = new Redis({
        options: {
          port: 6379,
          host: "localhost",
        },
      });

      expect(await instance.getKeys()).toEqual(["0", "1"]);
      expect(counter.ioredis.keys.length).toBe(1);
      expect(counter.ioredis.keys.slice(-1)[0]).toBe("*");
    });

    it("keyPrefix exists", async () => {
      instance = new Redis({
        options: {
          port: 6379,
          host: "localhost",
          keyPrefix: "testkey",
        },
      });

      expect(await instance.getKeys()).toEqual(["0", "1"]);
      expect(counter.ioredis.keys.length).toBe(1);
      expect(counter.ioredis.keys.slice(-1)[0]).toBe("testkey*");
    });
  });
});
