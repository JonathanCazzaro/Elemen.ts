import { ProduceSettingsConfig } from "../../types/configObjects";
import { FieldsetConstructor } from "../../types/constructors";
import { FieldsetType, FormType, LegendType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Fieldset.
 */
export default class Fieldset extends Common {
  #name?: string;
  #form?: FormType;
  #legend?: LegendType;
  #disabled: boolean = false;
  static _class = Fieldset;


  /**
   * Initiates a new Fieldset.
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {string} [name] - (optional) Name of the Fieldset (identification for data submitting).
   * @param {FormType} [form] - (optional) The form element instance related to the fieldset. Required if the fieldset is outside the form element.
   * @param {string} [legend] - (optional) A Legend element instance to act as a caption for the fieldset.
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the element should be disabled or not.
   */
  constructor({ id, data_id, classes, children, exclusionList, form, legend, disabled, displayMode }: FieldsetConstructor) {
    super({ id, data_id, classes, children, exclusionList, displayMode });
    const element = this.build("fieldset");
    this.setRender(element);
    if (disabled) this.setDisabled(true);
    if (form) this.setForm(form);
    if (legend) this.setLegend(legend);
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
    return this._render as HTMLFieldSetElement;
  }

  // ***************************
  // Setters
  // ***************************

  setName(name: string) {
    this.#name = this.render.name = name;
  }

  setForm(form: FormType) {
    this.#form = form;
    if (form.id) this.render.setAttribute("form", form.id);
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
    this.#disabled = this.render.disabled = value;
  }

  static produce(settings: ProduceSettingsConfig): FieldsetType[] {
    return super.produce(settings) as FieldsetType[];
  }
}
