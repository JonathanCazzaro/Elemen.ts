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
  readonly render: HTMLFormElement;

  /**
   * Initiates a new Form.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {string} [action] - (optional) Target URL where the data should be sent on submit.
   * @param {FormMethodEnum} [method] - (optional) HTTP method used to send the form. Use enum type FormMethodEnum to specify value.
   * @param {string} [name] - (optional) Name of the form (must be unique in the document).
   */
  constructor({
    id,
    classes,
    children,
    action,
    method,
    name,
  }: FormConstructor) {
    super({ id, classes, children });
    if (action) this.action = action;
    if (method) this.method = method;
    if (name) this.name = name;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLFormElement {
    const { action, method, name } = this;
    const element = super.build("form") as HTMLFormElement;
    if (action) element.action = action;
    if (method) element.method = method;
    if (name) element.name = name;
    return element;
  }
}
