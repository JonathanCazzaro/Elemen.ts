import { FieldsetConstructor } from "../../types/constructors";
import { FormType, LegendType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Fieldset.
 */
export default class Fieldset extends Common {
  #name?: string;
  #form?: FormType;
  #legend?: LegendType;
  #disabled: boolean = false;
  #render: HTMLFieldSetElement;

  /**
   * Initiates a new Fieldset.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {string} [name] - (optional) Name of the Fieldset (identification for data submitting).
   * @param {FormType} [form] - (optional) The form element instance related to the fieldset. Required if the fieldset is outside the form element.
   * @param {string} [legend] - (optional) A Legend element instance to act as a caption for the fieldset.
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the element should be disabled or not.
   */
  constructor({ id, classes, children, exclusionList, form, legend, disabled }: FieldsetConstructor) {
    super({ id, classes, children, exclusionList });
    const { setRender, setForm, setLegend, setDisabled, build } = this;
    setRender(build("fieldset"));
    if (disabled) setDisabled(true);
    if (form) setForm(form);
    if (legend) setLegend(legend);
  }

  // ***************************
  // Getters
  // ***************************

  get name(): string {
    return this.#name;
  }

  get form(): FormType {
    return this.#form;
  }

  get legend(): LegendType {
    return this.#legend;
  }

  get disabled(): boolean {
    return this.#disabled;
  }

  get render(): HTMLFieldSetElement {
    return this.#render;
  }

  // ***************************
  // Setters
  // ***************************

  setName(name: string) {
    this.#name = this.#render.name = name;
  }

  setForm(form: FormType) {
    this.#form = form;
    if (form.id) this.#render.setAttribute("form", form.id);
    else throw new Error("The form you connected to the fieldset must have an id.");
  }

  setLegend(legend: LegendType) {
    if (this.#legend && this.#legend.serial === legend.serial) return;
    else {
      if (this.#legend.isMounted) {
        this.#legend.unmount();
        legend.setParentSerial(this.serial);
        legend.mount();
      }
      this.#legend = legend;
    }
  }

  setDisabled(value: boolean) {
    this.#disabled = this.#render.disabled = value;
  }

  setRender(render: HTMLFieldSetElement) {
    this.#render = render;
  }
}
