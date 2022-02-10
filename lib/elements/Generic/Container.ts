import { ContainerConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Container (div).
 */
export default class Container extends Common {
  #render: HTMLDivElement;

  /**
   * Initiates a new Container (div).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, exclusionList, textContent, children }: ContainerConstructor) {
    super({ id, classes, children, exclusionList });
    const { setTextContent, setRender, build  } = this;
    setRender(build("div"));
    if (textContent) setTextContent(textContent);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLDivElement {
    return this.#render;
  }

  // ***************************
  // Setters
  // ***************************

  setRender(render: HTMLDivElement) {
    this.#render = render;
  }
}
