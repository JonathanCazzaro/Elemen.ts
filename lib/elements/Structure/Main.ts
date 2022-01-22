import { GenericStructureConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiate a new Main element.
 */
export default class Main extends Common {
  textContent?: string;
  readonly render: HTMLElement;

  /**
   * Initiates a new Main element.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, textContent, children }: GenericStructureConstructor) {
    super({ id, classes, children });
    if (textContent) this.textContent = textContent;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLElement {
    let { id, classes, serial, textContent } = this;
    const element = document.createElement("main");
    if (id) element.id = id;
    if (classes)
      classes.forEach((className) => element.classList.add(className));
    if (textContent) element.textContent = textContent;
    element.dataset.serial = serial;
    return element;    
  }
}
