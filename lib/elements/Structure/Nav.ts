import { CommonConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Nav.
 */
export default class Nav extends Common {
  /**
   * Initiates a new Nav.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths on which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, exclusionList, textContent, children }: CommonConstructor) {
    super({ id, classes, children, exclusionList, textContent });
    const element = this.build("nav");
    this.setRender(element);
  }
}
