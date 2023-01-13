import {
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { Redis } from "@/index";

describe("Redis class", () => {
  let instance: Redis;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("constructor", () => {
    describe("without keyProp", () => {
      beforeEach(() => {
        instance = new Redis({
          keyPrefix: "some",
          options: {
            port: 6379,
            host: "localhost",
          },
        });
      });

      it("instance has config.options.port", () => {
        expect(instance.config).toHaveProperty("options.port", 6379);
      });

      it("instance has config.options.host", () => {
        expect(instance.config).toHaveProperty("options.host", "localhost");
      });

      it("instance has config.keyPrefix", () => {
        expect(instance.config).toHaveProperty("keyPrefix", "some");
      });

      it("instance has redis", () => {
        expect(instance).toHaveProperty("redis", undefined);
      });

      it("instance has keyProp as default value", () => {
        expect(instance.keyProp).toBe("_id");
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
  });
});
