import {
  FailMessagesConfig,
  InputOptionsConfig,
} from "../../types/configObjects";
import { InputConstructor } from "../../types/constructors";
import { InputTypeEnum, ElementPositionEnum } from "../../types/enum";
import { FormType, LabelType } from "../../types/types";
import Common from "../Common";
import { setInputOptions, setValidationMessages } from "./inputConfigurator";

/**
 * Initiates a new Input.
 */
export default class Input extends Common {
  id: string;
  type: InputTypeEnum;
  label?: LabelType;
  value?: string;
  name?: string;
  form?: FormType;
  autofocus: boolean = false;
  disabled: boolean = false;
  required: boolean = false;
  readonly: boolean = false;
  options?: InputOptionsConfig;
  validationFailMessages?: FailMessagesConfig;
  readonly render: HTMLInputElement;

  /**
   * Initiates a new Input.
   * @param {string} id Required.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {InputTypeEnum} type - Set the type of input using enum InputTypeEnum.
   * @param {LabelType} [label] - (optional) An instance of Label element to identify the input.
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
    classes,
    children,
    type,
    name,
    form,
    autofocus,
    disabled,
    required,
    readonly,
    label,
    options,
    validationFailMessages,
  }: InputConstructor) {
    super({ classes, children });
    this.id = id;
    this.type = type;
    if (name) this.name = name;
    if (form) this.form = form;
    else if (
      this.type === InputTypeEnum.SUBMIT ||
      this.type === InputTypeEnum.RESET
    ) {
      throw new Error(
        "The form attribute must be filled in when constructing a submit/reset input."
      );
    }
    if (autofocus) this.autofocus = true;
    if (disabled) this.disabled = true;
    if (required) {
      if (
        ["color", "hidden", "range", "submit", "reset", "button"].includes(
          this.type
        )
      ) {
        console.error(
          `Input type ${this.type} has no required argument implementation.`
        );
      } else this.required = true;
    }
    if (readonly) this.readonly = true;
    if (label) this.label = label;
    if (options) {
      const parsedOptions = Object.entries(options);
      if (parsedOptions.length > 1)
        console.warn(
          "You cannot set multiple configuration objects as input options. By default, only the first object will be kept."
        );
      this.options = parsedOptions[0][1];
    }
    if (validationFailMessages)
      this.validationFailMessages = validationFailMessages;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLInputElement {
    const {
      name,
      form,
      value,
      autofocus,
      disabled,
      required,
      readonly,
      type,
      options,
      validationFailMessages,
    } = this;
    let element = super.build("input") as HTMLInputElement;
    element.type = type;
    if (name) element.name = name;
    if (form) {
      if (form.id) element.setAttribute("form", form.id);
      else
        console.error("The form you connected to the input must have an id.");
    }
    if (value) element.value = value;
    if (autofocus) element.autofocus = true;
    if (disabled) element.disabled = true;
    if (required) element.required = true;
    if (readonly) element.readOnly = true;

    if (options) element = setInputOptions(element, options);
    if (validationFailMessages)
      element = setValidationMessages(element, validationFailMessages);

    return element;
  }

  mount(): void {
    super.mount();
    const { label } = this;
    if (label) {
      label.formElementId = this.id;
      const labelRender = label.build();
      if (label.position === ElementPositionEnum.BOTTOM)
        this.render.after(labelRender);
      else if (label.position === ElementPositionEnum.TOP)
        this.render.before(labelRender);
    }
    if (this.type === InputTypeEnum.SUBMIT) {
      this.render.addEventListener("click", (event) => {
        event.preventDefault();
        this.form.render.dispatchEvent(
          new Event(this.form.noValidation ? "submit" : "trysubmit")
        );
      });
    }
  }
}
