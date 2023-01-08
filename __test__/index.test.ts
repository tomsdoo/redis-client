import { beforeEach, afterEach, describe, it, expect, jest } from "@jest/globals";
import { test } from "@/index";

describe("test", () => {
  it("value is 1", () => {
    expect(test).toBe(1);
  });
});