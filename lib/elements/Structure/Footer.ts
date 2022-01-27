import { GenericStructureConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Footer.
 */
export default class Footer extends Common {
  textContent?: string;
  readonly render: HTMLElement;

  /**
   * Initiates a new Footer.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({
    id,
    classes,
    textContent,
    children,
  }: GenericStructureConstructor) {
    super({ id, classes, children });
    if (textContent) this.textContent = textContent;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLElement {
    const { textContent } = this;
    const element = super.build("footer") as HTMLElement;
    if (textContent) element.textContent = textContent;
    return element;
  }
}
