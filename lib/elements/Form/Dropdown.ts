import { DropdownConstructor } from "../../types/constructors";
import { FormType, OptionsGroupType, OptionType } from "../../types/types";
import Str from "../../utils/str";
const { matchValue } = Str;
import Common from "../Common";

/**
 * Initiates a new Dropdown (select).
 */
export default class Dropdown extends Common {
  #children?: (OptionsGroupType | OptionType)[];
  #id: string;
  #form?: FormType;
  #name?: string;
  #value: string = "";
  #autofocus: boolean = false;
  #disabled: boolean = false;
  #required: boolean = false;
  #multiple: boolean = false;
  #render: HTMLSelectElement;

  /**
   * Initiates a new Dropdown (select).
   * @param {string} id Required.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.(OptionsGroupType|OptionType)} [children] - (optional) An array containing the children elements if any (Options Group or Option elements).
   * @param {FormType} [form] - (optional) The form element instance related to the dropdown, required if placed outside.
   * @param {string} [name] - (optional) Name indicator sent with the form as part of the data. Works as a couple with the value attribute.
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the dropdown should be disabled or not.
   * @param {boolean} [autofocus] - (optional) Boolean to specify whether the dropdown should be set on autofocus or not.
   * @param {boolean} [required] - (optional) Boolean to specify whether the dropdown should be set on required or not.
   * @param {boolean} [multiple] - (optional) Boolean to specify whether the dropdown should be set on multiple or not.
   */
  constructor({ id, classes, exclusionList, form, children, name, disabled, autofocus, required, multiple }: DropdownConstructor) {
    super({ id, classes, exclusionList });
    const { setRender, setChildren, setForm, setName, setDisabled, setAutofocus, setRequired, setMultiple, build } = this;
    setRender(build("select"));
    if (children) setChildren(children);
    if (form) setForm(form);
    if (name) setName(name);
    if (autofocus) setAutofocus(true);
    if (disabled) setDisabled(true);
    if (required) setRequired(true);
    if (multiple) setMultiple(true);
    this.#render.addEventListener("change", () => this.setValue(this.#render.value));
  }

  // ***************************
  // Getters
  // ***************************

  get children(): (OptionsGroupType | OptionType)[] {
    return this.#children;
  }

  get form(): FormType {
    return this.#form;
  }

  get name(): string {
    return this.#name;
  }

  get value(): string {
    return this.#value;
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

  get multiple(): boolean {
    return this.#multiple;
  }

  get render(): HTMLSelectElement {
    return this.#render;
  }

  // ***************************
  // Setters
  // ***************************

  setChildren(children: (OptionsGroupType | OptionType)[]) {
    if (this.isMounted) this.removeChildren();
    this.#children = [];
    const authorizedContent = ["OPTION", "OPTGROUP"];
    children.forEach((child) => {
      if (matchValue(child.render.tagName, authorizedContent)) {
        if (this.isMounted) {
          child.setParentSerial(this.serial);
          child.mount();
        }
        this.#children.push(child);
      } else throw new Error("Dropdown can only take Option and Options_Group elements as children.");
    });
  }

  setForm(form: FormType) {
    this.#form = form;
    if (form.id) this.#render.setAttribute("form", form.id);
    else throw new Error("The form you connected to the select must have an id.");
  }

  setName(name: string) {
    this.#name = this.#render.name = name;
  }

  setValue(value: string) {
    this.#value = this.#render.value = value;
  }

  setAutofocus(value: boolean) {
    this.#autofocus = this.#render.autofocus = value;
  }

  setDisabled(value: boolean) {
    this.#disabled = this.#render.disabled = value;
  }

  setRequired(value: boolean) {
    this.#required = this.#render.required = value;
  }

  setMultiple(value: boolean) {
    this.#multiple = this.#render.multiple = value;
  }

  setRender(render: HTMLSelectElement) {
    this.#render = render;
  }

  /**
   * Define any specific actions when a change has been made to the element.
   * @param {function} callback - Behaviour after the element has changed.
   */
  onChange(callback: (event?: Event) => void): void {
    this.render.addEventListener("change", callback);
  }
}
