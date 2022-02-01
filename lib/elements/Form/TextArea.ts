import { FailMessagesConfig } from "../../types/configObjects";
import { TextAreaConstructor } from "../../types/constructors";
import { LabelPositionEnum } from "../../types/enum";
import { FormType, LabelType } from "../../types/types";
import Common from "../Common";
import { setValidationMessages } from "./inputConfigurator";

/**
 * Initiates a new Text Area (textarea).
 */
export default class Text_Area extends Common {
  id: string;
  label?: LabelType;
  value?: string;
  name?: string;
  form?: FormType;
  width?: number;
  height?: number;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  autofocus: boolean = false;
  disabled: boolean = false;
  required: boolean = false;
  readonly: boolean = false;
  spellcheck: boolean = false;
  validationFailMessages?: FailMessagesConfig;
  readonly render: HTMLTextAreaElement;

  /**
   * Initiates a new Text Area (textarea).
   * @param {string} id Required.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {LabelType} [label] - (optional) An instance of Label element to identify the input.
   * @param {string} [name] - (optional) Name of the text area (identification for data submitting).
   * @param {string} [value] = (optional) Value of the field.
   * @param {FormType} [form] - (optional) The form element instance related to the text area. Required if the element is outside the form.
   * @param {number} [minLength] - (optional) The minimum number of characters the user should enter.
   * @param {number} [maxLength] - (optional) The maximum number of characters the user should enter.
   * @param {number} [width] - (optional) The width of the text area, in average character width. Default is 20.
   * @param {number} [height] - (optional) The height of the text area. Each unit equals to a line of text. Default is 2.
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
    name,
    value,
    form,
    autofocus,
    disabled,
    required,
    readonly,
    spellcheck,
    label,
    placeholder,
    minLength,
    maxLength,
    width,
    height,
    validationFailMessages,
  }: TextAreaConstructor) {
    super({ classes });
    this.id = id;
    if (name) this.name = name;
    if (value) this.value = value;
    if (form) this.form = form;
    if (autofocus) this.autofocus = true;
    if (disabled) this.disabled = true;
    if (required) this.required = true;
    if (readonly) this.readonly = true;
    if (spellcheck) this.spellcheck = true;
    if (label) this.label = label;
    if (placeholder) this.placeholder = placeholder;
    if (minLength) this.minLength = minLength;
    if (maxLength) this.maxLength = maxLength;
    if (width) this.width = width;
    if (height) this.height = height;
    if (validationFailMessages)
      this.validationFailMessages = validationFailMessages;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLTextAreaElement {
    const {
      name,
      form,
      value,
      autofocus,
      disabled,
      required,
      readonly,
      spellcheck,
      validationFailMessages,
      maxLength,
      minLength,
      placeholder,
      width,
      height,
    } = this;
    let element = super.build("textarea") as HTMLTextAreaElement;
    if (name) element.name = name;
    if (value) element.value = value;
    if (form) {
      if (form.id) element.setAttribute("form", form.id);
      else
        console.error(
          "The form you connected to the text area must have an id."
        );
    }
    if (placeholder) element.placeholder = placeholder;
    if (minLength) element.minLength = minLength;
    if (maxLength) element.minLength = maxLength;
    if (width) element.cols = width;
    if (height) element.rows = height;
    if (autofocus) element.autofocus = true;
    if (disabled) element.disabled = true;
    if (required) element.required = true;
    if (readonly) element.readOnly = true;
    if (spellcheck) element.spellcheck = true;

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
      if (label.position === LabelPositionEnum.BOTTOM)
        this.render.after(labelRender);
      else if (label.position === LabelPositionEnum.TOP)
        this.render.before(labelRender);
    }
  }
}
