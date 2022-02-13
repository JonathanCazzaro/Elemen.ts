import { FailMessagesConfig, InputOptionsConfig, OnFocusConfig, ProduceSettingsConfig } from "../../types/configObjects";
import { InputConstructor, InputOptionsConstructor } from "../../types/constructors";
import { InputTypeEnum } from "../../types/enum";
const { SUBMIT, RESET, PASSWORD, TEXT } = InputTypeEnum;
import { FormType, InputType } from "../../types/types";
import Common from "../Common";
import { setInputOptions, setValidationMessages } from "./inputConfigurator";

/**
 * Initiates a new Input.
 */
export default class Input extends Common {
  #id: string;
  #type: InputTypeEnum;
  #value?: string;
  #name?: string;
  #form?: FormType;
  #autofocus: boolean = false;
  #disabled: boolean = false;
  #required: boolean = false;
  #readonly: boolean = false;
  #options?: InputOptionsConfig;
  #validationFailMessages?: FailMessagesConfig;
  static _class = Input;

  /**
   * Initiates a new Input.
   * @param {string} id Required.
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {InputTypeEnum} type - Set the type of input using enum InputTypeEnum.
   * @param {string} [name] - (optional) Name of the input (identification for data submitting).
   * @param {FormType} [form] - (optional) The form element instance related to the input. Required if the input is outside the form element.
   * @param {boolean} [autofocus] - (optional) Boolean to specify whether the input should be set on autofocus or not.
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the input should be set on disabled or not.
   * @param {boolean} [required] - (optional) Boolean to specify whether the input should be set on required or not.
   * @param {boolean} [readonly] - (optional) Boolean to specify whether the input should be set on readonly or not.
   * @param {Object} [options] - (optional) Specific options for the related input type.
   * @param {Object} [validationFailMessages] - (optional) Customizable messages to display when the data validation did not pass.
   */
  constructor({
    id,
    data_id,
    classes,
    children,
    exclusionList,
    type,
    name,
    form,
    autofocus,
    disabled,
    required,
    readonly,
    options,
    validationFailMessages,
  }: InputConstructor) {
    super({ id, data_id, classes, children, exclusionList });
    const element = this.build("input");
    this.setRender(element);
    this.setType(type);
    if (name) this.setName(name);
    if (form) this.setForm(form);
    else if (this.type === SUBMIT || this.type === RESET) {
      throw new Error("The form attribute must be filled in when constructing a submit/reset input.");
    }
    if (autofocus) this.setAutofocus(true);
    if (disabled) this.setDisabled(true);
    if (required) this.setRequired(true);
    if (readonly) this.setReadonly(true);
    if (options) this.setOptions(options);
    if (validationFailMessages) this.setValidationFailMessages(validationFailMessages);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLInputElement {
    return this._render as HTMLInputElement;
  }

  get type(): InputTypeEnum {
    return this.#type;
  }

  get value(): string {
    return this.#value;
  }

  get name(): string {
    return this.#name;
  }

  get form(): FormType {
    return this.#form;
  }

  get autofocus(): boolean {
    return this.#autofocus;
  }

  get disabled(): boolean {
    return this.#disabled;
  }

  get required(): boolean {
    return this.#required;
  }

  get readonly(): boolean {
    return this.#readonly;
  }

  get options(): InputOptionsConfig {
    return this.#options;
  }

  get validationFailMessages(): FailMessagesConfig {
    return this.#validationFailMessages;
  }

  // ***************************
  // Setters
  // ***************************

  setType(type: InputTypeEnum) {
    this.#type = this.render.type = type;
  }

  setValue(value: string) {
    this.#value = this.render.value = value;
  }

  setName(name: string) {
    this.#name = this.render.name = name;
  }

  setForm(form: FormType) {
    this.#form = form;
    if (form.id) this.render.setAttribute("form", form.id);
    else throw new Error("The form you connected to the input must have an id.");
  }

  setAutofocus(value: boolean) {
    this.#autofocus = this.render.autofocus = value;
  }

  setDisabled(value: boolean) {
    this.#disabled = this.render.disabled = value;
  }

  setRequired(value: boolean) {
    if (["color", "hidden", "range", "submit", "reset", "button"].includes(this.type)) {
      console.error(`Input type ${this.type} has no required argument implementation.`);
    } else {
      this.#required = this.render.required = value;
    }
  }

  setReadonly(value: boolean) {
    this.#readonly = this.render.readOnly = value;
  }

  setOptions(options: InputOptionsConstructor) {
    const parsedOptions = Object.entries(options);
    if (parsedOptions.length > 1)
      console.warn("You cannot set multiple configuration objects as input options. By default, only the first object will be kept.");
    this.#options = parsedOptions[0][1];
    this.setRender(setInputOptions(this.render, this.#options));
  }

  setValidationFailMessages(messages: FailMessagesConfig) {
    this.#validationFailMessages = messages;
    this.setRender(setValidationMessages(this.render, messages));
  }

  /**
   * Reveals the content of the input for a given duration (has effect only with password type input). Acts as a toggle if no duration is given.
   * @param {number} [timer] - (optional) The time the input should stay revealed (in milliseconds).
   * @param {function} [callback] - (optional) A callback that would be called when the timer is over.
   */
  reveal(timer?: number, callback?: () => void): void {
    if (this.type === PASSWORD) {
      if (this.render.type === PASSWORD) {
        this.render.type = TEXT;
      } else {
        if (!timer) {
          this.render.type = PASSWORD;
          return;
        }
        return;
      }
      if (timer) {
        setTimeout(() => {
          this.render.type = PASSWORD;
          callback();
        }, timer);
      }
    }
  }

  /** Specifies a behaviour when the element gets or loses focus.
   * @param configuration - Config object to handle focus.
   */
  focus(configuration: OnFocusConfig): void {
    const { onElement, onFocusLoss } = configuration;
    if (onElement) this.render.addEventListener("focus", onElement);
    if (onFocusLoss) this.render.addEventListener("blur", onFocusLoss);
  }

  /**
   * Define any specific actions when a change has been made to the element.
   * @param {function} callback - Behaviour after the element had changed.
   */
  onChange(callback: (event?: Event) => void): void {
    this.render.addEventListener("change", callback);
  }

  mount(): void {
    super.mount();
    if (this.type === InputTypeEnum.SUBMIT) {
      this.render.addEventListener("click", (event) => {
        event.preventDefault();
        this.#form.render.dispatchEvent(new Event(this.form.noValidation ? "submit" : "trysubmit"));
      });
    }
  }

  static produce(settings: ProduceSettingsConfig): InputType[] {
    return super.produce(settings) as InputType[];
  }
}
