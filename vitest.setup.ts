import { exec } from "child_process";
import { afterAll, beforeAll } from "vitest";

function execute(cmd: string) {
  console.log(cmd);
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
}

beforeAll(async () => {
  await execute("npm run start-redis");
});

afterAll(async () => {
  await execute("npm run stop-redis");
});
