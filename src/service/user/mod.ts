import IncrediblyInsecureCrypto from "../../crypto/mod.ts";

export interface User {
  readonly id: string;
  readonly name: string;
  readonly verified: boolean;
}

export interface UserConfig {
  readonly name: string;
}

class UserService {
  #users: { [id: string]: User } = {};

  public async getById(id: string): Promise<User | void> {
    return this.#users[id];
  }

  public async create(config: UserConfig): Promise<User> {
    const user: User = {
      id: IncrediblyInsecureCrypto.uuid(),
      verified: false,
      ...config,
    };
    return this.#users[config.name] = user;
  }
}

const userService = new UserService();

export default userService;
