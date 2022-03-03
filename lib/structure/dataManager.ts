import { ModifyDataConfig, RequestDataConfig } from "../types/configObjects";
import { DataManagerConstructor } from "../types/constructors";

/**
 * Initiates a new DataManager.
 */
export default class DataManager {
  #isLoading: boolean = false;
  readonly login?: (credentials?: Record<string, string>) => Promise<any> | any;
  readonly verifyToken?: (...args: any) => Promise<any> | any;
  readonly requestData?: (config?: RequestDataConfig, eventName?: string) => Promise<any> | any;
  readonly createRecord?: (config?: ModifyDataConfig, eventName?: string) => Promise<any> | any;
  readonly updateRecord?: (config?: ModifyDataConfig, eventName?: string) => Promise<any> | any;
  readonly deleteRecord?: (config?: ModifyDataConfig, eventName?: string) => Promise<any> | any;
  readonly makeRelation?: (config?: ModifyDataConfig, eventName?: string) => Promise<any> | any;
  readonly removeRelation?: (config?: ModifyDataConfig, eventName?: string) => Promise<any> | any;

  /**
   * Initiates a new DataManager.
   * @param {function} [login] - (optional) Allows to store an async login method. Takes a credentials object as argument.
   * @param {function} [verifyToken] - (optional) Allows to store an async method to check your token for validity.
   * @param {function} [requestData] - (optional) Allows to store an async get data method. Will dispatch a custom "data_isloading" event on document at calling, and a "data_loaded" event after the request has been made. First argument will provide the options of the request, and the second one (optional) lets you specify a custom event to dispatch once the data is loaded.
   * @param {function} [createRecord] - (optional) Allows to store an async create data method. Same process as in the requestData method.
   * @param {function} [updateRecord] - (optional) Allows to store an async update data method. Same process as in the requestData method.
   * @param {function} [deleteRecord] - (optional) Allows to store an async delete data method. Same process as in the requestData method.
   * @param {function} [makeRelation] - (optional) Allows to store an async associate data method. Same process as in the requestData method.
   * @param {function} [removeRelation] - (optional) Allows to store an async dissociate data method. Same process as in the requestData method.
   */
  constructor({ login, verifyToken, requestData, createRecord, updateRecord, deleteRecord, makeRelation, removeRelation }: DataManagerConstructor) {
    if (login) {
      this.login = async (credentials: Record<string, string>) => {
        try {
          this.setLoading(true, "login_attempting");
          const response = await login(credentials);
          this.setLoading(false, "login_attempting_done");
          return response;
        } catch (error) {
          console.error(error);
        }
      };
    }
    if (verifyToken) {
      this.verifyToken = async () => {
        try {
          this.setLoading(true, "token_checking");
          const response = await verifyToken();
          this.setLoading(false, "token_checking_done");
          return response;
        } catch (error) {
          console.error(error);
        }
      };
    }
    if (requestData) {
      this.requestData = async (config: RequestDataConfig, eventName?: string) => {
        try {
          this.setLoading(true, "data_loading");
          const response = await requestData(config);
          this.setLoading(false, "data_loading_done");
          if (eventName) this.setLoading(false, eventName);
          return response;
        } catch (error) {
          console.error(error);
        }
      };
    }
    if (createRecord) {
      this.createRecord = async (config: ModifyDataConfig, eventName?: string) => {
        try {
          this.setLoading(true, "data_creating");
          const response = await createRecord(config);
          this.setLoading(false, "data_creating_done");
          if (eventName) this.setLoading(false, eventName);
          return response;
        } catch (error) {
          console.error(error);
        }
      };
    }
    if (updateRecord) {
      this.updateRecord = async (config: ModifyDataConfig, eventName?: string) => {
        try {
          this.setLoading(true, "data_updating");
          const response = await updateRecord(config);
          this.setLoading(false, "data_updating_done");
          if (eventName) this.setLoading(false, eventName);
          return response;
        } catch (error) {
          console.error(error);
        }
      };
    }
    if (updateRecord) {
      this.updateRecord = async (config: ModifyDataConfig, eventName?: string) => {
        try {
          this.setLoading(true, "data_updating");
          const response = await updateRecord(config);
          this.setLoading(false, "data_updated");
          if (eventName) this.setLoading(false, eventName);
          return response;
        } catch (error) {
          console.error(error);
        }
      };
    }
    if (deleteRecord) {
      this.deleteRecord = async (config: ModifyDataConfig, eventName?: string) => {
        try {
          this.setLoading(true, "data_deleting");
          const response = await deleteRecord(config);
          this.setLoading(false, "data_deleting_done");
          if (eventName) this.setLoading(false, eventName);
          return response;
        } catch (error) {
          console.error(error);
        }
      };
    }
    if (makeRelation) {
      this.makeRelation = async (config: ModifyDataConfig, eventName?: string) => {
        try {
          this.setLoading(true, "data_makingrelation");
          const response = await makeRelation(config);
          this.setLoading(false, "data_makingrelation_done");
          if (eventName) this.setLoading(false, eventName);
          return response;
        } catch (error) {
          console.error(error);
        }
      };
    }
    if (removeRelation) {
      this.removeRelation = async (config: ModifyDataConfig, eventName?: string) => {
        try {
          this.setLoading(true, "data_removingrelation");
          const response = await removeRelation(config);
          this.setLoading(false, "data_removingrelation_done");
          if (eventName) this.setLoading(false, eventName);
          return response;
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
