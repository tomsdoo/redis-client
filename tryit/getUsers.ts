import { clients } from "./common";

(async () => {
  const keys = await clients.userRedis.getKeys();

  for(const key of keys) {
    console.log(
      await clients.userRedis.get(key)
    );
  }
})()
  .then(() => process.exit())
  .catch(() => process.exit());

