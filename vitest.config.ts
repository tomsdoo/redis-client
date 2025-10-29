import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          include: ["__test__/**/*.test.ts"],
          exclude: ["__test__/**/*.local.test.ts"],
          name: "node",
          environment: "node",
        },
        resolve: {
          alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@@": fileURLToPath(new URL("./", import.meta.url)),
          },
        },
      },
      {
        test: {
          include: ["__test__/**/*.local.test.ts"],
          name: "local",
          environment: "node",
          setupFiles: ["./vitest.local.setup.ts"],
        },
        resolve: {
          alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@@": fileURLToPath(new URL("./", import.meta.url)),
          },
        },
      },
    ],
  },
});
