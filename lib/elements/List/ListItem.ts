import { ListItemConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new List Item (li).
 */
export default class List_Item extends Common {
  #render: HTMLLIElement;

  /**
   * Initiates a new List Item (li).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, textContent, children, exclusionList }: ListItemConstructor) {
    super({ id, classes, children, exclusionList });
    const { setRender, setTextContent, build } = this;
    setRender(build("li"));
    if (textContent) setTextContent(textContent);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLLIElement {
    return this.#render;
  }

  // ***************************
  // Setters
  // ***************************

  setRender(render: HTMLLIElement) {
    this.#render = render;
  }
}
