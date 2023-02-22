import { clients } from "./common";

(async () => {
  const beforeKeys = await clients.articleRedis.getKeys();

  const [ key, ...rest ] = beforeKeys;

  console.log(
    await clients.articleRedis.del(key)
  );

  const afterKeys = await clients.articleRedis.getKeys();
  console.log({
    beforeKeyCount: beforeKeys.length,
    afterKeyCount: afterKeys.length,
  });

})()
  .then(() => process.exit())
  .catch(() => process.exit());
