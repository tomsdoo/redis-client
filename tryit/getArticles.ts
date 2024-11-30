import { clients } from "./common";

(async () => {
  const keys = await clients.articleRedis.getKeys();

  for (const key of keys) {
    console.log(await clients.articleRedis.get(key));
  }
})()
  .then(() => process.exit())
  .catch(() => process.exit());
