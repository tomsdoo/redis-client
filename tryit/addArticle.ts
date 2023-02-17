import { clients } from "./common";

(async () => {
  console.log(
    await clients.articleRedis.set({
      title: "john's article",
      body: "body",
      author: "john@test.test",
    })
  );
})()
  .then(() => process.exit())
  .catch(() => process.exit());
