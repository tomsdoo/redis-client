# EasyRedisConfig

EasyRedisConfig is an interface for Redis class constructor.

``` mermaid
classDiagram
class EasyRedisConfig {
  <<interface>>
  +?string keyProp
  +?number expireSeconds
  +RedisOptions options
}
```

``` typescript
new Redis({
  keyProp: "uniqueName",
  expireSeconds: 3600,
  options: {
    port: 6379,
    host "localhost",
  },
});
```

### keyProp

|subject|body|
|:--|:--|
|required|No|
|example|"key"|
|description|key property name of the object, applied on `get()`,`set()`,`del()`|

### expireSeconds

|subject|body|
|:--|:--|
|required|No|
|example|1200|
|description|the number of seconds that the objects expire in|

### options

|subject|body|
|:--|:--|
|required|No|
|example|{ port: 6379 }|
|description|[RedisOptions](https://luin.github.io/ioredis/index.html#RedisOptions)|
