import { CommonConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Footer.
 */
export default class Footer extends Common {
  static _class = Footer;

  /**
   * Initiates a new Footer.
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths on which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, data_id, classes, exclusionList, textContent, children }: CommonConstructor) {
    super({ id, data_id, classes, children, exclusionList, textContent });
    const element = this.build("footer");
    this.setRender(element);
  }
}
