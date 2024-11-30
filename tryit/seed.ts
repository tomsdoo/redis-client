import { clients } from "./common";

const users = ["alice", "bob", "charlie"].map((name) => ({
  name,
  email: `${name}@test.test`,
}));

const articles = users.map((user) => ({
  title: `${user.name}'s article`,
  body: "some body",
  author: user.email,
}));

(async () => {
  for (const user of users) {
    await clients.userRedis.set(user);
  }

  for (const article of articles) {
    await clients.articleRedis.set(article);
  }
})()
  .then(() => {
    process.exit();
  })
  .catch((e) => {
    console.log(e);
    process.exit();
  });
