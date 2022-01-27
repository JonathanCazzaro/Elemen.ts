import { LinkConstructor } from "../../types/constructors";
import { LinkType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Link (a).
 */
export default class Link extends Common {
  textContent?: string;
  target?: string;
  readonly render: HTMLAnchorElement;

  /**
   * Initiates a new Link/NavLink (a).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {string} [target] - (optional) Target of the link (url, local path, etc...).
   */
  constructor({ id, classes, textContent, children, target }: LinkConstructor) {
    super({ id, classes, children });
    if (textContent) this.textContent = textContent;
    if (target) this.target = target;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLAnchorElement {
    const { textContent, target } = this;
    const element = super.build("a") as HTMLAnchorElement;
    if (textContent) element.textContent = textContent;
    if (target) element.href = target;
    return element;
  }
}
