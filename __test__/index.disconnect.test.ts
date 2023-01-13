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
    constructor: Array<{
      port: number;
      host: string;
    }>;
    disconnect: any[];
  };
  reset: Function;
} = {
  ioredis: {
    constructor: [],
    disconnect: [],
  },
  reset: () => {
    counter.ioredis.constructor = [];
    counter.ioredis.disconnect = [];
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
        counter.ioredis.constructor.push({
          port,
          host,
        });
      }

      public disconnect(): void {
        counter.ioredis.disconnect.push({
          called: true,
        });
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

  describe("disconnect()", () => {
    it("success", () => {
      instance.disconnect();
      expect(counter.ioredis.disconnect.length).toBe(1);
      expect(counter.ioredis.disconnect.slice(-1)[0]).toEqual({
        called: true,
      });
    });

    it("IORedis instance is recreated if disconnected", () => {
      instance.disconnect();
      expect(counter.ioredis.constructor.length).toBe(1);
      expect(counter.ioredis.constructor.slice(-1)[0]).toEqual({
        port: 6379,
        host: "localhost",
      });
      instance.disconnect();
      expect(counter.ioredis.constructor.length).toBe(2);
      expect(counter.ioredis.constructor.slice(-1)[0]).toEqual({
        port: 6379,
        host: "localhost",
      });
    });
  });
});
