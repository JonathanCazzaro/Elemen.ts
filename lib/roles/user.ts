import { UserConstructor } from "../types/constructors";
import { RoleEnum } from "../types/enum";

/**
 * Initiates a new User.
 */
export default class User {
  #isLoggedIn: boolean = false;
  #role: RoleEnum = RoleEnum.VISITOR;
  #token?: string;
  authenticate: (data?: Record<string, any>) => void = () => null;
  login: (data?: Record<string, any>) => void = () => null;
  logout: () => void = () => null;

  /**
   * Initiates a new User.
   * @param {object} [properties] - (optional) Any key/value couple needed to define the user.
   * @param {function} [authenticate] - (optional) Custom method to handle authentication (with tokens for example).
   * @param {function} [login] - (optional) Custom method to handle connection.
   */
  constructor({ properties, authenticate, login }: UserConstructor) {
    for (const property in properties) {
      this[property] = properties[property];
    }
    if (authenticate) this.authenticate = authenticate;
    if (login) this.login = login;
  }

  get isLoggedIn(): boolean {
    return this.#isLoggedIn;
  }

  get role(): RoleEnum {
    return this.#role;
  }

  get token(): string {
    return this.#token;
  }

  setLoggedIn(role: RoleEnum, token?: string): void {
    this.#isLoggedIn = true;
    this.#role = role;
    if (token) this.#token = token;
  }

  setLoggedOut(): void {
    this.#isLoggedIn = false;
    if (this.#token) this.#token = "";
    this.#role = RoleEnum.VISITOR;
  }
}
