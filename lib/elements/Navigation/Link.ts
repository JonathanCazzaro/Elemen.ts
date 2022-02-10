import { LinkConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Link (a).
 */
export default class Link extends Common {
  #target?: string;
  #render: HTMLAnchorElement;

  /**
   * Initiates a new Link (a).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {string} [target] - (optional) Target of the link (url, local path, etc...).
   */
  constructor({ id, classes, exclusionList, textContent, children, target }: LinkConstructor) {
    super({ id, classes, children, exclusionList });
    const { setRender, setTarget, setTextContent, build } = this;
    setRender(build("a"));
    if (textContent) setTextContent(textContent);
    if (target) setTarget(target);
  }

  // ***************************
  // Getters
  // ***************************

  get target(): string {
    return this.#target;
  }

  get render(): HTMLAnchorElement {
    return this.#render;
  }

  // ***************************
  // Setters
  // ***************************

  setTarget(target: string) {
    this.#target = this.#render.href = target;
  }

  setRender(render: HTMLAnchorElement) {
    this.#render = render;
  }
}
