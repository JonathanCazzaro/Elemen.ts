import { UserConstructor } from "../types/constructors";
import { UserType } from "../types/types";

export default class User {
  isLogged: boolean = false;
  token?: string;
  authenticate: (this: UserType) => boolean;

  constructor({ properties, authenticate }: UserConstructor) {
    for (const property in properties) {
      this[property] = properties;
    }
    this.authenticate = authenticate;
  }
  
  setProperties(properties: UserConstructor): void {
    for (const property in properties) {
      this[property] = properties;
    }
  }
}