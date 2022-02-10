import { InsertConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Insert (span).
 */
export default class Insert extends Common {
  #render: HTMLSpanElement;

  /**
   * Initiates a new Insert (span).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, exclusionList, textContent, children }: InsertConstructor) {
    super({ id, classes, children, exclusionList });
    const { setTextContent, setRender, build } = this;
    setRender(build("span"));
    if (textContent) setTextContent(textContent);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLSpanElement {
    return this.#render;
  }
  // ***************************
  // Setters
  // ***************************

  setRender(render: HTMLSpanElement) {
    this.#render = render;
  }
}
