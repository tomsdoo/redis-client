import { Redis } from "@/index";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

const counter: {
  ioredis: {
    constructor: Array<{
      port: number;
      host: string;
    }>;
  };
  reset: () => void;
} = {
  ioredis: {
    constructor: [],
  },
  reset: () => {
    counter.ioredis.constructor = [];
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
        counter.ioredis.constructor.push({ port, host });
      }
    },
);

describe("Redis class", () => {
  let instance: Redis;
  beforeEach(() => {
    instance = new Redis({
      options: {
        port: 6379,
        host: "locahohost",
      },
    });
  });

  afterEach(() => {
    counter.reset();
  });

  describe("getRedis()", () => {
    it("call once", () => {
      expect(instance.getRedis()).not.toBeUndefined();
      expect(counter.ioredis.constructor.length).toBe(1);
    });

    it("cache is used on call twice", () => {
      expect(instance.getRedis()).not.toBeUndefined();
      expect(instance.getRedis()).not.toBeUndefined();
      expect(counter.ioredis.constructor.length).toBe(1);
    });
  });
});
