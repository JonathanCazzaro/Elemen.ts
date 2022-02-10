import Application from "../../structure/application";
import { LinkConstructor } from "../../types/constructors";
const { goTo } = Application;
import Link from "./Link";

/**
 * Initiates a new NavLink (a).
 */
export default class NavLink extends Link {
  /**
   * Initiates a new NavLink (a).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {string} [target] - (optional) Target of the link (url, local path, etc...).
   */
  constructor({ id, classes, exclusionList, textContent, children, target }: LinkConstructor) {
    super({ id, classes, children, exclusionList, textContent, target });
    this.render.addEventListener("click", (e) => {
      e.preventDefault();
      goTo(this.target);
    });
  }
}
