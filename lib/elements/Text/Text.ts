import { ProduceSettingsConfig } from "../../types/configObjects";
import { CommonConstructor } from "../../types/constructors";
import { TextType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Text (p).
 */
export default class Text extends Common {
  static _class = Text;

  /**
   * Initiates a new Text (p).
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, data_id, classes, exclusionList, textContent, children, displayMode }: CommonConstructor) {
    super({ id, data_id, classes, children, exclusionList, textContent, displayMode });
    const element = this.build("p");
    this.setRender(element);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLParagraphElement {
    return this._render as HTMLParagraphElement;
  }

  static produce(settings: ProduceSettingsConfig): TextType[] {
    return super.produce(settings) as TextType[];
  }
}
