import { ProduceSettingsConfig } from "../../types/configObjects";
import { FormConstructor } from "../../types/constructors";
import { FormMethodEnum } from "../../types/enum";
import { FormType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Form.
 */
export default class Form extends Common {
  #action?: string;
  #method?: FormMethodEnum;
  #name?: string;
  #noValidation: boolean = false;
  static _class = Form;


  /**
   * Initiates a new Form.
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [action] - (optional) Target URL where the data should be sent on submit.
   * @param {FormMethodEnum} [method] - (optional) HTTP method used to send the form. Use enum type FormMethodEnum to specify value.
   * @param {string} [name] - (optional) Name of the form (must be unique in the document).
   * @param {boolean} [noValidation] - (optional) If set to true, the data will be not be checked for validation before submitting.
   */
  constructor({ id, data_id, classes, exclusionList, action, method, name, noValidation, displayMode }: FormConstructor) {
    super({ id, data_id, classes, exclusionList, displayMode });
    const element = this.build("form");
    this.setRender(element);  
    if (action) this.setAction(action);
    if (method) this.setMethod(method);
    if (name) this.setName(name);
    this.setNoValidation(noValidation ? true : false);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLFormElement {
    return this._render as HTMLFormElement;
  }

  get action(): string {
    return this.#action;
  }

  get method(): FormMethodEnum {
    return this.#method;
  }

  get name(): string {
    return this.#name;
  }

  get noValidation(): boolean {
    return this.#noValidation;
  }

  // ***************************
  // Setters
  // ***************************

  setAction(action: string) {
    this.#action = this.render.action = action;
  }

  setMethod(method: FormMethodEnum) {
    this.#method = this.render.method = method;
  }

  setName(name: string) {
    this.#name = this.render.name = name;
  }

  setNoValidation(value: boolean) {
    this.#noValidation = this.render.noValidate = value;
    const handleSubmit = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.render.dispatchEvent(new Event("trysubmit"));
      }
    };
    if (!value) {
      this.render.addEventListener("submit", (e) => e.preventDefault());
      this.render.addEventListener("keypress", handleSubmit);
    } else {
      this.render.removeEventListener("submit", (e) => e.preventDefault());
      this.render.removeEventListener("keypress", handleSubmit);
    }
  }

  onSubmit(callback: (event: Event) => void): void {
    this.render.addEventListener(this.noValidation ? "submit" : "trysubmit", (event) => {
      if (!this.noValidation) {
        const inputs = this.render.getElementsByTagName("input");
        for (const input of inputs) {
          input.setCustomValidity("");
          const isValid = input.reportValidity();
          if (!isValid) {
            return;
          }
        }
      }
      callback(event);
    });
  }

  static produce(settings: ProduceSettingsConfig): FormType[] {
    return super.produce(settings) as FormType[];
  }
}
