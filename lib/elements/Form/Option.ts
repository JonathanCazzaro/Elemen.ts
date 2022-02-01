import { OptionConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Option.
 */
export default class Option extends Common {
  textContent?: string;
  value?: string;
  disabled: boolean = false;
  selected: boolean = false;
  readonly render: HTMLOptionElement;

  /**
   * Initiates a new Option.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {string} [value] - (optional) Value which will be sent when submitting.
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the element should be disabled or not.
   * @param {boolean} [selected] - (optional) Boolean to specify whether the element should be selected or not.
   */
  constructor({
    id,
    classes,
    textContent,
    value,
    disabled,
    selected,
  }: OptionConstructor) {
    super({ id, classes });
    if (textContent) this.textContent = textContent;
    if (value) this.value = value;
    if (disabled) this.disabled = true;
    if (selected) this.selected = true;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLOptionElement {
    const { textContent, value, disabled, selected } = this;
    const element = super.build("button") as HTMLOptionElement;
    if (value) element.value = value;
    if (disabled) element.disabled = true;
    if (selected) element.selected = true;
    if (textContent) element.textContent = textContent;
    return element;
  }
}
