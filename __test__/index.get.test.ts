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
    get: string[];
  };
  reset: () => void;
} = {
  ioredis: {
    get: [],
  },
  reset: () => {
    counter.ioredis.get = [];
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

      public async get(key: string): Promise<string | null> {
        counter.ioredis.get.push(key);
        const result =
          key === "wantNull"
            ? null
            : key === "brokenObject"
              ? "brokenObject"
              : JSON.stringify({
                  message: "test",
                });
        return await Promise.resolve(result);
      }
    },
);

describe("Redis class", () => {
  let instance: Redis<{ message: string }>;
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

  it("undefined will be returned if value is null", async () => {
    expect(await instance.get("wantNull")).toBe(undefined);
    expect(counter.ioredis.get.length).toBe(1);
    expect(counter.ioredis.get.slice(-1)[0]).toBe("wantNull");
  });

  it("object will be returned if value is not null", async () => {
    expect(await instance.get("some")).toHaveProperty("message", "test");
    expect(counter.ioredis.get.length).toBe(1);
    expect(counter.ioredis.get.slice(-1)[0]).toBe("some");
  });

  it("error will be rejected if value is broken object", async () => {
    await expect(instance.get("brokenObject")).rejects.toBeInstanceOf(Error);
    expect(counter.ioredis.get.length).toBe(1);
    expect(counter.ioredis.get.slice(-1)[0]).toBe("brokenObject");
  });
});
