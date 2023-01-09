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
}
