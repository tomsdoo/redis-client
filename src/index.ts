import IORedis from "ioredis";

export const test = 1;

export class Redis {
  protected port: number;
  protected host: string;
  protected redis: IORedis | undefined;
  constructor(port: number, host: string) {
    this.port = port;
    this.host = host;
    this.redis = undefined;
  }

  public getRedis() {
    this.redis = this.redis ?? new IORedis(this.port, this.host);
    return this.redis;
  }
}
