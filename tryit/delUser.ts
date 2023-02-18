import { clients } from "./common";

(async () => {
  const beforeKeys = await clients.userRedis.getKeys();

  const [ key, ...rest ] = beforeKeys;

  console.log(
    await clients.userRedis.del(key)
  );

  const afterKeys = await clients.userRedis.getKeys();
  console.log({
    beforeKeyCount: beforeKeys.length,
    afterKeyCount: afterKeys.length,
  });
})()
  .then(() => process.exit())
  .catch(() => process.exit());
