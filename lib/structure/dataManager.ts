import { RequestDataConfig } from "../types/configObjects";
import { DataManagerConstructor } from "../types/constructors";

/**
 * Initiates a new DataManager.
 */
export default class DataManager {
  #isLoading: boolean = false;
  readonly login?: (credentials?: Record<string, string>) => Promise<void> | void;
  readonly verifyToken?: (...args: any) => Promise<void> | void;
  readonly requestData?: (config?: RequestDataConfig, eventName?: string) => Promise<void> | void;

  /**
   * Initiates a new DataManager.
   * @param {function} [login] - (optional) Allows to store an async login method. Takes a credentials object as argument.
   * @param {function} [verifyToken] - (optional) Allows to store an async method to check your token for validity.
   * @param {function} [requestData] - (optional) Allows to store an async get data method. Will dispatch a custom "data_isloading" event on document at calling, and a "data_loaded" event after the request has been made. First argument will provide the options of the request, and the second one (optional) lets you specify a custom event to dispatch once the data is loaded.
   */
  constructor({ login, verifyToken, requestData }: DataManagerConstructor) {
    if (login) {
      this.login = async (credentials: Record<string, string>) => {
        try {
          await login(credentials);
        } catch (error) {
          console.error(error);
        }
      };
    }
    if (verifyToken) {
      this.verifyToken = async () => {
        try {
          await verifyToken();
        } catch (error) {
          console.error(error);
        }
      };
    }
    if (requestData) {
      this.requestData = async (config: RequestDataConfig, eventName?: string) => {
        try {
          this.setLoading(true, "data_isloading");
          await requestData(config);
          this.setLoading(false, "data_loaded");
          if (eventName) this.setLoading(false, eventName);
        } catch (error) {
          console.error(error);
        }
      };
    }
  }

  /**
   * Checks if the dataManager is waiting for a response after a call.
   * @returns {boolean}
   */
  get isLoading(): boolean {
    return this.#isLoading;
  }

  /**
   * Sets the dataManager on loading mode.
   * @param {boolean} value - True or false.
   * @param {string} [eventName] - (optional) Dispatches a custom event on document.
   */
  setLoading(value: boolean, eventName?: string): void {
    this.#isLoading = value;
    if (eventName) document.dispatchEvent(new Event(eventName));
  }
}
