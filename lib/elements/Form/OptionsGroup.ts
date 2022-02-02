import { OptionsGroupConstructor } from "../../types/constructors";
import { OptionType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Options Group (optgroup).
 */
export default class Options_Group extends Common {
  children?: OptionType[];
  label: string;
  disabled: boolean = false;
  readonly render: HTMLOptGroupElement;

  /**
   * Initiates a new Options Group (optgroup).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.OptionType} [children] - (optional) An array containing the children elements if any.
   * @param {string} label - Name of the options group, displayed in the browser.
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the element should be disabled or not.
   */
  constructor({
    id,
    classes,
    children,
    label,
    disabled,
  }: OptionsGroupConstructor) {
    super({ id, classes });
    if (children) {
      this.children = [];
      children.forEach((child) => {
        if (child.render.tagName === "OPTION") this.children.push(child);
        else
          throw new Error("Options Group can only take Option elements as children.");
      });
    }
    this.label = label;
    if (disabled) this.disabled = true;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLOptGroupElement {
    const { label, disabled } = this;
    const element = super.build("optgroup") as HTMLOptGroupElement;
    element.label = label;
    if (disabled) element.disabled = true;
    return element;
  }
}
