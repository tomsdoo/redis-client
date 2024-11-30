import { Redis } from "@/index";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

describe("Redis class", () => {
  let instance: Redis;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("constructor", () => {
    describe("without some", () => {
      beforeEach(() => {
        instance = new Redis({
          options: {
            port: 6379,
            host: "localhost",
            keyPrefix: "some",
          },
        });
      });

      it("instance has config.options.port", () => {
        expect(instance.config).toHaveProperty("options.port", 6379);
      });

      it("instance has config.options.host", () => {
        expect(instance.config).toHaveProperty("options.host", "localhost");
      });

      it("instance has config.options.keyPrefix", () => {
        expect(instance.config).toHaveProperty("options.keyPrefix", "some");
      });

      it("instance has redis", () => {
        expect(instance).toHaveProperty("redis", undefined);
      });

      it("instance has keyProp as default value", () => {
        expect(instance.keyProp).toBe("_id");
      });

      it("instance has expireSeconds as default value", () => {
        expect(instance.expireSeconds).toBe(undefined);
      });
    });

    describe("with keyProp", () => {
      beforeEach(() => {
        instance = new Redis({
          keyProp: "keyProp",
          options: {
            port: 6379,
            host: "localhost",
          },
        });
      });

      it("instance has keyProp", () => {
        expect(instance.keyProp).toBe("keyProp");
      });
    });

    describe("with expireSeconds", () => {
      beforeEach(() => {
        instance = new Redis({
          options: {
            port: 6379,
            host: "localhost",
          },
          expireSeconds: 10,
        });
      });

      it("instance has expireSeconds", () => {
        expect(instance.expireSeconds).toBe(10);
      });
    });
  });
});
