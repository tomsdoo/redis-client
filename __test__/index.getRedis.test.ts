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
  };
  reset: Function;
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
      constructor(port: number, host: string) {
        this.port = port;
        this.host = host;
        counter.ioredis.constructor.push({ port, host });
      }
    }
);

describe("Redis class", () => {
  let instance: Redis;
  beforeEach(() => {
    instance = new Redis(6379, "locahohost");
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
