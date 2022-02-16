import { ProduceSettingsConfig } from "../../types/configObjects";
import { TitleConstructor } from "../../types/constructors";
import { TitleType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Title (h*).
 */
export default class Title extends Common {
  #level: number;
  static _class = Title;

  /**
   * Initiates a new Title (h*).
   * @param {number} level - Level of the title.
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, data_id, classes, exclusionList, textContent, children, level, displayMode }: TitleConstructor) {
    super({ id, data_id, classes, children, exclusionList, textContent, displayMode });
    if (level > 6 || level < 1) throw new Error("Title's level should be set between 1 and 6.");
    else this.#level = level;
    const element = this.build(`h${this.#level}`);
    this.setRender(element);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLHeadingElement {
    return this._render as HTMLHeadingElement;
  }

  get level(): number {
    return this.#level;
  }

  static produce(settings: ProduceSettingsConfig): TitleType[] {
    return super.produce(settings) as TitleType[];
  }
}
