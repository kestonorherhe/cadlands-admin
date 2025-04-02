import { Injectable } from "@angular/core";

export enum Environment {
  Prod = "prod",
  Staging = "staging",
  Test = "test",
  Dev = "dev",
  Local = "local",
}

@Injectable({ providedIn: "root" })
export class EnvService {
  private _env: Environment;
  private _httpService: string;

  get env(): Environment {
    return this._env;
  }

  get httpService(): string {
    return this._httpService;
  }

  constructor() {}

  init(): Promise<void> {
    return new Promise((resolve) => {
      this.setEnvVariables();
      resolve();
    });
  }

  private setEnvVariables(): void {
    const hostname = window && window.location && window.location.hostname;
    console.log("this is the hostname =>", hostname);
    if (/^.*localhost.*/.test(hostname)) {
      this._env = Environment.Local;
      console.log("this is the _env ::", this._env);

      this._httpService = "http://localhost:3007";
      // this._httpService = "https://cadlands-api.onrender.com";
    } else if (/^ca-cadlands.vercel.app/.test(hostname)) {
      this._env = Environment.Staging;
      console.log("this is the _env ::", this._env);

      this._httpService = "https://cadlands-api.onrender.com";
    } else if (/^ca.cadlands.com/.test(hostname)) {
      this._env = Environment.Prod;
      console.log("this is the _env ::", this._env);
      this._httpService = "https://cadlands-api.onrender.com";
    } else {
      console.warn(`Cannot find environment for host name ${hostname}`);
    }
  }
}
