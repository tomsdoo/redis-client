# @tomsd/redis-client

It's a wrapper of [ioredis](https://www.npmjs.com/package/ioredis).  

## Installation

``` shell
npm install @tomsd/redis-client
```

## Usage

importing  `Redis` class.

``` typescript
import { Redis } from "@tomsd/redis-client";
```

creating an instance.

``` typescript
interface Some {
  key: string;
  name: string;
  message: string;
}

const redis = new Redis<Some>({
  keyProp: "key",
  options: {
    port: 6379,
    host: "somehost",
  }
});
```

setting data.

``` typescript
console.log(
  await redis.set({
    key: "key",
    name: "name",
    message: "message",
  })
) // { key: "key", name: "name", message: "message" }
```

getting keys.

``` typescript
console.og(
  await redis.getKeys()
) // ["key"]
```

getting data.

``` typescript
console.log(
  await redis.get("key")
) // { key: "key", name: "name", message: "message" }
```

deleting data.

``` typescript
console.log(
  await redis.del("key")
) // 1
```
