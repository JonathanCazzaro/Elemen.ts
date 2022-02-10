import { OptionsGroupConstructor } from "../../types/constructors";
import { OptionType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Options Group (optgroup).
 */
export default class Options_Group extends Common {
  #children?: OptionType[];
  #label: string;
  #disabled: boolean = false;
  #render: HTMLOptGroupElement;

  /**
   * Initiates a new Options Group (optgroup).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.OptionType} [children] - (optional) An array containing the children elements if any.
   * @param {string} label - Name of the options group, displayed in the browser.
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the element should be disabled or not.
   */
  constructor({ id, classes, children, exclusionList, label, disabled }: OptionsGroupConstructor) {
    super({ id, classes, exclusionList });
    const { setRender, setChildren, setLabel, setDisabled, build } = this;
    setRender(build("optgroup"));
    setLabel(label);
    if (children) setChildren(children);
    if (disabled) setDisabled(true);
  }

  // ***************************
  // Getters
  // ***************************

  get children(): OptionType[] {
    return this.#children;
  }

  get label(): string {
    return this.#label;
  }

  get disabled(): boolean {
    return this.#disabled;
  }

  get render(): HTMLOptGroupElement {
    return this.#render;
  }

  // ***************************
  // Setters
  // ***************************

  setChildren(children: OptionType[]) {
    if (this.isMounted) this.removeChildren();
    this.#children = [];
    children.forEach((child) => {
      if (child.render.tagName === "OPTION") {
        if (this.isMounted) {
          child.setParentSerial(this.serial);
          child.mount();
        }
        this.#children.push(child);
      } else throw new Error("Options Group can only take Option elements as children.");
    });
  }

  setLabel(label: string) {
    this.#label = this.#render.label = label;
  }

  setDisabled(value: boolean) {
    this.#disabled = this.#render.disabled = value;
  }

  setRender(render: HTMLOptGroupElement) {
    this.#render = render;
  }
}
