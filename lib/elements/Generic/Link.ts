import { LinkConstructor } from "../../types/constructors";
import { LinkType } from "../../types/types";
import Common from "../Common";

/**
 * Initiate a new Link element (a).
 */
export default class Link extends Common {
  textContent?: string;
  target?: string;
  readonly render: HTMLAnchorElement;

  /**
   * Initiates a new Link element (a).
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

  new(config: LinkConstructor): LinkType {
    return new Link(config);
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLAnchorElement {
    let { id, classes, serial, textContent, target } = this;
    const element = document.createElement("a");
    if (id) element.id = id;
    if (classes)
      classes.forEach((className) => element.classList.add(className));
    if (textContent) element.textContent = textContent;
    if (target) element.href = target;
    element.dataset.serial = serial;
    return element;
  }
}
