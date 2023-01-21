# example

Two types named `User` and `Article` are there.  



``` typescript
interface User {
  email: string;
  name: string;
}

interface Article {
  id: string;
  authorEmail: string;
  subject: string;
  body: string;
}

const userDb = new Redis<User>({
  keyProp: "email",
  options: {
    port: 6379,
    host: "localhost",
    keyPrefix: "user",
  },
});

const articleDb = new Redis<Article>({
  keyProp: "id",
  options: {
    port: 6379,
    host: "localhost",
    keyPrefix: "article",
  },
});
```

``` typescript
// adding users
const users = [
  "alice", "bob", "charlie",
]
  .map(name => ({
    email: `${name}@test.domain`,
    name,
  }));

for(const user of users) {
  await userDb.set(user);
}
```

``` typescript
// adding articles
const articles = users.map(user => ({
  subject: `${user.name}'s article`,
  body: "body",
  authorEmail: user.email,
}));

for(const article of articles) {
  await articleDb.set(article);
}
```

``` typescript
// getting keys
console.log(await userDb.getKeys());
console.log(await articleDb.getKeys());
```

``` typescript
// getting data
console.log(
  await userDb.getKeys()
    .then(([key]) => userDb.get(key))
);

console.log(
  await articleDb.getKeys()
    .then(([key]) => articleDb.get(key))
);
```

``` typescript
// updating data
console.log(
  await userDb.getKeys()
    .then(([key]) => userDb.get(key))
    .then(user => ({
      ...user,
      name: `${user.name}-modified`,
    }))
);

console.log(
  await articleDb.getKeys()
    .then(([key]) => articleDb.get(key))
    .then(article => ({
      ...article,
      subject: `${article.subject}-modified`,
    }))
);
```

``` typescript
// deleting data
console.log(
  await userDb.getKeys()
    .then(([key]) => userDb.del(key))
);

console.log(
  await articleDb.getKeys()
    .then(([key]) => articleDb.del(key))
);
```




