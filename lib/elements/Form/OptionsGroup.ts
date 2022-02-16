import { ProduceSettingsConfig } from "../../types/configObjects";
import { OptionsGroupConstructor } from "../../types/constructors";
import { OptionsGroupType, OptionType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Options Group (optgroup).
 */
export default class Options_Group extends Common {
  #children?: OptionType[];
  #label: string;
  #disabled: boolean = false;
  static _class = Options_Group;

  /**
   * Initiates a new Options Group (optgroup).
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.OptionType} [children] - (optional) An array containing the children elements if any.
   * @param {string} label - Name of the options group, displayed in the browser.
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the element should be disabled or not.
   */
  constructor({ id, data_id, classes, children, exclusionList, label, disabled, displayMode }: OptionsGroupConstructor) {
    super({ id, data_id, classes, exclusionList, displayMode });
    const element = this.build("optgroup");
    this.setRender(element);
    this.setLabel(label);
    if (children) this.setChildren(children);
    if (disabled) this.setDisabled(true);
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
    return this._render as HTMLOptGroupElement;
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
    this.#label = this.render.label = label;
  }

  setDisabled(value: boolean) {
    this.#disabled = this.render.disabled = value;
  }

  static produce(settings: ProduceSettingsConfig): OptionsGroupType[] {
    return super.produce(settings) as OptionsGroupType[];
  }
}
