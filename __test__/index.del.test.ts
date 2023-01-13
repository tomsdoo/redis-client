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
    del: string[];
  };
  reset: Function;
} = {
  ioredis: {
    del: [],
  },
  reset: () => {
    counter.ioredis.del = [];
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

      public async del(key: string): Promise<number> {
        counter.ioredis.del.push(key);
        return await Promise.resolve(1);
      }
    }
);

describe("Redis class", () => {
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

  describe("del()", () => {
    it("success", async () => {
      expect(await instance.del("test")).toBe(1);
      expect(counter.ioredis.del.length).toBe(1);
      expect(counter.ioredis.del.slice(-1)[0]).toBe("test");
    });
  });
});
