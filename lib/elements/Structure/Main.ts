import { CommonConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Main.
 */
export default class Main extends Common {
  static _class = Main;

  /**
   * Initiates a new Main.
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths on which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, data_id, classes, exclusionList, textContent, children, displayMode }: CommonConstructor) {
    super({ id, data_id, classes, children, exclusionList, textContent, displayMode });
    const element = this.build("main");
    this.setRender(element);
  }
}
