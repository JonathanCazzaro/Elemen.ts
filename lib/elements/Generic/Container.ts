import { ContainerConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiate a new Container element (div).
 */
export default class Container extends Common {
  textContent?: string;
  readonly render: HTMLDivElement;

  /**
   * Initiates a new Container element (div).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, textContent, children }: ContainerConstructor) {
    super({ id, classes, children });
    if (textContent) this.textContent = textContent;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLDivElement {
    let { id, classes, serial, textContent } = this;
    const element = document.createElement("div");
    if (id) element.id = id;
    if (classes)
      classes.forEach((className) => element.classList.add(className));
    if (textContent) element.textContent = textContent;
    element.dataset.serial = serial;
    return element;
  }
}
