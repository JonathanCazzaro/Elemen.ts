import { FailMessagesConfig } from "../../types/configObjects";
import { TextAreaConstructor } from "../../types/constructors";
import { FormType } from "../../types/types";
import Common from "../Common";
import { setValidationMessages } from "./inputConfigurator";

/**
 * Initiates a new Text Area (textarea).
 */
export default class Text_Area extends Common {
  #id: string;
  #value?: string;
  #name?: string;
  #form?: FormType;
  #width?: number;
  #height?: number;
  #placeholder?: string;
  #minLength?: number;
  #maxLength?: number;
  #autofocus: boolean = false;
  #disabled: boolean = false;
  #required: boolean = false;
  #readonly: boolean = false;
  #spellcheck: boolean = false;
  #validationFailMessages?: FailMessagesConfig;

  /**
   * Initiates a new Text Area (textarea).
   * @param {string} id Required.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [name] - (optional) Name of the text area (identification for data submitting).
   * @param {string} [value] - (optional) Value of the field.
   * @param {FormType} [form] - (optional) The form element instance related to the text area. Required if the element is outside the form.
   * @param {number} [minLength] - (optional) The minimum number of characters the user should enter.
   * @param {number} [maxLength] - (optional) The maximum number of characters the user should enter.
   * @param {number} [width] - (optional) The width of the text area, in average character width. Default is 20.
   * @param {number} [height] - (optional) The height of the text area. Each unit equals to a line of text. Default is 2.
   * @param {string} [placeholder] - (optional) Default text to be displayed before the user start typing.
   * @param {boolean} [autofocus] - (optional) Boolean to specify whether the text area should be set on autofocus or not.
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the text area should be set on disabled or not.
   * @param {boolean} [required] - (optional) Boolean to specify whether the text area should be set on required or not.
   * @param {boolean} [readonly] - (optional) Boolean to specify whether the text area should be set on readonly or not.
   * @param {boolean} [spellcheck] - (optional) Boolean to specify whether the text area should be spell checked or not.
   * @param {Object} [validationFailMessages] - (optional) Customizable messages to display when the data validation did not pass.
   */
  constructor({
    id,
    classes,
    exclusionList,
    name,
    value,
    form,
    autofocus,
    disabled,
    required,
    readonly,
    spellcheck,
    placeholder,
    minLength,
    maxLength,
    width,
    height,
    validationFailMessages,
  }: TextAreaConstructor) {
    super({ id, classes, exclusionList });
    const element = this.build("textarea");
    this.setRender(element);
    if (name) this.setName(name);
    if (value) this.setValue(value);
    if (form) this.setForm(form);
    if (autofocus) this.setAutofocus(true);
    if (disabled) this.setDisabled(true);
    if (required) this.setRequired(true);
    if (readonly) this.setReadonly(true);
    if (spellcheck) this.setSpellcheck(true);
    if (placeholder) this.setPlaceholder(placeholder);
    if (minLength) this.setMinLength(minLength);
    if (maxLength) this.setMaxLength(maxLength);
    if (width) this.setWidth(width);
    if (height) this.setHeight(height);
    if (validationFailMessages) this.setValidationFailMessages(validationFailMessages);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLTextAreaElement {
    return this._render as HTMLTextAreaElement;
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

  get width(): number {
    return this.#width;
  }

  get height(): number {
    return this.#height;
  }

  get placeholder(): string {
    return this.#placeholder;
  }

  get minLength(): number {
    return this.#minLength;
  }

  get maxLength(): number {
    return this.#maxLength;
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

  get spellcheck(): boolean {
    return this.#spellcheck;
  }

  get validationFailMessages(): FailMessagesConfig {
    return this.#validationFailMessages;
  }

  // ***************************
  // Setters
  // ***************************

  setValue(value: string) {
    this.#value = this.render.value = value;
  }

  setName(name: string) {
    this.#name = this.render.name = name;
  }

  setForm(form: FormType) {
    this.#form = form;
    if (form.id) this.render.setAttribute("form", form.id);
    else throw new Error("The form you connected to the text area must have an id.");
  }

  setWidth(width: number) {
    this.#width = this.render.cols = width;
  }

  setHeight(height: number) {
    this.#height = this.render.rows = height;
  }

  setPlaceholder(placeholder: string) {
    this.#placeholder = this.render.placeholder = placeholder;
  }

  setMinLength(minLength: number) {
    this.#minLength = this.render.minLength = minLength;
  }

  setMaxLength(maxLength: number) {
    this.#maxLength = this.render.maxLength = maxLength;
  }

  setAutofocus(value: boolean) {
    this.#autofocus = this.render.autofocus = value;
  }

  setDisabled(value: boolean) {
    this.#disabled = this.render.disabled = value;
  }

  setRequired(value: boolean) {
    this.#required = this.render.required = value;
  }

  setReadonly(value: boolean) {
    this.#readonly = this.render.readOnly = value;
  }

  setSpellcheck(value: boolean) {
    this.#spellcheck = this.render.spellcheck = value;
  }

  setValidationFailMessages(messages: FailMessagesConfig) {
    this.#validationFailMessages = messages;
    this.setRender(setValidationMessages(this.render, messages));
  }

  /**
   * Define any specific actions when a change has been made to the element.
   * @param {function} callback - Behaviour after the element had changed.
   */
  onChange(callback: (event?: Event) => void): void {
    this.render.addEventListener("change", callback);
  }
}
