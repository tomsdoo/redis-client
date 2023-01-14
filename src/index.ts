import IORedis, { RedisOptions } from "ioredis";
import { v4 as uuid } from "uuid";

interface EasyRedisConfig {
  keyProp?: string;
  keyPrefix?: string;
  expireSeconds?: number;
  options: RedisOptions;
}

export class Redis<T = any> {
  public config: EasyRedisConfig;
  protected redis: IORedis | undefined;
  constructor(config: EasyRedisConfig) {
    this.config = config;
    this.redis = undefined;
  }

  public get keyProp(): string {
    return this.config.keyProp ?? "_id";
  }

  public get expireSeconds(): number | undefined {
    return this.config.expireSeconds;
  }

  public getRedis(): IORedis {
    this.redis = this.redis ?? new IORedis(this.config.options);
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

  public async set(value: T | Partial<T>): Promise<T> {
    const redis = this.getRedis();
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const savingObj: T = {
      [this.keyProp]: uuid(),
      ...value,
    } as T;
    // @ts-expect-error
    const key = savingObj[this.keyProp];
    return this.expireSeconds !== undefined
      ? await redis
          .set(key, JSON.stringify(savingObj), "EX", this.expireSeconds)
          .then(() => savingObj)
      : await redis.set(key, JSON.stringify(savingObj)).then(() => savingObj);
  }

  public async del(key: string): Promise<number> {
    return await this.getRedis().del(key);
  }

  public disconnect(): void {
    this.getRedis().disconnect();
    this.redis = undefined;
  }
}
