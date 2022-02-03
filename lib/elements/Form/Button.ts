import { ButtonConstructor } from "../../types/constructors";
import { ButtonTypeEnum } from "../../types/enum";
import { FormType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Button.
 */
export default class Button extends Common {
  type: ButtonTypeEnum;
  form?: FormType;
  textContent?: string;
  name?: string;
  value?: string;
  disabled: boolean = false;
  readonly render: HTMLButtonElement;

  /**
   * Initiates a new Button.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {ButtonTypeEnum} type - Role of the button, use enum type ButtonTypeEnum to define it.
   * @param {FormType} [form] - (optional) The form element instance related to the button, required with a submit or reset type button.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {string} [name] - (optional) Name indicator sent with the form as part of the data. Works as a couple with the value attribute.
   * @param {string} [value] - (optional) Additional data sent with the form. Useless if name not defined.
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the button should be disabled or not.
   */
  constructor({
    id,
    classes,
    textContent,
    type,
    form,
    children,
    name,
    value,
    disabled,
  }: ButtonConstructor) {
    super({ id, classes, children });
    if (textContent) this.textContent = textContent;
    this.type = type;
    if (form) this.form = form;
    else if (
      this.type === ButtonTypeEnum.SUBMIT ||
      this.type === ButtonTypeEnum.RESET
    ) {
      throw new Error(
        "The form attribute must be filled in when constructing a submit/reset button."
      );
    }
    if (name) {
      this.name = name;
      if (value) this.value = value;
    } else if (value)
      console.error(
        "Button name attribute is missing but is required to use the value attribute."
      );
    if (disabled) this.disabled = true;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLButtonElement {
    const { textContent, type, form, name, value, disabled } = this;
    const element = super.build("button") as HTMLButtonElement;
    element.type = type;
    if (form) {
      if (form.id) element.setAttribute("form", form.id);
      else
        console.error("The form you connected to the button must have an id.");
    }
    if (name) {
      element.name = name;
      if (value) element.value = value;
    }
    if (disabled) element.disabled = true;
    if (textContent) element.textContent = textContent;
    return element;
  }

  mount(): void {
    super.mount();
    if (this.type === ButtonTypeEnum.SUBMIT) {
      this.render.addEventListener("click", (event) => {
        event.preventDefault();
        this.form.render.dispatchEvent(
          new Event(this.form.noValidation ? "submit" : "trysubmit")
        );
      });
    }
  }
}
