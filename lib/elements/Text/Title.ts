import { TitleConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Title (h*).
 */
export default class Title extends Common {
  #level: number;

  /**
   * Initiates a new Title (h*).
   * @param {number} level - Level of the title.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, exclusionList, textContent, children, level }: TitleConstructor) {
    super({ id, classes, children, exclusionList, textContent });
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
}
