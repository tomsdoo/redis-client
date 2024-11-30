import { Redis } from "../src/";

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

export const clients = {
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
