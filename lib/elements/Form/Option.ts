import { ProduceSettingsConfig } from "../../types/configObjects";
import { OptionConstructor } from "../../types/constructors";
import { OptionType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Option.
 */
export default class Option extends Common {
  #value?: string;
  #disabled: boolean = false;
  #selected: boolean = false;
  static _class = Option;

  /**
   * Initiates a new Option.
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {string} [value] - (optional) Value which will be sent when submitting.
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the element should be disabled or not.
   * @param {boolean} [selected] - (optional) Boolean to specify whether the element should be selected or not.
   */
  constructor({ id, data_id, classes, exclusionList, textContent, value, disabled, selected, displayMode }: OptionConstructor) {
    super({ id, data_id, classes, exclusionList, displayMode, textContent });
    const element = this.build("option");
    this.setRender(element);
    if (value) this.setValue(value);
    if (disabled) this.setDisabled(true);
    if (selected) this.setSelected(true);
  }

  // ***************************
  // Getters
  // ***************************

  get value(): string {
    return this.#value;
  }

  get disabled(): boolean {
    return this.#disabled;
  }

  get selected(): boolean {
    return this.#selected;
  }

  get render(): HTMLOptionElement {
    return this._render as HTMLOptionElement;
  }

  // ***************************
  // Setters
  // ***************************

  setValue(value: string) {
    this.#value = this.render.value = value;
  }

  setDisabled(value: boolean) {
    this.#disabled = this.render.disabled = value;
  }

  setSelected(value: boolean) {
    this.#selected = this.render.selected = value;
  }

  static produce(settings: ProduceSettingsConfig): OptionType[] {
    return super.produce(settings) as OptionType[];
  }
}
