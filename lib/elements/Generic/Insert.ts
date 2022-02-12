import { ProduceSettingsConfig } from "../../types/configObjects";
import { CommonConstructor } from "../../types/constructors";
import { InsertType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Insert (span).
 */
export default class Insert extends Common {
  static _class = Insert;

  /**
   * Initiates a new Insert (span).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, exclusionList, textContent, children }: CommonConstructor) {
    super({ id, classes, children, exclusionList, textContent });
    const element = this.build("span");
    this.setRender(element);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLSpanElement {
    return this._render as HTMLSpanElement;
  }

  static produce(settings: ProduceSettingsConfig): InsertType[] {
    return super.produce(settings) as InsertType[];
  }
}
