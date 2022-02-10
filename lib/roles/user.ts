import { UserConstructor } from "../types/constructors";
import { RoleEnum } from "../types/enum";
import { UserType } from "../types/types";

/**
 * Initiates a new User.
 */
export default class User {
  isLogged: boolean = false;
  role: RoleEnum = RoleEnum.VISITOR;
  token?: string;
  authenticate: (this: UserType) => Promise<boolean> | boolean | null = function (this) {
    return null;
  };
  connect: (this: UserType) => Promise<boolean> | boolean | null = function (this) {
    return null;
  };

  /**
   * Initiates a new User.
   * @param {object} [properties] - (optional) Any key/value couple needed to define the user.
   * @param {function} [authenticate] - (optional) Custom method to handle authentication (with tokens for example).
   * @param {function} [connect] - (optional) Custom method to handle connection.
   */
  constructor({ properties, authenticate, connect }: UserConstructor) {
    for (const property in properties) {
      this[property] = properties[property];
    }
    if (authenticate) this.authenticate = authenticate;
    if (connect) this.connect = connect;
  }
}
