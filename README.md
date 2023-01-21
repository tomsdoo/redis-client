# @tomsd/redis-client

It's a wrapper of [ioredis](https://www.npmjs.com/package/ioredis).  

## Installation

``` shell
npm install @tomsd/redis-client
```

## Usage

<details open><summary><h3>importing  Redis class.</h3></summary>

``` typescript
import { Redis } from "@tomsd/redis-client";
```

</details>

<details open><summary><h3>creating an instance.</h3></summary>

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

</details>

<details open><summary><h3>setting data.</h3></summary>

``` typescript
console.log(
  await redis.set({
    key: "key",
    name: "name",
    message: "message",
  })
) // { key: "key", name: "name", message: "message" }
```

</details>

<details open><summary><h3>getting keys.</h3></summary>

``` typescript
console.og(
  await redis.getKeys()
) // ["key"]
```

</details>

<details open><summary><h3>getting data.</h3></summary>

``` typescript
console.log(
  await redis.get("key")
) // { key: "key", name: "name", message: "message" }
```

</details>

<details open><summary><h3>deleting data.</h3></summary>

``` typescript
console.log(
  await redis.del("key")
) // 1
```

</details>