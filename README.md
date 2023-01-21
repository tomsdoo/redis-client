# @tomsd/redis-client

It's a wrapper of [ioredis](https://www.npmjs.com/package/ioredis).  

## Installation

``` shell
npm install @tomsd/redis-client
```

## Usage

<details open><summary><h3>importing  `Redis` class.</h3></summary>

  ``` typescript
  import { Redis } from "@tomsd/redis-client";
  ```

</details>

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
