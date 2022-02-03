import {
  FailMessagesConfig,
  InputOptionsConfig,
} from "../../types/configObjects";
import { InputConstructor } from "../../types/constructors";
import { InputTypeEnum, ElementPositionEnum } from "../../types/enum";
const { SUBMIT, RESET, PASSWORD, TEXT } = InputTypeEnum;
import { FormType, LabelType } from "../../types/types";
import Common from "../Common";
import { setInputOptions, setValidationMessages } from "./inputConfigurator";

/**
 * Initiates a new Input.
 */
export default class Input extends Common {
  id: string;
  type: InputTypeEnum;
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
    options,
    validationFailMessages,
  }: InputConstructor) {
    super({ classes, children });
    this.id = id;
    this.type = type;
    if (name) this.name = name;
    if (form) this.form = form;
    else if (this.type === SUBMIT || this.type === RESET) {
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

  /**
   * Define any specific actions when the input gets or loses focus.
   * @param {function} callback - Behaviour when the input gets focus.
   * @param {function} [blurCallback] - (optional) Behaviour when the input loses focus.
   */
  onFocus(callback: () => void, blurCallback?: () => void): void {
    this.render.onfocus = callback;
    if (blurCallback) {
      this.render.onblur = blurCallback;
    }
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
