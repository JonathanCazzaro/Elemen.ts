import { InsertConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiate a new Insert element (span).
 */
export default class Insert extends Common {
  textContent?: string;
  readonly render: HTMLSpanElement;

  /**
   * Initiates a new Insert element (span).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, textContent, children }: InsertConstructor) {
    super({ id, classes, children });
    if (textContent) this.textContent = textContent;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLSpanElement {
    let { id, classes, serial, textContent } = this;
    const element = document.createElement("span");
    if (id) element.id = id;
    if (classes)
      classes.forEach((className) => element.classList.add(className));
    if (textContent) element.textContent = textContent;
    element.dataset.serial = serial;
    return element;
  }
}
