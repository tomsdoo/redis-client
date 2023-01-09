import IORedis from "ioredis";

export class Redis {
  protected port: number;
  protected host: string;
  protected redis: IORedis | undefined;
  constructor(port: number, host: string) {
    this.port = port;
    this.host = host;
    this.redis = undefined;
  }

  public getRedis(): IORedis {
    this.redis = this.redis ?? new IORedis(this.port, this.host);
    return this.redis;
  }
}
