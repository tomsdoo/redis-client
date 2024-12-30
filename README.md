# @tomsd/redis-client

It's a wrapper of [ioredis](https://www.npmjs.com/package/ioredis).  
See [redis-client.netlify.app](https://redis-client.netlify.app/) also.

![npm](https://img.shields.io/npm/v/@tomsd/redis-client?style=for-the-badge&logo=npm)
![NPM](https://img.shields.io/npm/l/@tomsd/redis-client?style=for-the-badge&logo=npm)

![ci](https://img.shields.io/github/actions/workflow/status/tomsdoo/redis-client/ci.yml?style=social&logo=github)
![checks](https://img.shields.io/github/check-runs/tomsdoo/redis-client/main?style=social&logo=github)
![top language](https://img.shields.io/github/languages/top/tomsdoo/redis-client?style=social&logo=typescript)
![Maintenance](https://img.shields.io/maintenance/yes/2025?style=social&logo=github)
![depends on ioredis@5](https://img.shields.io/badge/ioredis-ioredis@5-informational?style=social&logo=redis)
![depends on node greater or equal 18](https://img.shields.io/badge/node.js-%3E%3D%2018-lightyellow?style=social&logo=nodedotjs)


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