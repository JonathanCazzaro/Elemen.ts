import { OptionConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Option.
 */
export default class Option extends Common {
  #value?: string;
  #disabled: boolean = false;
  #selected: boolean = false;

  /**
   * Initiates a new Option.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {string} [value] - (optional) Value which will be sent when submitting.
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the element should be disabled or not.
   * @param {boolean} [selected] - (optional) Boolean to specify whether the element should be selected or not.
   */
  constructor({ id, classes, exclusionList, textContent, value, disabled, selected }: OptionConstructor) {
    super({ id, classes, exclusionList });
    const element = this.build("option");
    this.setRender(element);
    if (textContent) this.setTextContent(textContent);
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
}
