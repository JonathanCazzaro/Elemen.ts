import { FormConstructor } from "../../types/constructors";
import { FormMethodEnum } from "../../types/enum";
import Common from "../Common";

/**
 * Initiates a new Form.
 */
export default class Form extends Common {
  action?: string;
  method?: FormMethodEnum;
  name?: string;
  noValidation: boolean = false;
  readonly render: HTMLFormElement;

  /**
   * Initiates a new Form.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {string} [action] - (optional) Target URL where the data should be sent on submit.
   * @param {FormMethodEnum} [method] - (optional) HTTP method used to send the form. Use enum type FormMethodEnum to specify value.
   * @param {string} [name] - (optional) Name of the form (must be unique in the document).
   * @param {boolean} [noValidation] - (optional) If set to true, the data will be not be checked for validation before submitting.
   */
  constructor({
    id,
    classes,
    children,
    action,
    method,
    name,
    noValidation,
  }: FormConstructor) {
    super({ id, classes, children });
    if (action) this.action = action;
    if (method) this.method = method;
    if (name) this.name = name;
    if (noValidation) this.noValidation = true;
    this.render = this.build();
  }

  onSubmit(callback: (event: Event) => void): void {
    this.render.addEventListener(
      this.noValidation ? "submit" : "trysubmit",
      (event) => {
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
      }
    );
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLFormElement {
    const { action, method, name, noValidation } = this;
    const element = super.build("form") as HTMLFormElement;
    if (action) element.action = action;
    if (method) element.method = method;
    if (name) element.name = name;
    if (noValidation) element.noValidate = true;
    else {
      element.addEventListener("submit", (e) => e.preventDefault());
      element.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          element.dispatchEvent(new Event("trysubmit"));
        }
      });
    }
    return element;
  }
}
