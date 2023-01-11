import IORedis from "ioredis";

interface RedisConfig {
  port?: number;
  host?: string;
  db?: number;
  password?: string;
  keyPrefix?: string;
}

export class Redis<T = any> {
  public config: RedisConfig;
  protected redis: IORedis | undefined;
  constructor(config: RedisConfig) {
    this.config = config;
    this.redis = undefined;
  }

  public getRedis(): IORedis {
    this.redis = this.redis ?? new IORedis(this.config);
    return this.redis;
  }

  public async getKeys(): Promise<string[]> {
    const keyFilter = `${this.config.keyPrefix ?? ""}*`;
    const sliceKey = (s: string): string =>
      s.slice(this.config?.keyPrefix?.length ?? 0);
    return await this.getRedis()
      .keys(keyFilter)
      .then((keys: string[]) => keys.map(sliceKey));
  }

  public async get(key: string): Promise<T> {
    return await this.getRedis()
      .get(key)
      .then((value) => {
        if (value == null) {
          return undefined;
        }
        return JSON.parse(value);
      });
  }

  public async set(
    key: string,
    value: any,
    expireSeconds?: number
  ): Promise<"OK"> {
    const redis = this.getRedis();
    return expireSeconds !== undefined
      ? await redis.set(key, JSON.stringify(value), "EX", expireSeconds)
      : await redis.set(key, JSON.stringify(value));
  }

  public async del(key: string): Promise<number> {
    return await this.getRedis().del(key);
  }

  public disconnect(): void {
    this.getRedis().disconnect();
    this.redis = undefined;
  }
}
