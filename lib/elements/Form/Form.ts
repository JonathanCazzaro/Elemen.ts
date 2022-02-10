import { FormConstructor } from "../../types/constructors";
import { FormMethodEnum } from "../../types/enum";
import { GenericElement } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Form.
 */
export default class Form extends Common {
  #action?: string;
  #method?: FormMethodEnum;
  #name?: string;
  #noValidation: boolean = false;
  #render: HTMLFormElement;

  /**
   * Initiates a new Form.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [action] - (optional) Target URL where the data should be sent on submit.
   * @param {FormMethodEnum} [method] - (optional) HTTP method used to send the form. Use enum type FormMethodEnum to specify value.
   * @param {string} [name] - (optional) Name of the form (must be unique in the document).
   * @param {boolean} [noValidation] - (optional) If set to true, the data will be not be checked for validation before submitting.
   */
  constructor({ id, classes, exclusionList, action, method, name, noValidation }: FormConstructor) {
    super({ id, classes, exclusionList });
    const { setRender, setAction, setMethod, setName, setNoValidation, build } = this;
    setRender(build("form"));
    if (action) setAction(action);
    if (method) setMethod(method);
    if (name) setName(name);
    setNoValidation(noValidation ? true : false);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLFormElement {
    return this.#render;
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

  setRender(render: HTMLFormElement) {
    this.#render = render;
  }

  setAction(action: string) {
    this.#action = this.#render.action = action;
  }

  setMethod(method: FormMethodEnum) {
    this.#method = this.#render.method = method;
  }

  setName(name: string) {
    this.#name = this.#render.name = name;
  }

  setNoValidation(value: boolean) {
    this.#noValidation = this.#render.noValidate = value;
    const handleSubmit = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.#render.dispatchEvent(new Event("trysubmit"));
      }
    }
    if (!value) {
      this.#render.addEventListener("submit", (e) => e.preventDefault());
      this.#render.addEventListener("keypress", handleSubmit);
    } else {
      this.#render.removeEventListener("submit", (e) => e.preventDefault());
      this.#render.removeEventListener("keypress", handleSubmit);
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
}
