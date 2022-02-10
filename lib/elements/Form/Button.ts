import { ButtonConstructor } from "../../types/constructors";
import { ButtonTypeEnum } from "../../types/enum";
import { FormType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Button.
 */
export default class Button extends Common {
  #type: ButtonTypeEnum;
  #form?: FormType;
  #textContent?: string;
  #name?: string;
  #value?: string;
  #disabled: boolean = false;
  #render: HTMLButtonElement;

  /**
   * Initiates a new Button.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {ButtonTypeEnum} type - Role of the button, use enum type ButtonTypeEnum to define it.
   * @param {FormType} [form] - (optional) The form element instance related to the button, required with a submit or reset type button.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {string} [name] - (optional) Name indicator sent with the form as part of the data. Works as a couple with the value attribute.
   * @param {string} [value] - (optional) Additional data sent with the form. Useless if name not defined.
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the button should be disabled or not.
   */
  constructor({ id, classes, exclusionList, textContent, type, form, children, name, value, disabled }: ButtonConstructor) {
    super({ id, classes, children, exclusionList });
    const { setRender, setType, setForm, setName, setValue, setTextContent, setDisabled } = this;
    setRender(this.build("button"));
    setType(type);
    if (form) setForm(form);
    else if (this.type === ButtonTypeEnum.SUBMIT || this.type === ButtonTypeEnum.RESET) {
      throw new Error("The form attribute must be filled in when constructing a submit/reset button.");
    }
    if (name) {
      setName(name);
      if (value) setValue(value);
    } else if (value) console.error("Button name attribute is missing but required to use the value attribute.");
    if (disabled) setDisabled(true);
    if (textContent) setTextContent(textContent);
  }

  // ***************************
  // Getters
  // ***************************

  get type(): ButtonTypeEnum {
    return this.#type;
  }

  get form(): FormType {
    return this.#form;
  }

  get textContent(): string {
    return this.#textContent;
  }

  get name(): string {
    return this.#name;
  }

  get value(): string {
    return this.#value;
  }

  get disabled(): boolean {
    return this.#disabled;
  }

  get render(): HTMLButtonElement {
    return this.#render;
  }

  // ***************************
  // Setters
  // ***************************

  setType(type: ButtonTypeEnum) {
    this.#type = this.#render.type = type;
  }

  setForm(form: FormType) {
    this.#form = form;
    if (form.id) this.#render.setAttribute("form", form.id);
    else throw new Error("The form you connected to the button must have an id.");
  }

  setTextContent(textContent: string) {
    this.#textContent = this.#render.textContent = textContent;
  }

  setName(name: string) {
    this.#name = this.#render.name = name;
  }

  setValue(value: string) {
    this.#value = this.#render.value = value;
  }

  setDisabled(value: boolean) {
    this.#disabled = this.#render.disabled = value;
  }

  setRender(render: HTMLButtonElement) {
    this.#render = render;
  }

  mount(): void {
    super.mount();
    if (this.type === ButtonTypeEnum.SUBMIT) {
      this.render.addEventListener("click", (event) => {
        event.preventDefault();
        this.form.render.dispatchEvent(new Event(this.form.noValidation ? "submit" : "trysubmit"));
      });
    }
  }
}
