import { ProduceSettingsConfig } from "../../types/configObjects";
import { ButtonConstructor } from "../../types/constructors";
import { ButtonTypeEnum } from "../../types/enum";
import { ButtonType, FormType } from "../../types/types";
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
  static _class = Button;

  /**
   * Initiates a new Button.
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
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
    data_id,
    classes,
    exclusionList,
    textContent,
    type,
    form,
    children,
    name,
    value,
    disabled,
    displayMode,
    onClick,
    onClickOutside,
  }: ButtonConstructor) {
    super({ id, data_id, classes, children, exclusionList, textContent, displayMode, onClick, onClickOutside });
    const element = this.build("button");
    this.setRender(element);
    this.setType(type);
    if (form) this.setForm(form);
    else if (this.type === ButtonTypeEnum.SUBMIT || this.type === ButtonTypeEnum.RESET) {
      throw new Error("The form attribute must be filled in when constructing a submit/reset button.");
    }
    if (name) {
      this.setName(name);
      if (value) this.setValue(value);
    } else if (value) console.error("Button name attribute is missing but required to use the value attribute.");
    if (disabled) this.setDisabled(true);
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
    return this._render as HTMLButtonElement;
  }

  // ***************************
  // Setters
  // ***************************

  setType(type: ButtonTypeEnum) {
    this.#type = this.render.type = type;
  }

  setForm(form: FormType) {
    this.#form = form;
    if (form.id) this.render.setAttribute("form", form.id);
    else throw new Error("The form you connected to the button must have an id.");
  }

  setTextContent(textContent: string) {
    this.#textContent = this.render.textContent = textContent;
  }

  setName(name: string) {
    this.#name = this.render.name = name;
  }

  setValue(value: string) {
    this.#value = this.render.value = value;
  }

  setDisabled(value: boolean) {
    this.#disabled = this.render.disabled = value;
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

  static produce(settings: ProduceSettingsConfig): ButtonType[] {
    return super.produce(settings) as ButtonType[];
  }
}
