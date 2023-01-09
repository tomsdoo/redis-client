import IORedis from "ioredis";

interface RedisConfig {
  port?: number;
  host?: string;
  db?: number;
  password?: string;
  keyPrefix?: string;
}

export class Redis {
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

  public async get<T = any>(key: string): Promise<T> {
    return await this.getRedis()
      .get(key)
      .then((value) => {
        if (value == null) {
          return undefined;
        }
        return JSON.parse(value);
      });
  }
}
