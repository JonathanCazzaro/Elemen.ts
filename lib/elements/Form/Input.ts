import { InputOptionsConfig } from "../../types/configObjects";
import { InputConstructor } from "../../types/constructors";
import { InputTypeEnum, LabelPositionEnum } from "../../types/enum";
import { LabelType } from "../../types/types";
import Str from "../../utils/str";
import Common from "../Common";

/**
 * Initiates a new Input.
 */
export default class Input extends Common {
  id: string;
  type: InputTypeEnum;
  label?: LabelType;
  value?: string;
  name?: string;
  autofocus?: boolean = false;
  disabled?: boolean = false;
  required?: boolean = false;
  readonly?: boolean = false;
  options?: InputOptionsConfig;
  readonly render: HTMLInputElement;

  /**
   * Initiates a new Input.
   * @param {string} id Required.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {InputTypeEnum} type - Set the type of input using enum InputTypeEnum.
   * @param {LabelType} [label] - (optional) An instance of Label element to identify the input.
   * @param {string} [name] - (optional) Name of the input (identification for data submitting).
   * @param {boolean} [autofocus] - (optional) Boolean to specify whether the input should be set on autofocus or not.
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the input should be set on disabled or not.
   * @param {boolean} [required] - (optional) Boolean to specify whether the input should be set on required or not.
   * @param {boolean} [readonly] - (optional) Boolean to specify whether the input should be set on readonly or not.
   * @param {Object} [options] - (optional) Specific options for the related input type.
   */
  constructor({
    id,
    classes,
    children,
    type,
    name,
    autofocus,
    disabled,
    required,
    readonly,
    label,
    options,
  }: InputConstructor) {
    super({ classes, children });
    this.id = id;
    this.type = type;
    if (name) this.name = name;
    if (autofocus) this.autofocus = true;
    if (disabled) this.disabled = true;
    if (required) this.required = true;
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
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLInputElement {
    const {
      name,
      value,
      label,
      autofocus,
      disabled,
      required,
      readonly,
      type,
      options,
    } = this;
    const element = super.build("input") as HTMLInputElement;
    element.type = type;
    if (name) element.name = name;
    if (value) element.value = value;
    if (autofocus) element.autofocus = true;
    if (disabled) element.disabled = true;
    if (required) element.required = true;
    if (readonly) element.readOnly = true;

    if (options) {
      switch (this.type) {
        case "checkbox":
          if (options.checked) element.checked = true;
          break;
        case "date":
          const { min, max, incrementStep } = options;
          if (min) {
            if (Str.checkDate(min)) element.min = min;
            else
              throw new Error(
                "The minimum date is not matching the yyyy-MM-dd format."
              );
          }
          if (max) {
            if (Str.checkDate(max)) element.min = max;
            else
              throw new Error(
                "The maximum date is not matching the yyyy-MM-dd format."
              );
          }
          if (incrementStep) element.step = incrementStep.toString();
          break;
        case "datetime-local":
          if (min) {
            if (Str.checkDateTime(min)) element.min = min;
            else
              throw new Error(
                "The minimum date is not matching the yyyy-MM-ddThh:mm format."
              );
          }
          if (max) {
            if (Str.checkDateTime(max)) element.min = max;
            else
              throw new Error(
                "The maximum date is not matching the yyyy-MM-ddThh:mm format."
              );
          }
          if (incrementStep) element.step = incrementStep.toString();
          break;
        case "email":
          const { minLength, maxLength, pattern } = options;
          if (options.minLength) element.minLength = minLength;
          if (options.maxLength) element.maxLength = maxLength;
          if (pattern) {
            const { template, help, customFailMessage } = pattern;
            element.pattern = template;
            if (help) element.title = help;
            if (customFailMessage) {

              element.addEventListener("invalid", (e) => {
                // console.log(element.value);
                e.preventDefault();
                // console.log(element.willValidate, element.checkValidity());
                
                // if (!element.checkValidity()) element.setCustomValidity(customFailMessage);
                // else element.setCustomValidity("");
                console.log("invalide !");                
                console.log(element.willValidate);
                
              });
            };

          }
          break;
      }
    }
    return element;
  }

  mount(): void {
    super.mount();
    const { label } = this;
    if (label) {
      label.inputId = this.id;
      const labelRender = label.build();
      if (label.position === LabelPositionEnum.BOTTOM)
        this.render.after(labelRender);
      else if (label.position === LabelPositionEnum.TOP)
        this.render.before(labelRender);
    }
  }
}
