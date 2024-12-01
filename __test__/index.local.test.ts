import { Redis } from "@/index";
import { beforeAll, describe, expect, it } from "vitest";

interface User {
  email: string;
  name: string;
}

interface Article {
  _id: string;
  author: string;
  title: string;
  body: string;
}

const clients = {
  userRedis: new Redis<User>({
    keyProp: "email",
    options: {
      port: 6379,
      host: "localhost",
      keyPrefix: "user",
    },
  }),
  articleRedis: new Redis<Article>({
    options: {
      port: 6379,
      host: "localhost",
      keyPrefix: "article",
    },
  }),
};

const seed = ((names: string[]) => ({
  users: names.map((name) => ({
    name,
    email: `${name}@test.test`,
  })),
  articles: names.map((name) => ({
    title: `${name}'s article`,
    body: "some body",
    author: `${name}@test.test`,
  })),
}))(["alice", "bob", "charlie"]);

describe("local", () => {
  beforeAll(async () => {
    for (const user of seed.users) {
      await clients.userRedis.set(user);
    }
    for (const article of seed.articles) {
      await clients.articleRedis.set(article);
    }
  });

  it("seed data users", async () => {
    const userKeys = await clients.userRedis.getKeys();
    const users = await Promise.all(
      userKeys.map((userKey) => clients.userRedis.get(userKey)),
    );
    expect(users).toHaveLength(3);
    expect(
      users.toSorted((a, b) =>
        a.name === b.name ? 0 : a.name > b.name ? 1 : -1,
      ),
    ).toEqual(seed.users);
  });

  it("seed data articles", async () => {
    const articleKeys = await clients.articleRedis.getKeys();
    const articles = await Promise.all(
      articleKeys.map((articleKey) => clients.articleRedis.get(articleKey)),
    );
    const articlesWithoutId = articles.map((article) => {
      const { _id, ...rest } = article;
      return rest;
    });
    expect(articles).toHaveLength(3);
    expect(
      articlesWithoutId.toSorted((a, b) =>
        a.author === b.author ? 0 : a.author > b.author ? 1 : -1,
      ),
    ).toEqual(seed.articles);
  });

  it("add user", async () => {
    const john = {
      name: "john",
      email: "john@test.test",
    };
    await expect(clients.userRedis.getKeys()).resolves.toHaveLength(3);
    await expect(clients.userRedis.set(john)).resolves.toEqual(john);
    await expect(clients.userRedis.get(john.email)).resolves.toEqual(john);
    await expect(clients.userRedis.getKeys()).resolves.toHaveLength(4);
  });

  it("add article", async () => {
    const article = {
      title: "john's article",
      body: "body",
      author: "john@test.test",
    };
    await expect(clients.articleRedis.getKeys()).resolves.toHaveLength(3);
    await expect(clients.articleRedis.set(article)).resolves.toSatisfy(
      (registeredArticle) => {
        const { _id, title } = registeredArticle as Article;
        return article.title === title;
      },
    );
    await expect(clients.articleRedis.getKeys()).resolves.toHaveLength(4);
  });

  it("remove user", async () => {
    await expect(clients.userRedis.getKeys()).resolves.toHaveLength(4);
    await expect(clients.userRedis.del("john@test.test")).resolves.toBe(1);
    await expect(clients.userRedis.getKeys()).resolves.toHaveLength(3);
  });

  it("remove article", async () => {
    const articleKeys = await clients.articleRedis.getKeys();
    expect(articleKeys).toHaveLength(4);
    await expect(clients.articleRedis.del(articleKeys[0])).resolves.toBe(1);
    await expect(clients.articleRedis.getKeys()).resolves.toHaveLength(3);
  });
});
