import { clients } from "./common";

(async () => {
  console.log(
    await clients.userRedis.set({
      name: "john",
      email: "john@test.test",
    })
  )
})()
  .then(() => process.exit())
  .catch(() => process.exit());
