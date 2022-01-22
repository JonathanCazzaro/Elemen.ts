import { TextConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiate a new Text element (p).
 */
export default class Text extends Common {
  textContent?: string;
  readonly render: HTMLParagraphElement;

  /**
   * Initiates a new Text element (p).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, textContent, children }: TextConstructor) {
    super({ id, classes, children });
    if (textContent) this.textContent = textContent;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLParagraphElement {
    let { id, classes, serial, textContent } = this;
    const element = document.createElement("p");
    if (id) element.id = id;
    if (classes)
      classes.forEach((className) => element.classList.add(className));
    if (textContent) element.textContent = textContent;
    element.dataset.serial = serial;
    return element;    
  }
}
