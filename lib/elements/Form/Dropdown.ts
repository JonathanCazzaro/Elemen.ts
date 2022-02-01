import { DropdownConstructor } from "../../types/constructors";
import { LabelPositionEnum } from "../../types/enum";
import { FormType, LabelType, OptionsGroupType, OptionType } from "../../types/types";
import Str from "../../utils/str";
import Common from "../Common";

/**
 * Initiates a new Dropdown (select).
 */
export default class Dropdown extends Common {
  children?: OptionsGroupType[] | OptionType[];
  id: string;
  form?: FormType;
  name?: string;
  label?: LabelType;
  autofocus: boolean = false;
  disabled: boolean = false;
  required: boolean = false;
  multiple: boolean = false;
  readonly render: HTMLSelectElement;

  /**
   * Initiates a new Dropdown (select).
   * @param {string} id Required.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any (Options Group or Option elements).
   * @param {FormType} [form] - (optional) The form element instance related to the dropdown, required if placed outside.
   * @param {LabelType} [label] - (optional) An instance of Label element to identify the dropdown.
   * @param {string} [name] - (optional) Name indicator sent with the form as part of the data. Works as a couple with the value attribute.
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the dropdown should be disabled or not.
   * @param {boolean} [autofocus] - (optional) Boolean to specify whether the dropdown should be set on autofocus or not.
   * @param {boolean} [required] - (optional) Boolean to specify whether the dropdown should be set on required or not.
   * @param {boolean} [multiple] - (optional) Boolean to specify whether the dropdown should be set on multiple or not.
   */
  constructor({
    id,
    classes,
    form,
    children,
    name,
    label,
    disabled,
    autofocus,
    required,
    multiple,
  }: DropdownConstructor) {
    super({ classes });
    this.id = id;
    if (children) {
      this.children = [];
      const authorizedContent = ["OPTION", "OPTGROUP"];
      children.forEach((child) => {
        if (Str.matchValue(child.render.tagName, authorizedContent))
          this.children.push(child);
        else
          throw new Error(
            "Dropdown can only take Option and Options_Group elements as children."
          );
      });
    }
    if (form) this.form = form;
    if (name) this.name = name;
    if (label) this.label = label;
    if (disabled) this.disabled = true;
    if (autofocus) this.autofocus = autofocus;
    if (required) this.required = required;
    if (multiple) this.multiple = multiple;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLSelectElement {
    const { form, name, label, disabled, autofocus, required, multiple } = this;
    const element = super.build("select") as HTMLSelectElement;
    if (form) {
      if (form.id) element.setAttribute("form", form.id);
      else
        console.error("The form you connected to the select must have an id.");
    }
    if (name) element.name = name;
    if (disabled) element.disabled = true;
    if (autofocus) element.autofocus = true;
    if (required) element.required = true;
    if (multiple) element.multiple = true;
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
